import React, {useEffect, useState} from "react";
import {IAdmin} from "./AdminList";
import {Button, Form, Input, message, Modal, Select} from "antd";
import {updateAdmin} from "../../api/admin";
import {getAllRole} from "../../api/role";
import {IRole} from "../role/RoleList";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

interface IProps {
    admin?: IAdmin
    visible?: boolean
    cancelEditAdminModal: (refresh?: boolean) => void
}

const EditAdmin: React.FC<IProps> = (props: IProps) => {
    const [form] = Form.useForm();
    const [roleList, setRoleList] = useState<IRole[]>([])
    const cancelEditAdminModal = () => {
        props.cancelEditAdminModal()
    }
    const saveAdmin = (admin: any) => {
        updateAdmin(props.admin?.id as number, admin).then(response => {
            const {msg, code} = response.data
            if (code === 0) {
                message.success(msg)
                props.cancelEditAdminModal(true)
            } else {
                message.error(msg)
            }
        })
    }
    useEffect(() => {
        return () => {
            form.resetFields()
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
    return (
        <>
            <Modal
                forceRender
                title='编辑管理员信息'
                visible={props.visible}
                onCancel={cancelEditAdminModal}
                footer={null}
            >
                <Form
                    form={form}
                    {...layout}
                    onFinish={saveAdmin}
                    initialValues={
                        {
                            ...props.admin,
                            ...{password: ''}
                        }
                    }
                >
                    <Form.Item
                        label='姓名'
                        name='adminName'
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
                        label='密码'
                        name='password'
                        rules={[
                            {
                                type: 'string',
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
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
export default EditAdmin
