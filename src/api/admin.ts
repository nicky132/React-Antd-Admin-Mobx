import request from "../utils/request";

export const getAdminList = (page: number = 1) => {
    return request({
        url: '/admin/admin/list',
        params: {page: page}
    })
}

export const deleteAdminById = (adminId: number) => {
    return request({
        url: '/admin/admin/' + adminId,
        method: 'delete'
    })
}
export const updateAdmin = (adminId: number, admin: any) => {
    return request({
        url: '/admin/admin/' + adminId,
        method: 'put',
        data: admin
    })
}

export function addAdmin(admin: any) {
    return request({
        url: '/admin/admin',
        method: 'post',
        data: admin
    })
}

export function getAdminInfo() {
    return request({
        url: '/admin/admin/info'
    })
}
