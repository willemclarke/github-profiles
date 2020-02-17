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

interface GithubUserReposResponse {
  repoName: string;
  stargazers_count: number;
  forks_count: number;
  description: string;
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

export interface GithubUserData {
  name: string;
  username: string;
  avatar: string;
  followers: number;
  description: string;
  repositorys: number;
  repoOne: Partial<GithubUserReposResponse>;
  repoTwo: Partial<GithubUserReposResponse>;
  repoThree: Partial<GithubUserReposResponse>;
  repoFour: Partial<GithubUserReposResponse>;
}

export async function sortGitUserData(username: string): Promise<GithubUserData> {
  try {
    const user = await getGithubUser(username);
    const { name, login, avatar_url, followers, bio, public_repos } = user;
    const userRepos = await getGithubUserRepos(username);
    const orderReposByStarCount = _.orderBy(userRepos, ["stargazers_count"], ["desc"]);
    const topFourRepos = _.slice(orderReposByStarCount, 0, 4);
    const formattedRepos = _.map(topFourRepos, repo => {
      return _.pick(repo, "name", "stargazers_count", "forks_count", "description");
    });

    const data = {
      name,
      username: login,
      avatar: avatar_url,
      followers: followers,
      description: bio,
      repositorys: public_repos,
      repoOne: formattedRepos[0],
      repoTwo: formattedRepos[1],
      repoThree: formattedRepos[2],
      repoFour: formattedRepos[3]
    };
    return data;
  } catch (err) {
    console.log("Cannot fetch data from GitHub API", err);
    throw err;
  }
}
