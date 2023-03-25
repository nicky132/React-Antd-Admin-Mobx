import React, {Component} from 'react';
import {Button, Space, Table} from "antd";
import {getUserList} from "../../api/user";
import DeleteUser from "./DeleteUser";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import SearchUser from "./SearchUser";
import Auth from '../../components/Auth';

export interface IUser {
    id: number
    roleName: string
}

interface IState {
    dataList: IUser[]
    loading: boolean
    total: number
    defaultCurrent: number
    defaultPageSize: number
    isShowAddUserModal: boolean
    user?: IUser
    isShowEditUserModal: boolean
}

class UserList extends Component<any, IState> {

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            dataList: [],
            loading: true,
            total: 0,
            defaultCurrent: 1,
            defaultPageSize: 15,
            isShowAddUserModal: false,
            isShowEditUserModal: false
        }
    }

    getUserList = (page: number = 1, keyword: string = '') => {
        getUserList(page, keyword).then(response => {
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
    change = (page: number) => {
        this.getUserList(page)
    }

    componentDidMount() {
        this.getUserList()
    }

    deleteUser = (user: IUser) => {
        this.setState((state) => ({
            dataList: state.dataList.filter(u => u.id !== user.id)
        }))
    }
    showAddUser = () => {
        this.setState({
            isShowAddUserModal: true
        })
    }
    cancelAddUser = (refresh?: boolean) => {
        if (refresh) {
            this.getUserList()
        }
        this.setState({isShowAddUserModal: false});
    }
    showEditUserModal = (user: IUser) => {
        this.setState({
            user: user,
            isShowEditUserModal: true
        })
    }
    cancelEditUserModal = (refresh?: boolean) => {
        if (refresh) {
            this.getUserList()
        }
        this.setState({
            isShowEditUserModal: false
        })
    }

    render() {
        return (
            <>
                <SearchUser search={this.getUserList}>
                    <Auth path={'addUser'}>
                        <Button type={'primary'} onClick={this.showAddUser}>添加用户</Button>
                    </Auth>
                </SearchUser>
                <AddUser visible={this.state.isShowAddUserModal} cancel={this.cancelAddUser}/>
                <EditUser
                    user={this.state.user}
                    visible={this.state.isShowEditUserModal}
                    cancel={this.cancelEditUserModal}
                />
                <Table
                    dataSource={this.state.dataList}
                    rowKey={'id'}
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
                    <Table.Column
                        title={'id'}
                        dataIndex={'id'}/>
                    <Table.Column
                        title={'用户名'}
                        dataIndex={'username'}/>
                    <Table.Column
                        title={'管理'}
                        render={(user: IUser) => (
                            <>
                                <Space>
                                    <Auth path={'editUser'}>
                                        <Button
                                            type='primary'
                                            onClick={() => {
                                                this.showEditUserModal(user)
                                            }}
                                        >
                                            编辑
                                        </Button>
                                    </Auth>
                                    <Auth path={'deleteUser'}>
                                        <DeleteUser user={user} deleteUser={this.deleteUser}/>
                                    </Auth>
                                </Space>
                            </>
                        )}
                    />
                </Table>
            </>
        );
    }
}

export default UserList;
