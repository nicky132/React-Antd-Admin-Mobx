import React from "react";
import {Button, message, Popconfirm} from "antd";
import {IUser} from "./UserList";
import {deleteUserById} from "../../api/user";

interface IProps {
    user: IUser
    deleteUser: (user: IUser) => void
}

const DeleteUser: React.FC<IProps> = (props: IProps) => {
    const cancel = () => {
        message.info('取消删除')
    }
    const deleteUser = () => {
        deleteUserById(props.user.id).then(response => {
            const {code, msg} = response.data
            if (code === 0) {
                message.success(msg)
                props.deleteUser(props.user)
            } else {
                message.error(msg)
            }
        })
    }
    return (
        <Popconfirm
            title={'删除后不可以恢复'}
            onCancel={cancel}
            onConfirm={deleteUser}
        >
            <Button type='primary' danger>删除</Button>
        </Popconfirm>
    )
}
export default DeleteUser