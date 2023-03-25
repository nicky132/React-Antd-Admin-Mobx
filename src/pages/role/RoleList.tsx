import React, {Component} from 'react';
import {Button, Space, Table} from "antd";
import {getRoleList} from "../../api/role";
import DeleteRole from "./DeleteRole";
import AddRole from "./AddRole";
import EditRole from "./EditRole";
import Auth from "../../components/Auth";

export interface IRole {
    id: number
    roleName: string
    createdAt: string
}

interface ISate {
    dataList: IRole[]
    loading: boolean
    total: number
    defaultCurrent: number
    defaultPageSize: number
    isShowAddRoleModal: boolean
    role?: IRole
    isShowEditRoleModal: boolean
}

class RoleList extends Component<any, ISate> {

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            dataList: [],
            loading: true,
            total: 0,
            defaultCurrent: 1,
            defaultPageSize: 15,
            isShowAddRoleModal: false,
            isShowEditRoleModal: false
        }
    }

    getRoleList = (page: number = 1) => {
        getRoleList(page).then(response => {
            const {data, total, perPage, currentPage} = response.data.data
            this.setState({
                dataList: data,
                loading: false,
                total: total,
                defaultPageSize: perPage,
                defaultCurrent: currentPage
            })
        })
    }

    componentDidMount() {
        this.getRoleList()
    }

    change = (page: number) => {
        this.getRoleList(page)
    }
    deleteRole = (role: IRole) => {
        this.setState((state) => ({
            dataList: state.dataList.filter(r => r.id !== role.id)
        }))
    }
    showAddRoleModal = () => {
        this.setState({isShowAddRoleModal: true})
    }
    cancelAddRole = (refresh?: boolean) => {
        this.setState({isShowAddRoleModal: false});
        if (refresh) {
            this.getRoleList()
        }
    }
    showEditRoleModal = (role: IRole) => {
        this.setState({
            role: role,
            isShowEditRoleModal: true
        })
    }
    cancelEditRoleModal = (refresh?: boolean) => {
        if (refresh) {
        }
        this.setState({
            isShowEditRoleModal: false
        })
    }

    render() {
        return (
            <>
                <Auth path={'addRole'}>
                    <Button type={'primary'} onClick={this.showAddRoleModal}>添加角色</Button>
                </Auth>
                <AddRole
                    visible={this.state.isShowAddRoleModal}
                    cancel={this.cancelAddRole}
                />
                <EditRole
                    role={this.state.role}
                    visible={this.state.isShowEditRoleModal}
                    cancel={this.cancelEditRoleModal}
                />
                <Table
                    dataSource={this.state.dataList}
                    rowKey={'id'}
                    loading={this.state.loading}
                    pagination={{
                        position: ['bottomCenter'],
                        hideOnSinglePage: true,
                        total: this.state.total,
                        defaultCurrent: this.state.defaultCurrent,
                        defaultPageSize: this.state.defaultPageSize,
                        showSizeChanger: false,
                        onChange: this.change
                    }}
                >
                    <Table.Column title={'ID'} dataIndex={'id'}/>
                    <Table.Column title={'角色名称'} dataIndex={'roleName'}/>
                    <Table.Column title={'创建时间'} dataIndex={'createdAt'}/>
                    <Table.Column title={'管理'} render={(role: IRole) => (<Space>
                        <Auth path={'editRole'}>
                            <Button type={'primary'} onClick={() => {
                                this.showEditRoleModal(role)
                            }}>编辑</Button>
                        </Auth>
                        <Auth path={'deleteRole'}>
                            <DeleteRole role={role} deleteRole={this.deleteRole}/>
                        </Auth>
                    </Space>)}/>
                </Table>
            </>
        );
    }
}

export default RoleList;
