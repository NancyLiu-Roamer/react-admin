import React, { useEffect, useState } from 'react'
import { Card,Row,Col } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
const { Meta } = Card;
export default function Posts() {
    const [blogList, setBlogList] = useState()

    useEffect(() => {
        axios.get('http://localhost:3000/posts').then(
            res => {
                setBlogList(res.data)
            }
        )
    }, [])
    return (
        <div >
           <Row gutter={[24,24]}>
                {
                    blogList?.map(item => {
                        return (                             
                            <Col span={6} key={item.id}>
                                <Link to={`/blog-management/preview/${item.id}`}>
                                    <Card
                                        hoverable
                                        style={{ width: '250px' }}
                                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                                    >
                                        <Meta title={item.title} description={item.date} />
                                    </Card>
                                </Link>
                             </Col>

                        )
                    })
                }
            </Row>
        </div>
    )
}
