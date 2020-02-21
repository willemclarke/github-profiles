import React from "react";
import { GithubUserData } from "../api/github";
import { Card, Icon } from "antd";

interface Props {
  user: GithubUserData;
}

export const UserInfo = (props: Props): JSX.Element => {
  return (
    <Card
      bordered={false}
      style={{ width: "100%", height: "470px", backgroundColor: "#CDDDDD" }}
      cover={<img alt="example" src={props.user.avatar} />}
    >
      <div className="user-name-single-card">
        <Card bordered={false} style={{ backgroundColor: "#F2D697", height: "50px" }}>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "center", paddingTop: "0.4rem" }}>{props.user.name}</p>
        </Card>
      </div>

      <div className="user-info-single-card">
        <Card bordered={false} style={{ paddingTop: "1rem", backgroundColor: "#CDDDDD", color: "#111" }}>
          <li style={{ display: "flex", justifyContent: "space-between", fontSize: "1.5rem", paddingLeft: "3px" }}>
            <span>
              <img src="https://i.imgur.com/KSOgrJe.png"></img>
            </span>
            <span>{props.user.username}</span>
          </li>
          <li style={{ display: "flex", justifyContent: "space-between", fontSize: "1.5rem", paddingLeft: "3px" }}>
            <span>
              <Icon type="team" />
            </span>
            <span>{`${props.user.followers} followers`}</span>
          </li>
          <li style={{ display: "flex", justifyContent: "space-between", fontSize: "1.5rem", paddingLeft: "3px" }}>
            <span>
              <Icon type="book" />
            </span>
            <span>{`${props.user.repositoriesCount} repos`}</span>
          </li>
        </Card>
      </div>
    </Card>
  );
};
