import React from "react";
import { GithubUserRepoResponse } from "../api/github";
import { List, Avatar, Icon } from "antd";
import * as _ from "lodash";

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

  const IconText = ({ type, text }: any): JSX.Element => (
    <span>
      <Icon type={type} style={{ marginRight: 8, color: "#E0AA2A" }} />
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
            <IconText type="fork" text={item.forkCount} key="list-vertical-star-o" />,
            <IconText type="star" text={item.starCount} key="list-vertical-like-o" />
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src="https://i.dlpng.com/static/png/6804928_preview.png" />}
            title={item.title}
            style={{}}
            description={item.description}
          />
        </List.Item>
      )}
    />
  );
};
