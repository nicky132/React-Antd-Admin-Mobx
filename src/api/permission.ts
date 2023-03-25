import request from "../utils/request";

export const getPermissionList = () => {
    return request({
        url: '/admin/permission/list'
    })
}
export const getAdminPermission = () => {
    return request({
        url: '/admin/admin/permission'
    })
}