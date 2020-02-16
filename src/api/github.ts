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

export interface GithubRepoResponse {
  name: string;
  stargazrers_count: number;
  forks_count: number;
  description: string;
}

function getUserGitData(username: string): rp.RequestPromise<GithubUserResponse> {
  const options = {
    url: `https://api.github.com/users/${username}`,
    json: true
  };
  return rp(options);
}

function getUserGitRepos(username: string): rp.RequestPromise<GithubRepoResponse> {
  const options = {
    url: `https://api.github.com/users/${username}/repos`,
    json: true
  };
  return rp(options);
}

export function sortGitUserData(username: string) {
  getUserGitData(username).then(res => {
    const { name, login, avatar_url, followers, bio, public_repos } = res;
    return getUserGitRepos(username).then(res => {
      const orderReposByStarCount = _.orderBy(res, ["stargazers_count"], ["desc"]);
      const topFourRepos = _.slice(orderReposByStarCount, 0, 4);
      const data = {
        name,
        username: login,
        avatar: avatar_url,
        followers: followers,
        description: bio,
        repositorys: public_repos,
        repoOne: topFourRepos[0],
        repoTwo: topFourRepos[1],
        repoFive: topFourRepos[2],
        repoFour: topFourRepos[3]
      };
      console.log(data);
      return data;
    });
  });
}
