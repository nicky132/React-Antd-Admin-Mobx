import request from "../utils/request";

export function getUserList(page: number, keyword: string = '') {
    return request({
        url: '/admin/user/list',
        params: {page: page, keyword: keyword}
    })
}

export function deleteUserById(userId: number) {
    return request({
        url: '/admin/user/' + userId,
        method: 'delete'
    })
}

export function addUser(user: any) {
    return request({
        url: '/admin/user',
        method: 'post',
        data: user
    })
}

export function updateUser(userId: number, user: any) {
    return request({
        url: '/admin/user/' + userId,
        method: 'put',
        data: user
    })
}