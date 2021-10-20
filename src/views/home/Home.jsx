import React, { useEffect, useRef, useState } from 'react'
import { Card, Col, Row, List } from 'antd';
import * as Echarts from 'echarts';
import axios from 'axios';
import _ from 'lodash';
import makePie from '../../components/charts/pie';
import makeDonuts from '../../components/charts/donuts';
import makeBar from '../../components/charts/bar';
import { NavLink } from 'react-router-dom';
export default function Home() {

    const [recentUpBlog, setRecentUpBlog] = useState()
    const [recentArchBlog, setRecentArchBlog] = useState()
    const barRef = useRef()
    const pieRef = useRef()
    const donutRef = useRef()

    //recent upload
    useEffect(() => {
        axios.get(`http://localhost:3000/posts`).then(
            res => {
                const temp = _.orderBy(res.data, ['res.data.date'], ['desc']).slice(0, 5);
                setRecentUpBlog(temp)
            }
        )
    }, [])
    // recent archive
    useEffect(() => {
        axios.get(`http://localhost:3000/posts?status=3`).then(
            res => {
                const temp = _.orderBy(res.data, ['res.data.date'], ['desc']).slice(0, 5);
                setRecentArchBlog(temp)
            }
        )
    }, [])


    //bar data posts
    useEffect(() => {
        axios.get('http://localhost:3000/posts').then(
            res => {
                const option = makeBar('Post per Status',res.data)
                const myChart = Echarts.init(barRef.current);
                myChart.setOption(option)
            }
        )
    }, [])

    //pie data users
    useEffect(() => {
        axios.get('http://localhost:3000/users?_expand=role').then(
            res => {
                const option = makePie('Status',res.data) 
                const myChart = Echarts.init(pieRef.current);
                myChart.setOption(option)
            }
        )
    }, [])
 
    //donuts data catogries
    useEffect(() => {
        axios.get('http://localhost:3000/posts').then(            
            res => {
                const option = makeDonuts('Catogories',res.data)
                const myChart = Echarts.init(donutRef.current);
                myChart.setOption(option)
            }
        )

    }, [])

    return (
        <div>
            <Row gutter={[10, 5]} >
                <Col span={6}>
                    <Card title="Recent Posted" bordered>
                        <List
                            size="small"
                            dataSource={recentUpBlog}
                            renderItem={item => <List.Item><NavLink to={`/blog-management/preview/${item.id}`}>{item.title}</NavLink></List.Item>}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Recent Archived" bordered>
                        <List
                            size="small"
                            dataSource={recentArchBlog}
                            renderItem={item => <List.Item><NavLink to={`/blog-management/preview/${item.id}`}>{item.title}</NavLink></List.Item>}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card bordered title='Posts per Status'>
                        <div ref={barRef} style={{ height: '300px', width: '100%' }}></div>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card bordered title='Users'>
                        <div ref={pieRef} style={{ height: '300px', width: '100%' }}></div>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card bordered title='Posts per Catogories'>
                        <div ref={donutRef} style={{ height: '300px', width: '100%' }}>
                        </div>
                    </Card>
                </Col>

            </Row>


        </div>
    )
}
