import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button } from 'antd';
import { MapContainer, TileLayer, Popup, Polyline} from 'react-leaflet';
import { DownOutlined, DownloadOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, Typography } from 'antd';

const { Title, Text } = Typography;
const { Meta } = Card;

export default function Carbono() {
    const jalisco = [20.3333 , -103.66]
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [area, setArea] = useState("");
    const [co2, setCo2] = useState("");
    const [img, setImg] = useState("");

    const [focus, setFocus] = useState(jalisco);
    const [coordinates, setCoordinates] = useState([jalisco]);

    const [st_id, setId] = useState(1);

    const getApiData = async () => {
        const response = await fetch(
        "http://localhost:8080/carbono/"+st_id.toString()
        ).then((response) => response.json());
        setName(response[0]);
        setDesc(response[1]);
        setCoordinates(response[2]);
        setFocus(response[2][0]);
        setArea(response[3])
        setCo2(response[4])
        setImg("/home/armando/Repos/TALEND/front/my-app/src/image/"+st_id.toString()+".png")

    };
    
    useEffect(() => {
        getApiData(st_id);
    }, [st_id]); 

    function handleClick(e) {
        setId(e.key);;
    }

    const menu = <Menu onClick={handleClick}
        items={[
            {
                type: 'group',
                label: 'Bosques Urbano',
                children: [
                    {
                        key: '1',
                        label: 'Bosque de Tlaquepaque',
                    },
                    {
                        key: '2',
                        label: 'Parque González Gallo',
                    },
                    {
                        key: '3',
                        label: 'Parque Ávila Camacho',
                    },
                ],
            },
            {
                type: 'group',
                label: 'Otros Bosques', 
                children: [
                    {
                        key: '4',
                        label: 'Otro Bosque 1',
                    },
                    {
                        key: '5',
                        label: 'Otro Bosque 1',
                    },
                ],
            },
        ]}
    />
    return (
        <div>

<Row gutter={[10, 10]}>
                <Col span={24} style={{ textAlign: "center" }}>
                    <Title>Cálculo de Carbono</Title>
                </Col>
            </Row>
<Row gutter={[2, 2]} style={{ alignContent: "center" }}>

<Col span={4}/>
                <Col span={8}>
                    


         
                <Dropdown overlay={menu} trigger={["click"]}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        Carbono
                                        <DownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                            <Card title={name} extra={ <Button type="primary" shape="circle" icon={<DownloadOutlined />} size={10} />} style={{ width: 300 }}>
                                <p><Text strong>ÁREA DE LA COPA</Text> {area} %</p>
                                <p><Text strong>CO2</Text>  {co2} Gt CO2eq </p>
                            </Card>
                            <Card hoverable style={{ width: 300 }} cover={<img alt="example" src={require(`../image/${st_id}.png`)} />}/>
                            </Col>
   

                <Col span={2}>


                <MapContainer key={focus} center={focus} zoom={15} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                         
                         <Polyline positions={coordinates} color={'blue'}>
                         <Popup>
                                {desc}
                            </Popup>
                            </Polyline>
                    </MapContainer>



                           
                </Col>
            </Row>
        </div>
    )
}
