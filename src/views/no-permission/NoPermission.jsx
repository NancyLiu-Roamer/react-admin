import React from 'react'
import { NavLink } from 'react-router-dom';
import { Result, Button } from 'antd';
export default function NoPermission() {
    return (
        <div>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary"><NavLink to='/home'>Back to Home</NavLink></Button>}
            />,
        </div>
    )
}
