import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
});

interface LanguageStats {
  [key: string]: number;
}

async function fetchUserLanguages(username: string): Promise<LanguageStats> {
  const repos = await octokit.rest.repos.listForUser({
    username,
    per_page: 100,
    sort: "updated",
  });

  const languagePromises = repos.data.map((repo) =>
    octokit.rest.repos.listLanguages({
      owner: username,
      repo: repo.name,
    })
  );

  const languages = await Promise.all(languagePromises);

  const aggregatedLanguages: LanguageStats = {};
  languages.forEach((lang) => {
    Object.entries(lang.data).forEach(([language, bytes]) => {
      aggregatedLanguages[language] =
        (aggregatedLanguages[language] || 0) + bytes;
    });
  });

  return aggregatedLanguages;
}

async function fetchUserTopics(username: string): Promise<string[]> {
  const repos = await octokit.rest.repos.listForUser({
    username,
    per_page: 100,
    sort: "updated",
  });

  const topics = new Set<string>();
  repos.data.forEach((repo) => {
    repo.topics?.forEach((topic) => topics.add(topic));
  });

  return Array.from(topics);
}
