import React, { useState } from 'react';
import YoutubeEmbed from "./Video";
import { Col, Divider, Row, Card, Button, Typography, Space} from 'antd';
import { DownloadOutlined, LinkOutlined } from '@ant-design/icons';

const { Title } = Typography;

const tabList = [
    {
        key: 'tab1',
        tab: 'Áreas',
    },
    {
        key: 'tab2',
        tab: 'Requerimientos Proyecto',
    },
    {
        key: 'tab3',
        tab: 'Metodologías de Cuantificación',
    }
];
const contentList = {
    tab1: <div style={{width: "150px", 
                       height: "100%", 
                       boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)", 
                       borderRadius: "8px",
                       marginTop: "1.6em",
                       marginBottom: "0.9em",
                       overflow: "hidden",
                       willChange: "transform",
                       alignItems: "center"}}  >
     <iframe loading="lazy" style={{width: "150px", height: "250px", border: "blue",  top: 0, left: 0, padding: 0, margin: 0}} 
     src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAFHNPmAKxI&#x2F;view?embed" allow="fullscreen"/>
   </div>,
    tab2: <div style={{width: "150px", 
    height: "100%", 
    boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)", 
    borderRadius: "8px",
    marginTop: "1.6em",
    marginBottom: "0.9em",
    overflow: "hidden",
    willChange: "transform",
    alignItems: "center"}}  >
<iframe loading="lazy" style={{width: "150px", height: "250px", border: "blue",  top: 0, left: 0, padding: 0, margin: 0}} 
src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAFHNJtnefY&#x2F;view?embed" allow="fullscreen"/>
</div>,
    tab3:<div style={{width: "150px", 
    height: "100%", 
    boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)", 
    borderRadius: "8px",
    marginTop: "1.6em",
    marginBottom: "0.9em",
    overflow: "hidden",
    willChange: "transform",
    alignItems: "center"}}  >
<iframe loading="lazy" style={{width: "150px", height: "250px", border: "blue",  top: 0, left: 0, padding: 0, margin: 0}} 
src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAFHNF6rius&#x2F;view?embed
" allow="fullscreen"/>
</div>
  };
  
export default function Home() {
    const [activeTab, setActiveTab] = useState('tab1');
    const onTabChange = (key) => {
        setActiveTab(key);
      };
    return (
        <div>
            <Row gutter={[8, 8]}>
                <Col span={24} style={{ textAlign: "center" }}>
                    <Title>Protocolo Forestal para México 2.0</Title>
                </Col>
            </Row>

            <Row gutter={[8, 8]}>
                <Col span={14}>
                <YoutubeEmbed embedId="7IakGTjd8Fg" />

                </Col>
                <Col span={8}>
                    <Card
                        style={{
                        height: '100%',
                        textAlign: "center"
                        }}
                        title="Infografías"
                        extra={ <Button type="primary" shape="circle" icon={<DownloadOutlined />}/>}
                        tabList={tabList}
                        activeTabKey={activeTab}
                        onTabChange={(key) => {
                        onTabChange(key);
                        }}
                    >
                        {contentList[activeTab]}
                    </Card>
                </Col>
            </Row>
            <Divider></Divider>

            <Row gutter={[8, 8]} style={{ alignContent: "right" }}>
                        <Button style={{backgroundColor:"#001529", borderColor:"#001529"}} type="primary" shape="round" icon={<LinkOutlined />} size={10}>
        Ir a la fuente principal
      </Button>

            </Row>
        </div>
    )
}
