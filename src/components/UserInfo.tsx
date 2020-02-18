import React from "react";
import { GithubUserData } from "../api/github";
import { Card } from "antd";

const { Meta } = Card;

interface Props {
  user: GithubUserData;
}

export const UserInfo = (props: Props) => {
  return (
    <Card
      bordered={false}
      style={{ width: "100%", height: "470px", backgroundColor: "#CDDDDD" }}
      cover={<img alt="example" src={props.user.avatar} />}
    >
      <h2>{props.user.name}</h2>
      <h3>{props.user.username}</h3>
      <h3>{`${props.user.followers} Followers`}</h3>
      <h3>{`${props.user.repositoriesCount} Repos`}</h3>
    </Card>
  );
};

{
  /* <div>
<h1>{props.user.name}</h1>
<h1>{props.user.username}</h1>
<h1>{props.user.followers}</h1>
<h1>{props.user.repositoriesCount}</h1>
</div> */
}
