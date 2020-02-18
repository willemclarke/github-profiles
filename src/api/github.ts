import rp from "request-promise";
import * as _ from "lodash";

export interface GithubUserResponse {
  name: string;
  login: string;
  avatar_url: string;
  followers: number;
  bio: string;
  public_repos: number;
}

export interface GithubUserReposResponse {
  name: string;
  stargazers_count: number;
  forks_count: number;
  description: string;
}

export interface GithubUserData {
  name: string;
  username: string;
  avatar: string;
  followers: number;
  description: string;
  repositoriesCount: number;
  repositories: GithubUserReposResponse[];
}

function getGithubUser(username: string): rp.RequestPromise<GithubUserResponse> {
  const options = {
    url: `https://api.github.com/users/${username}`,
    json: true
  };
  return rp(options);
}

function getGithubUserRepos(username: string): rp.RequestPromise<GithubUserReposResponse[]> {
  const options = {
    url: `https://api.github.com/users/${username}/repos`,
    json: true
  };
  return rp(options);
}

export async function sortGitUserData(username: string): Promise<GithubUserData> {
  try {
    const user = await getGithubUser(username);
    const { name, login, avatar_url, followers, bio, public_repos } = user;
    const userRepos = await getGithubUserRepos(username);
    const orderReposByStarCount = _.orderBy(userRepos, ["stargazers_count"], ["desc"]);
    const topFourRepos = _.slice(orderReposByStarCount, 0, 4);

    const data = {
      name,
      username: login,
      avatar: avatar_url,
      followers: followers,
      description: bio,
      repositoriesCount: public_repos,
      repositories: topFourRepos
    };
    return data;
  } catch (err) {
    console.log("Cannot fetch data from GitHub API", err);
    throw err;
  }
}
