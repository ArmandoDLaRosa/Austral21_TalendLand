import { BrowserRouter as Router, Route, Routes, NavLink, Link } from "react-router-dom";

import { Home, Eligibilidad, Carbono } from "./components";

import "antd/dist/antd.min.css";
import { HomeOutlined, AimOutlined, SubnodeOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";

import { Typography } from 'antd';
const { Title } = Typography;


const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, items) {
  return {
    key,
    icon,
    items,
    label,
  };
}

const routes = [
  {
      path: '/',
      element: <div><Home/></div>
  },
  {
      path: '/Eligibilidad',
      element: <div><Eligibilidad/></div>
  },
  {
      path: '/Carbono',
      element: <div><Carbono/></div>
  }
]

const items = [
  getItem("Home", "1",  <Link  to="/"><HomeOutlined /></Link>),
//  getItem("Eligibilidad", "2", <Link  to="/Eligibilidad"><AimOutlined /></Link>),
  getItem("Carbono", "3", <Link  to="/Carbono"><SubnodeOutlined /></Link>),

];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Router>

    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 5,
              textAlign:"center"
            }}>
              <Title style={{color:"white"}} >Austral-21</Title>
            </Header>
          
          <Content
            style={{
              margin: "0 16px",
              backgroundColor:"white"
            }}
          >
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Routes>
              {
                routes.map((route, index) => (
                                            <Route
                                                key={index}
                                                path={route.path}
                                                element={route.element}
                                            />
                                        ))
                                    }
              </Routes>
            </div>
          </Content>
        </Layout>
    </Layout>
    </Router>

  );
};

export default App;
