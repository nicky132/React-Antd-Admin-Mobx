import {Button, Form, Input, message, Modal} from "antd";
import React, {useEffect} from "react";
import {IUser} from "./UserList";
import {updateUser} from "../../api/user";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

interface IProps {
    visible: boolean
    user?: IUser
    cancel: (refresh?: boolean) => void
}

const EditUser: React.FC<IProps> = (props: IProps) => {
    const [form] = Form.useForm()
    useEffect(() => {
        return () => {
            form.resetFields()
        }
        // eslint-disable-next-line
    }, [props.visible])
    const cancel = () => {
        props.cancel()
    }
    const saveUser = (user: IUser) => {
        updateUser(props.user?.id as number, user).then(response => {
            const {code, msg} = response.data
            if (code === 0) {
                message.success(msg);
                props.cancel(true)
            } else {
                message.error(msg)
            }
        })
    }
    return (
        <Modal
            maskClosable={false}
            title={'编辑用户'}
            visible={props.visible}
            onCancel={cancel}
            footer={null}
        >
            <Form
                {...layout}
                form={form}
                initialValues={{
                    ...props.user
                }}
                onFinish={saveUser}
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
                    <Input autoComplete='off'/>
                </Form.Item>
                <Form.Item
                    label={'密码'}
                    name={'password'}
                    rules={[
                        {
                            type: 'string',
                            validator: (rule, value) => {
                                if (value === undefined || value === '') {
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
                    <Input.Password autoComplete='off'/>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        更新
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default EditUser