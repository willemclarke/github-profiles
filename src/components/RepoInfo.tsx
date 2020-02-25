import React from "react";
import * as _ from "lodash";
import { GithubUserRepoResponse } from "../api/github";
import { List, Avatar, Icon } from "antd";

interface Props {
  repos: GithubUserRepoResponse[];
}

export const RepoInfo = (props: Props): JSX.Element => {
  const { repos } = props;

  const data = _.map(repos, repository => {
    return {
      title: repository.name,
      description: repository.description,
      starCount: repository.stargazers_count,
      forkCount: repository.forks_count
    };
  });

  const IconText = ({ type, text, theme }: any): JSX.Element => (
    <span>
      <Icon type={type} theme={theme} style={{ marginRight: 8, color: "#E0AA2A", fontSize: "20px" }} />
      {text}
    </span>
  );

  return (
    <List
      itemLayout="vertical"
      dataSource={data}
      renderItem={item => (
        <List.Item
          actions={[
            <IconText type="fork" text={item.forkCount} key="list-vertical-star-o" style={{ fontSize: "30px", fontWeight: "bold" }} />,
            <IconText
              type="star"
              theme="filled"
              text={item.starCount}
              key="list-vertical-like-o"
              style={{ fontSize: "30px", fontWeight: "bold" }}
            />
          ]}
        >
          <List.Item.Meta title={item.title} description={item.description} />
        </List.Item>
      )}
      style={{ width: "616px" }}
    />
  );
};
