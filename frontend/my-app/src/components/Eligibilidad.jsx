import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button } from 'antd';
import { MapContainer, TileLayer, Popup, Polyline} from 'react-leaflet';
import { DownOutlined, DownloadOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, Typography } from 'antd';
const { Title } = Typography;

export default function Carbono() {
    const jalisco = [20.3333 , -103.6667]
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    const [focus, setFocus] = useState(jalisco);
    const [coordinates, setCoordinates] = useState([jalisco]);

    const [st_id, setId] = useState(1);

    const getApiData = async () => {
        const response = await fetch(
        "http://localhost:8080/bosques/"+st_id.toString()
        ).then((response) => response.json());
        setName(response[0]);
        setDesc(response[1]);
        setCoordinates(response[2]);
        setFocus(response[2][0]);


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
                label: 'Group title',
                children: [
                    {
                        key: '4',
                        label: '1st menu item',
                    },
                    {
                        key: '5',
                        label: '2nd menu item',
                    },
                ],
            },
        ]}
    />
    return (
        <div>

<Row gutter={[8, 8]}>
                <Col span={24} style={{ textAlign: "center" }}>
                    <Title>Protocolo Forestal para México 2.0</Title>
                </Col>
            </Row>

<Row gutter={[5, 5]}>
                <Col span={12}>
                    
                <MapContainer key={focus} center={focus} zoom={15} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                         
                         <Polyline positions={coordinates} color={'red'}>
                         <Popup>
                                {desc}
                            </Popup>
                            </Polyline>
                    </MapContainer>

                </Col>
                <Col span={12}>
                <Dropdown overlay={menu} trigger={["click"]}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        Bosques
                                        <DownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                            <Card title={name} extra={ <Button type="primary" shape="circle" icon={<DownloadOutlined />} size={10} />} style={{ width: 300 }}>
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </Card>
                           
                </Col>
            </Row>
        </div>
    )
}
