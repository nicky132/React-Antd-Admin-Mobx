import React from "react";
import {Button, message, Popconfirm} from "antd";
import {deleteAdminById} from "../../api/admin";

interface IProps{
    id: number
    deleteAdmin: (adminId: number, refresh?: boolean) => void
}

const DeleteAdmin: React.FC<IProps> = (props: IProps) => {
    const deleteAdmin = () => {
        deleteAdminById(props.id).then(response => {
            const {code, msg} = response.data
            if (code === 0) {
                message.success(msg)
                props.deleteAdmin(props.id)
            } else {
                message.error(msg)
            }
        });
    }
    return (
        <>
            <Popconfirm
                title='删除管理员'
                onConfirm={deleteAdmin}
            >
                <Button type={'primary'} danger>
                    删除
                </Button>
            </Popconfirm>
        </>
    )
}
export default DeleteAdmin