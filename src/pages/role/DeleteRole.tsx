import React from "react";
import {IRole} from "./RoleList";
import {Button, message, Popconfirm} from "antd";
import {deleteRoleById} from "../../api/role";

interface IProps {
    role: IRole
    deleteRole: (role: IRole) => void
}

const DeleteRole: React.FC<IProps> = (props: IProps) => {
    const deleteRole = () => {
        deleteRoleById(props.role.id).then(response => {
            const {code, msg} = response.data
            if (code === 0) {
                message.success(msg)
                props.deleteRole(props.role)
            } else {
                message.error(msg)
            }
        })
    }
    return (
        <>
            <Popconfirm
                title={'删除角色'}
                onConfirm={deleteRole}
            >
                <Button type={'primary'} danger>删除</Button>
            </Popconfirm>
        </>
    )
}
export default DeleteRole
