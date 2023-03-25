import {Button, Form, Input, message, Modal} from "antd";
import React, {useEffect} from "react";
import {IUser} from "./UserList";
import {addUser} from "../../api/user";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

interface IProps {
    visible: boolean
    cancel: (refresh?: boolean) => void
}

const AddUser: React.FC<IProps> = (props: IProps) => {
    const [form] = Form.useForm()
    useEffect(() => {
            return () => {
                form.resetFields()
            }
        },
        // eslint-disable-next-line
        [props.visible]
    )
    const cancel = () => {
        props.cancel()
    }
    const addUserFunc = (user: IUser) => {
        addUser(user).then(response => {
            const {code, msg} = response.data
            if (code === 0) {
                message.success(msg)
                props.cancel(true)
            } else {
                message.error(msg)
            }
        })
    }
    return (
        <Modal
            maskClosable={false}
            title='添加用户'
            visible={props.visible}
            onCancel={cancel}
            footer={null}
        >
            <Form
                {...layout}
                form={form}
                initialValues={{
                    username: '',
                    password: ''
                }}
                onFinish={addUserFunc}
            >
                <Form.Item
                    label={'用户名'}
                    name={'username'}
                    rules={[
                        {
                            type: 'string',
                            required: true,
                            validator: (rule, value) => {
                                if (value === '') {
                                    return Promise.reject('用户名不可以为空')
                                }
                                return Promise.resolve()
                            }
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label={'密码'}
                    name={'password'}
                    rules={[
                        {
                            type: 'string',
                            required: true,
                            validator: (rule, value) => {
                                if (value === '') {
                                    return Promise.resolve();
                                }
                                if (value.length < 6) {
                                    return Promise.reject('密码长度至少6位')
                                }
                                return Promise.resolve();
                            }
                        }
                    ]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        添加
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default AddUser