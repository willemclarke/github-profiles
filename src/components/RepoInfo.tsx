import React from "react";
import { GithubUserData, GithubUserReposResponse } from "../api/github";
import { List, Avatar, Icon } from "antd";

interface Props {
  repo: GithubUserData;
}

export const RepoInfo = (props: Props) => {
  const data = [
    {
      title: props.repo.repositories[0].name,
      description: props.repo.repositories[0].description,
      starCount: props.repo.repositories[0].stargazers_count.toString(),
      forkCount: props.repo.repositories[0].forks_count.toString()
    },
    {
      title: props.repo.repositories[1].name,
      description: props.repo.repositories[1].description,
      starCount: props.repo.repositories[1].stargazers_count.toString(),
      forkCount: props.repo.repositories[1].forks_count.toString()
    },
    {
      title: props.repo.repositories[2].name,
      description: props.repo.repositories[2].description,
      starCount: props.repo.repositories[2].stargazers_count.toString(),
      forkCount: props.repo.repositories[2].forks_count.toString()
    },
    {
      title: props.repo.repositories[3].name,
      description: props.repo.repositories[3].description,
      starCount: props.repo.repositories[3].stargazers_count.toString(),
      forkCount: props.repo.repositories[3].forks_count.toString()
    }
  ];

  const IconText = ({ type, text }: any) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
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
            description={item.description}
          />
        </List.Item>
      )}
    />
  );
};
