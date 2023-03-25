import request from "../utils/request";

export const login = (admin: any) => {
    return request({
        url: '/admin/login',
        method: 'post',
        data: admin
    })
}