import React from "react";
import { Row, Col, Input, Spin } from "antd";
import { Layout } from "antd";
import { sortGitUserData, GithubUserData } from "./api/github";
import { UserInfo } from "./components/UserInfo";
import { RepoInfo } from "./components/RepoInfo";
import * as _ from "lodash";

const { Header, Footer, Content } = Layout;
const { Search } = Input;

const App: React.FC = () => {
  const [userDetails, setUserDetails] = React.useState<GithubUserData>();

  const fetchData = async (username: string) => {
    const gitUserData = await sortGitUserData(username);
    setUserDetails(gitUserData);
  };

  React.useEffect(() => {
    fetchData("willemclarke");
  }, []);

  console.log(userDetails);

  const content = userDetails ? (
    <Row>
      <Row style={{ display: "flex", justifyContent: "center" }}>
        <Search
          style={{ width: "400px" }}
          placeholder="input search text"
          enterButton="Search"
          size="large"
          onSearch={username => fetchData(username)}
        />
      </Row>
      <Col span={6} style={{ background: "#CDDDDD", height: "470px" }}>
        <UserInfo user={userDetails} />
      </Col>
      <Col span={18} style={{ background: "#CDDDDD", height: "470px", display: "flex", justifyContent: "center" }}>
        <RepoInfo repo={userDetails} />
      </Col>
    </Row>
  ) : (
    <Spin />
  );

  return (
    <Layout>
      <Header>Github Profiles</Header>
      <Content>{content}</Content>
      <Footer style={{ textAlign: "center", background: "#CDDDDD" }}></Footer>
    </Layout>
  );
};

export default App;
