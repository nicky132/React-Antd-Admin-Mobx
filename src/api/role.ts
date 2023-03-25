import request from "../utils/request";

export const deleteRoleById = (roleId: number) => {
    return request({
        url: '/admin/role/' + roleId,
        method: 'delete'
    })
}
export const getRoleList = (page: number = 1) => {
    return request({
        url: '/admin/role/list',
        params: {page: page}
    })
}
export const addRole = (role: any) => {
    return request({
        url: '/admin/role',
        method: 'post',
        data: role
    })
}
export const getRolePermission = (roleId: number) => {
    return request({
        url: '/admin/role/permission/' + roleId
    })
}
export const updateRole = (roleId: number, role: any) => {
    return request({
        url: '/admin/role/' + roleId,
        method: 'put',
        data: role
    })
}

export function getAllRole() {
    return request({
        url: '/admin/role/all'
    })
}