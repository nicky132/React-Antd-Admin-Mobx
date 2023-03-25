import React, {ReactNode} from "react";
import {Button, Form, Input, Space} from "antd";

interface IProps {
    children?: ReactNode
    search: (page: number, keyword: string) => void
}

const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

const formItemLayout = {
    labelCol: {span: 12},
    wrapperCol: {span: 24},
}
const SearchUser: React.FC<IProps> = (props: IProps) => {
    const search = (user: any) => {
        props.search(1, user.username)
    }
    return (
        <>
            <Form
                {...formItemLayout}
                layout='inline'
                onFinish={search}
                initialValues={{
                    username: ''
                }}
            >
                <Form.Item label={'用户名'} name={'username'}>
                    <Input allowClear/>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            搜索
                        </Button>
                        {props.children}

                    </Space>
                </Form.Item>
            </Form>
        </>
    )
}
export default SearchUser