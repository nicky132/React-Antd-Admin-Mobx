import request from "../utils/request"

export const getCategoryList = (page: number = 1) => {
    return request({
        url: '/admin/category/list',
        params: { page: page }
    })
}
export const deleteCategoryById = (categoryId: number) => {
    return request({
        url: '/admin/category/' + categoryId,
        method: 'DELETE'
    })
}
export const updateCategoryById = (categoryId: number, category: any) => {
    return request({
        url: '/admin/category/' + categoryId,
        method: 'put',
        data: category
    })
}