import React from "react";
import { Row, Col, Input } from "antd";
import { Layout } from "antd";
import { sortGitUserData, GithubUserData } from "./api/github";
import * as _ from "lodash";

const { Header, Footer, Content } = Layout;
const { Search } = Input;

const App: React.FC = () => {
  const [userDetails, setUserDetails] = React.useState<GithubUserData>();

  const fetchData = async (username: string) => {
    const gitUserData = await sortGitUserData(username);
    setUserDetails(gitUserData);
  };

  console.log(userDetails);

  return (
    <div>
      <Layout>
        <Header>Github Profiles</Header>
        <Content>
          <div>{JSON.stringify(userDetails)}</div>
          <div>
            <Row type="flex" justify="start" gutter={[16, 40]}>
              <Col span={12}>
                {<Search placeholder="username" onSearch={username => fetchData(username)} style={{ width: 200 }} />}
              </Col>
            </Row>
            <Row type="flex" justify="center" gutter={[16, 40]}>
              <Col span={12}>Profile avatar here</Col>
              <Col span={12}>#2 Repo here</Col>
              <Col span={12}>#1 Repo here</Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span={12}>Profile Info here</Col>
              <Col span={12}>#3 Repo here</Col>
              <Col span={12}>#4 Repo here</Col>
            </Row>
          </div>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
};

export default App;
