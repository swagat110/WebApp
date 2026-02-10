#!/usr/bin/env node
/**
 * Build-time script: fetch pinned repos from GitHub and write to public/pinned-projects.json.
 * Used in CI so the deployed site has pinned projects without exposing a token in the client.
 * Requires env: GITHUB_TOKEN (or PINNED_REPOS_TOKEN), GITHUB_USERNAME (default swagat110).
 */

import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public");
const OUT_FILE = join(OUT_DIR, "pinned-projects.json");

const GITHUB_GRAPHQL = "https://api.github.com/graphql";
const GITHUB_REST = "https://api.github.com";
const MAX_SUMMARY_LENGTH = 320;

const PINNED_REPOS_QUERY = `
  query PinnedRepos($login: String!) {
    user(login: $login) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            owner { login }
            primaryLanguage { name }
            repositoryTopics(first: 6) {
              nodes { topic { name } }
            }
          }
        }
      }
    }
  }
`;

function readmeSummary(raw) {
  const stripped = raw
    .replace(/^#+\s*.*$/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`[^`]+`/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const firstBlock = stripped.split(/\n\n+/)[0]?.trim() ?? stripped;
  if (firstBlock.length <= MAX_SUMMARY_LENGTH) return firstBlock;
  const cut = firstBlock.slice(0, MAX_SUMMARY_LENGTH).trim();
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > MAX_SUMMARY_LENGTH / 2 ? cut.slice(0, lastSpace) : cut) + "…";
}

async function fetchReadmeSummary(owner, repo, token) {
  try {
    const res = await fetch(
      `${GITHUB_REST}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/readme`,
      {
        headers: {
          Accept: "application/vnd.github.raw",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) return null;
    const text = await res.text();
    return text ? readmeSummary(text) : null;
  } catch {
    return null;
  }
}

async function main() {
  const token = process.env.PINNED_REPOS_TOKEN || process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || "swagat110";

  if (!token?.trim()) {
    console.warn("No PINNED_REPOS_TOKEN or GITHUB_TOKEN in env; writing empty pinned projects.");
    mkdirSync(OUT_DIR, { recursive: true });
    writeFileSync(OUT_FILE, "[]");
    return;
  }

  const res = await fetch(GITHUB_GRAPHQL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query: PINNED_REPOS_QUERY, variables: { login: username } }),
  });

  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join("; "));

  const nodes = json.data?.user?.pinnedItems?.nodes ?? [];

  const projects = await Promise.all(
    nodes.map(async (repo) => {
      const tech = [];
      if (repo.primaryLanguage?.name) tech.push(repo.primaryLanguage.name);
      repo.repositoryTopics.nodes.forEach(({ topic }) => {
        if (topic.name && !tech.includes(topic.name)) tech.push(topic.name);
      });
      const owner = repo.owner.login;
      const readmeDesc = await fetchReadmeSummary(owner, repo.name, token);
      return {
        title: repo.name,
        description: readmeDesc ?? repo.description ?? "No description.",
        tech: tech.length ? tech : ["Code"],
        github: repo.url,
      };
    })
  );

  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, JSON.stringify(projects, null, 2));
  console.log(`Wrote ${projects.length} pinned projects to public/pinned-projects.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
