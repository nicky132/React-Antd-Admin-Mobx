import React, {useEffect, useState} from "react";
import {Button, Form, Input, message, Modal, Tree} from "antd";
import {IRole} from "./RoleList";
import {addRole} from "../../api/role";
import {getPermissionList} from "../../api/permission";

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


export interface IPermission {
    id: number
    path: string
    pid: number,
    key: string
    children: IPermission[]
}

const AddRole: React.FC<IProps> = (props: IProps) => {
    const [loading, setLoading] = useState(true)
    const [permission, setPermission] = useState<IPermission[]>([])
    const [form] = Form.useForm()
    const cancel = () => {
        props.cancel()
    }

    useEffect(() => {
        if (loading) {
            getPermission();
        }
        return () => {
            // 为了防止内存泄露【如果为false说明没有初始化，拿不到表单的引用】
            if (props.visible) {
                form.resetFields()
            }
        }
    })
    const generatePermissionList = (permissionList: IPermission[], parentId: number = 0) => {
        let pList: IPermission[] = []
        permissionList.forEach(p => {
            if (p.pid === parentId) {
                p.key = p.id + ''
                p.children = generatePermissionList(permissionList, p.id)
                pList.push(p)
            }
        })
        return pList
    }

    const getPermission = () => {
        setLoading(false)
        getPermissionList().then(response => {
            const {data} = response.data
            setPermission(generatePermissionList(data))
        })
    }
    const createRole = (role: IRole) => {
        addRole(role).then(response => {
            const {code, msg} = response.data
            if (code === 0) {
                message.success(msg)
                props.cancel(true)
            } else {
                message.error(msg)
            }
        })
    }


    const onExpand = (expandedKeysValue: React.Key[]) => {
        console.log('onExpand', expandedKeysValue);
    };

    const onCheck = (checkedKeysValue: any) => {
        form.setFieldsValue({permissionList: checkedKeysValue.checked as []})
    };

    const onSelect = (selectedKeysValue: React.Key[], info: any) => {
        console.log('onSelect', info);
    };

    return (
        <Modal
            forceRender
            title={'添加角色'}
            visible={props.visible}
            onCancel={cancel}
            footer={null}
            {...layout}
        >
            <Form
                form={form}
                initialValues={{
                    roleName: '',
                    permissionList: []
                }}
                onFinish={createRole}
            >
                <Form.Item
                    label={'角色名称'}
                    name={'roleName'}
                    rules={[
                        {
                            type: 'string',
                            required: true,
                            validator: (rule, value) => {
                                if (value === '') {
                                    return Promise.reject('角色名称不可以为空')
                                }
                                return Promise.resolve()
                            }
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>
                {
                    permission.length > 0 ?
                        <Form.Item
                            label={'权限'}
                            name='permissionList'
                            rules={[
                                {
                                    type: "array",
                                    min: 1,
                                    required: true,
                                    validator: (rule, value) => {
                                        if (value === undefined) {
                                            return Promise.reject('至少要选择一个权限！')
                                        }
                                        if (value.length <= 0) {
                                            return Promise.reject('至少要选择一个权限！');
                                        }
                                        return Promise.resolve()
                                    }
                                },
                            ]}
                        >
                            < Tree
                                checkStrictly={true}
                                checkable
                                showLine
                                onExpand={onExpand}
                                autoExpandParent
                                defaultExpandAll
                                onCheck={onCheck}
                                onSelect={onSelect}
                                treeData={permission}
                            />

                        </Form.Item>
                        :
                        null
                }

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        添加
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
export default AddRole