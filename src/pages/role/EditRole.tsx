import {Button, Form, Input, message, Modal, Spin, Tree} from "antd";
import React, {useEffect, useState} from "react";
import {IRole} from "./RoleList";
import {IPermission} from "./AddRole";
import {getPermissionList} from "../../api/permission";
import {getRolePermission, updateRole} from "../../api/role";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

interface IProps {
    role?: IRole
    visible: boolean
    cancel: (refresh?: boolean) => void
}

const EditRole: React.FC<IProps> = (props: IProps) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(true)
    const [permission, setPermission] = useState<IPermission[]>([])
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
    const cancel = () => {
        message.info('取消编辑')
        props.cancel()
        form.resetFields();
    }
    useEffect(() => {
        if (loading) {
            const getPermission = () => {
                setLoading(false)
                getPermissionList().then(response => {
                    const {data} = response.data
                    setPermission(generatePermissionList(data))
                });
            }
            getPermission();
        }
        return () => {
            if (props.visible) {
                form.resetFields();
            }
        }
        // eslint-disable-next-line
    }, [loading])

    useEffect(() => {
        if (props.visible) {
            if (props.role) {
                const getRoleById = (roleId: number) => {
                    getRolePermission(props.role?.id as number).then(response => {
                        const {data} = response.data
                        let keys = (data as IPermission[]).map(p => p.id + '');
                        form.setFieldsValue({...props.role, ...{permissionList: keys}})
                        setCheckedKeys(keys)
                    })
                }
                getRoleById(props.role?.id as number);
            }
        }
        return () => {
            if (props.role) {
                setCheckedKeys([]);
            }
        }
        // eslint-disable-next-line
    }, [props.role])
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

    const onExpand = (expandedKeysValue: React.Key[]) => {
        console.log('onExpand', expandedKeysValue);
    };

    const onCheck = (checkedKeysValue: any) => {
        form.setFieldsValue({permissionList: checkedKeysValue.checked})
        setCheckedKeys(checkedKeysValue)
    };

    const onSelect = (selectedKeysValue: React.Key[], info: any) => {
        console.log('onSelect', info);
    };
    const saveRole = (role: any) => {
        console.log(role)
        updateRole(props.role?.id as number, role).then(response => {
            const {msg, code} = response.data
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
            forceRender
            title={'编辑角色'}
            footer={null}
            visible={props.visible}
            onCancel={cancel}
        >
            <Form
                form={form}
                {...layout}
                initialValues={{
                    ...props.role,
                    // permissionList: checkedKeys
                }}
                onFinish={saveRole}
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
                                checkable
                                checkStrictly={true}
                                showLine
                                onExpand={onExpand}
                                autoExpandParent
                                defaultExpandAll
                                onCheck={onCheck}
                                onSelect={onSelect}
                                checkedKeys={checkedKeys}
                                treeData={permission}
                            />

                        </Form.Item>
                        :
                        <Spin/>
                }
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        保存
                    </Button>
                </Form.Item>

            </Form>
        </Modal>
    )
}
export default EditRole