import {Button, Form, Input, message, Modal, Select} from "antd";
import React, {useEffect, useState} from "react";
import {addAdmin} from "../../api/admin";
import {getAllRole} from "../../api/role";
import {IRole} from "../role/RoleList";

const layout = {
    labelCol: {span: 5},
    wrapperCol: {span: 16}
}
const tailLayout = {
    wrapperCol: {offset: 8, span: 16}
}

interface IProps {
    visible: boolean
    cancel: (refresh?: boolean) => void
}

const AddAdmin: React.FC<IProps> = (props: IProps) => {
    const [form] = Form.useForm()
    const [roleList, setRoleList] = useState<IRole[]>([])
    const cancel = () => {
        props.cancel(false)
    }
    useEffect(() => {
        return () => {
            if (props.visible) {
                form.resetFields()
            }
        }
        // eslint-disable-next-line
    }, [props.visible])
    useEffect(() => {
        getAllRole().then(response => {
            const {data} = response.data
            setRoleList(data)
        })
        // eslint-disable-next-line
    }, [props.visible])
    const addAdminFunc = (admin: any) => {
        addAdmin(admin).then(response => {
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
            title='添加管理员'
            visible={props.visible}
            onCancel={cancel}
            footer={null}
        >
            <Form
                form={form}
                {...layout}
                onFinish={addAdminFunc}
                initialValues={{
                    adminName: '',
                    password: '',
                    roleId: ''
                }}
            >
                <Form.Item
                    label={'管理员用户名'}
                    name={'adminName'}
                    rules={[
                        {
                            type: 'string',
                            required: true,
                            validator: (rule, value) => {
                                if (value === '') {
                                    return Promise.reject('管理员姓名不可以为空')
                                }
                                return Promise.resolve()
                            }
                        }
                    ]}
                >
                    <Input autoComplete='off'/>
                </Form.Item>
                <Form.Item
                    label='密码'
                    name='password'
                    rules={[
                        {
                            type: 'string',
                            required: true,
                            validator: (rule, value) => {
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
                <Form.Item
                    label='角色'
                    name='roleId'
                    rules={[
                        {
                            type: 'string',
                            required: true,
                            validator: (rule, value) => {
                                if (value === undefined) {
                                    return Promise.reject('请选择一个角色')
                                }
                                return Promise.resolve();
                            }
                        }
                    ]}
                >
                    <Select
                        allowClear
                        placeholder={'选择管理员'}
                    >
                        {
                            roleList.map(role => (
                                <Select.Option value={role.id} key={role.id}>{role.roleName}</Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type={'primary'} htmlType={'submit'}>
                        添加
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default AddAdmin