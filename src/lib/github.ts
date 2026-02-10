/**
 * Fetch a user's pinned repositories from GitHub GraphQL API,
 * with README summary as description when available.
 * Requires VITE_GITHUB_TOKEN for authentication.
 */

const GITHUB_GRAPHQL = "https://api.github.com/graphql";
const GITHUB_REST = "https://api.github.com";

export type PinnedProject = {
  title: string;
  description: string;
  tech: string[];
  github: string;
};

const PINNED_REPOS_QUERY = `
  query PinnedRepos($login: String!) {
    user(login: $login) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            owner {
              login
            }
            primaryLanguage {
              name
            }
            repositoryTopics(first: 6) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

type GqlRepo = {
  name: string;
  description: string | null;
  url: string;
  owner: { login: string };
  primaryLanguage: { name: string } | null;
  repositoryTopics: {
    nodes: { topic: { name: string } }[];
  };
};

type GqlResponse = {
  data?: {
    user: {
      pinnedItems: { nodes: GqlRepo[] };
    } | null;
  };
  errors?: { message: string }[];
};

const MAX_SUMMARY_LENGTH = 320;

/** Extract a plain-text summary from README markdown (first paragraph, max length). */
function readmeSummary(raw: string): string {
  const stripped = raw
    .replace(/^#+\s*.*$/gm, "") // headers
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links -> link text
    .replace(/`[^`]+`/g, "") // inline code
    .replace(/\s+/g, " ")
    .trim();
  const firstBlock = stripped.split(/\n\n+/)[0]?.trim() ?? stripped;
  if (firstBlock.length <= MAX_SUMMARY_LENGTH) return firstBlock;
  const cut = firstBlock.slice(0, MAX_SUMMARY_LENGTH).trim();
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > MAX_SUMMARY_LENGTH / 2 ? cut.slice(0, lastSpace) : cut) + "…";
}

async function fetchReadmeSummary(
  owner: string,
  repo: string,
  token: string
): Promise<string | null> {
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

export async function fetchPinnedRepos(
  username: string,
  token: string | undefined
): Promise<PinnedProject[]> {
  if (!token?.trim()) {
    return [];
  }

  const res = await fetch(GITHUB_GRAPHQL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: PINNED_REPOS_QUERY,
      variables: { login: username },
    }),
  });

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }

  const json: GqlResponse = await res.json();

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }

  const user = json.data?.user;
  const nodes = user?.pinnedItems?.nodes ?? [];

  const projects = await Promise.all(
    nodes.map(async (repo) => {
      const tech: string[] = [];
      if (repo.primaryLanguage?.name) tech.push(repo.primaryLanguage.name);
      repo.repositoryTopics.nodes.forEach(({ topic }) => {
        if (topic.name && !tech.includes(topic.name)) tech.push(topic.name);
      });
      const owner = repo.owner.login;
      const readmeDesc = await fetchReadmeSummary(owner, repo.name, token);
      const description =
        readmeDesc ?? repo.description ?? "No description.";
      return {
        title: repo.name,
        description,
        tech: tech.length ? tech : ["Code"],
        github: repo.url,
      };
    })
  );

  return projects;
}
