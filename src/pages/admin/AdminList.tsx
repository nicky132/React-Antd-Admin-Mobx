import React, {useEffect, useState} from 'react';
import {getAdminList} from "../../api/admin";
import {Button, Space, Table} from "antd";
import DeleteAdmin from "./DeleteAdmin";
import EditAdmin from "./EditAdmin";
import AddAdmin from "./AddAdmin";
import Auth from "../../components/Auth";

export interface IAdmin {
    id: number
    adminName: string
    createdAt: string
}

interface ISate {
    dataList: IAdmin[]
    loading: boolean
    total: number
    defaultCurrent: number
    defaultPageSize: number
    admin?: IAdmin
    isShowEditAdminModal?: boolean
}

const AdminList: React.FC = () => {
    const [tableData, setTableData] = useState<ISate>({
        dataList: [],
        loading: true,
        total: 0,
        defaultCurrent: 1,
        defaultPageSize: 15,
    })
    const [isShowAddAdminModal, setIsShowAddAdminModal] = useState<boolean>(false)
    useEffect(() => {
        if (tableData.loading) {
            getAdminDate()
        }
    }, [tableData.loading])
    const getAdminDate = (page: number = 1) => {
        getAdminList(page).then(response => {
            const {data, total, perPage, currentPage} = response.data.data
            setTableData({
                dataList: data,
                loading: false,
                total: total,
                defaultPageSize: perPage,
                defaultCurrent: currentPage
            })
        });
    }
    const change = (page: number) => {
        getAdminDate(page)
    }
    const deleteAdmin = (adminId: number, refresh?: boolean) => {
        setTableData({...tableData, ...{dataList: tableData.dataList.filter(admin => admin.id !== adminId)}})
    }
    const showEditAdminModal = (admin: IAdmin, visible?: boolean) => {
        setTableData({...tableData, ...{admin: admin, isShowEditAdminModal: visible}})
    }
    const cancelEditAdminModal = (refresh?: boolean) => {
        if (refresh) {
            getAdminDate(tableData.defaultCurrent)
            setTableData({...tableData, ...{isShowEditAdminModal: false}});
        } else {
            setTableData({...tableData, ...{isShowEditAdminModal: false}});
        }
    }
    const showAddAdminModal = () => {
        setIsShowAddAdminModal(true)
    }
    const cancelAddAdminModal = (refresh?: boolean) => {
        if (refresh) {
            getAdminDate()
        }
        setIsShowAddAdminModal(false);
    }
    return (
        <>
            <Auth path={'addAdmin'}>
                <Button type={'primary'} onClick={showAddAdminModal}>添加管理员</Button>
            </Auth>
            <AddAdmin visible={isShowAddAdminModal} cancel={cancelAddAdminModal}/>
            <EditAdmin
                admin={tableData.admin}
                visible={tableData.isShowEditAdminModal}
                cancelEditAdminModal={cancelEditAdminModal}
            />
            <Table
                dataSource={tableData.dataList}
                loading={tableData.loading}
                rowKey='id'
                pagination={{
                    position: ['bottomCenter'],
                    hideOnSinglePage: true,
                    total: tableData.total,
                    defaultCurrent: tableData.defaultCurrent,
                    defaultPageSize: tableData.defaultPageSize,
                    showSizeChanger: false,
                    onChange: change
                }}
            >
                <Table.Column title='ID' dataIndex={'id'}/>
                <Table.Column title='管理员姓名' dataIndex={'adminName'}/>
                <Table.Column title='创建时间' dataIndex={'createdAt'}/>
                <Table.Column title='修改时间' dataIndex={'updatedAt'}/>
                <Table.Column
                    title='管理'
                    render={(admin: IAdmin) => (
                        <>
                            <Space>
                                <Auth path={'editAdmin'}>
                                    <Button
                                        type={'primary'}
                                        onClick={() => {
                                            showEditAdminModal(admin, true)
                                        }}>
                                        编辑
                                    </Button>
                                </Auth>
                                <Auth path={'deleteAdmin'}>
                                    <DeleteAdmin id={admin.id} deleteAdmin={deleteAdmin}/>
                                </Auth>
                            </Space>
                        </>
                    )}
                />
            </Table>
        </>
    );
}
export default AdminList;
