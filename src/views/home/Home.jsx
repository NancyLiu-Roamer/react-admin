import React, { useEffect, useRef, useState } from 'react'
import { Card, Col, Row, List } from 'antd';
import * as Echarts from 'echarts';
import _ from 'lodash';
import makePie from '../../components/charts/Pie';
import makeDonuts from '../../components/charts/Donuts';
import makeBar from '../../components/charts/Bar';
import { NavLink } from 'react-router-dom';
import { reqBlog } from '../../api/blog/index';
import { reqUserList } from '../../api/user/user';
export default function Home() {

    const [recentUpBlog, setRecentUpBlog] = useState()
    const [recentArchBlog, setRecentArchBlog] = useState()
    const barRef = useRef()
    const pieRef = useRef()
    const donutRef = useRef()

    //recent upload
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await reqBlog({})
                const response = res.data.data.blogs
                const temp = _.orderBy(response, ['response.date'], ['desc']).slice(0, 5);
                setRecentUpBlog(temp)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [])

    // recent archive
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await reqBlog({ 'status': 3 })
                const response = res.data.data.blogs
                const temp = _.orderBy(response, ['response.date'], ['desc']).slice(0, 5);
                setRecentArchBlog(temp)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [])


    //bar data posts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await reqBlog({})
                const response = res.data.data.blogs
                const option = makeBar('Post per Status', response)
                const myChart = Echarts.init(barRef.current);
                myChart.setOption(option)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [])

    //pie data users
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await reqUserList({})
                const response = res.data.data
                console.log(response);
                const option = makePie('Status', response)
                const myChart = Echarts.init(pieRef.current);
                myChart.setOption(option)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [])

    //donuts data catogries
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await reqBlog({})
                const response = res.data.data
                const option = makeDonuts('Categories', response)
                const myChart = Echarts.init(donutRef.current);
                myChart.setOption(option)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()

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
