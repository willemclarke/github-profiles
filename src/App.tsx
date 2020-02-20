import React from "react";
import { Row, Col, Input, Spin, Alert } from "antd";
import { Layout } from "antd";
import { sortGitUserData, GithubUserData } from "./api/github";
import { UserInfo } from "./components/UserInfo";
import { RepoInfo } from "./components/RepoInfo";
import * as _ from "lodash";

const { Header, Footer, Content } = Layout;
const { Search } = Input;

export const App: React.FC = () => {
  const [userDetails, setUserDetails] = React.useState<GithubUserData>();

  const fetchData = async (username: string): Promise<void> => {
    const gitUserData = await sortGitUserData(username);
    setUserDetails(gitUserData);
  };

  const content: JSX.Element = (
    <Row>
      <Row style={{ display: "flex", justifyContent: "center", paddingBottom: "50px" }}>
        <Search
          style={{ width: "400px" }}
          placeholder="Username"
          enterButton="Search"
          size="large"
          onSearch={username => fetchData(username)}
        />
      </Row>
      <Col className="user-info" span={6} style={{ background: "#CDDDDD", height: "470px", display: "flex", alignItems: "right" }}>
        {userDetails ? <UserInfo user={userDetails} /> : null}
      </Col>
      <Col
        className="repo-info"
        span={18}
        style={{ background: "#CDDDDD", height: "470px", display: "flex", justifyContent: "center" }}
      >
        {userDetails ? <RepoInfo repos={userDetails.repositories} /> : null}
      </Col>
    </Row>
  );

  return (
    <Layout>
      <Header>Github Profiles</Header>
      <Content>{content}</Content>
      <Footer style={{ textAlign: "center", background: "#CDDDDD" }}></Footer>
    </Layout>
  );
};
