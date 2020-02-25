import React from "react";
import * as _ from "lodash";
import { Row, Col, Input, Spin, Alert } from "antd";
import { Layout } from "antd";
import { sortGitUserData, GithubUserData } from "./api/github";
import { UserInfo } from "./components/UserInfo";
import { RepoInfo } from "./components/RepoInfo";

const { Header, Content } = Layout;
const { Search } = Input;

export const App: React.FC = () => {
  const [userDetails, setUserDetails] = React.useState<GithubUserData>();
  const [error, setError] = React.useState<Error | null>(null);

  const fetchData = async (username: string): Promise<void> => {
    try {
      const gitUserData = await sortGitUserData(username);
      setUserDetails(gitUserData);
      setError(null);
    } catch (error) {
      setError(error);
    }
  };

  const content: JSX.Element = (
    <Row>
      <Row style={{ display: "flex", justifyContent: "center", paddingBottom: "40px", paddingTop: "45px" }}>
        <Search
          style={{ width: "400px", outline: "0 none" }}
          placeholder="Username"
          enterButton="Search"
          size="large"
          onSearch={username => fetchData(username)}
        />
      </Row>
      <Col
        className="user-info"
        span={6}
        style={{ background: "#CDDDDD", height: "470px", width: "270px", display: "flex", justifyContent: "center" }}
      >
        {userDetails ? <UserInfo user={userDetails} /> : null}
      </Col>
      <Col
        className="repo-info"
        span={18}
        style={{ background: "#CDDDDD", height: "470px", width: "807px", display: "flex", justifyContent: "center" }}
      >
        {userDetails ? <RepoInfo repos={userDetails.repositories} /> : null}
      </Col>
    </Row>
  );

  return (
    <Layout>
      {error ? <Alert message="Error, username does not exist!" type="error" banner /> : null}
      <Header>Github Profiles</Header>
      <Content>{content}</Content>
    </Layout>
  );
};
