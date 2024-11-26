import { Octokit } from "octokit";
import { GitHubUser, PokemonProfile } from "../types/github";
import { generateUserPokemonProfile } from "./gemini";

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
});

export async function fetchGitHubUser(
  username: string
): Promise<GitHubUser & { pokemonProfile: PokemonProfile }> {
  try {
    const [userResponse, contributionsData, detailedData] = await Promise.all([
      octokit.rest.users.getByUsername({
        username: username.trim(),
      }),
      fetchUserContributions(username.trim()),
      fetchDetailedUserData(username.trim()),
    ]);

    if (userResponse.status !== 200) {
      throw new Error("Failed to fetch user data");
    }

    const userData: GitHubUser = {
      login: userResponse.data.login,
      name: userResponse.data.name || userResponse.data.login,
      avatar_url: userResponse.data.avatar_url,
      bio: userResponse.data.bio,
      public_repos: userResponse.data.public_repos,
      followers: userResponse.data.followers,
      following: userResponse.data.following,
      public_gists: userResponse.data.public_gists,
      created_at: userResponse.data.created_at,
      location: userResponse.data.location,
      blog: userResponse.data.blog,
      email: userResponse.data.email,
      twitter_username: userResponse.data.twitter_username,
      detailed_data: detailedData,
      contributions_count: contributionsData.totalContributions,
    };

    // Generate personalized Pokemon profile
    const pokemonProfile = await generateUserPokemonProfile(userData);

    return {
      ...userData,
      pokemonProfile,
    };
  } catch (error: any) {
    if (error.status === 404) {
      throw new Error("User not found");
    }
    throw new Error("Failed to fetch user data: " + error.message);
  }
}

async function fetchUserContributions(username: string) {
  try {
    const query = `
      query ($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
            }
          }
        }
      }
    `;

    const response: any = await octokit.graphql(query, { username });
    return {
      totalContributions:
        response.user?.contributionsCollection?.contributionCalendar
          ?.totalContributions || 0,
    };
  } catch (error) {
    console.error("Failed to fetch contributions", error);
    return { totalContributions: 0 };
  }
}

async function fetchDetailedUserData(username: string) {
  try {
    const query = `
      query ($username: String!) {
        user(login: $username) {
          repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}) {
            nodes {
              languages(first: 10) {
                edges {
                  size
                  node {
                    name
                  }
                }
              }
              isFork
              stargazerCount
              issues {
                totalCount
              }
              pullRequests {
                totalCount
              }
            }
          }
          contributionsCollection {
            totalCommitContributions
            totalIssueContributions
            totalPullRequestContributions
            totalPullRequestReviewContributions
          }
        }
      }
    `;

    const response: any = await octokit.graphql(query, { username });
    return response.user;
  } catch (error) {
    console.error("Failed to fetch detailed data", error);
    return null;
  }
}
