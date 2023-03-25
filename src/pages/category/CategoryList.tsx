import { Button, Space, Table } from 'antd'
import React, { Component } from 'react'
import { getCategoryList } from '../../api/category'
import AddCategory from './AddCategory'
import DeleteCategory from './DeleteCategory'
import EditCategory from './EditCategory'
export interface ICategory {
    id: number
    categoryName: string
    sortOrder: number
}
interface IState {
    dataList: ICategory[]
    loading: boolean
    total: number
    defaultCurrent: number
    defaultPageSize: number
    category?: ICategory
    isShowEditCategoryModal?: boolean
    isShowAddCategoryModal?: boolean
}
export default class CategoryList extends Component<any, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            dataList: [],
            loading: true,
            total: 0,
            defaultCurrent: 1,
            defaultPageSize: 15,
        }
    }
    getCategoryList = (page: number = 1) => {
        getCategoryList(page).then(response => {
            const { data, total, perPage, currentPage } = response.data.data
            this.setState({
                dataList: data,
                loading: false,
                total: total,
                defaultPageSize: perPage,
                defaultCurrent: currentPage
            })
        })
    }
    componentDidMount() {
        this.getCategoryList()
    }
    change = (page: number) => {
        this.getCategoryList(page)
    }
    deleteCategory = (category: ICategory) => {
        this.setState((state) => ({
            dataList: state.dataList.filter(c => category.id !== c.id)
        }))
    }
    showEditCategoryModal = (category: ICategory) => {
        this.setState({
            isShowEditCategoryModal: true,
            category: category
        })
    }
    hideEditCategoryModal = (refresh?: boolean) => {
        if (refresh) {
            this.getCategoryList()
        }
        this.setState({
            isShowEditCategoryModal: false,
            category: {} as ICategory
        })
    }
    showAddCategoryModal = () => {
        this.setState({
            isShowAddCategoryModal: true
        })
    }
    hideAddCategoryModal = (refresh?: boolean) => {
        if (refresh) {
            this.getCategoryList()
        }
        this.setState({
            isShowAddCategoryModal: false
        })
    }
    render() {
        return (
            <>
                <Button type='primary' onClick={this.showAddCategoryModal}>添加分类</Button>
                <AddCategory visible={this.state.isShowAddCategoryModal} cancel={this.hideAddCategoryModal} />
                <EditCategory cancel={this.hideEditCategoryModal} visible={this.state.isShowEditCategoryModal} category={this.state.category} />
                <Table
                    loading={this.state.loading}
                    dataSource={this.state.dataList}
                    rowKey='id'
                    pagination={{
                        position: ['bottomCenter'],
                        hideOnSinglePage: true,
                        total: this.state.total,
                        defaultCurrent: this.state.defaultCurrent,
                        defaultPageSize: this.state.defaultPageSize,
                        showSizeChanger: false,
                        onChange: this.change
                    }}
                >
                    <Table.Column
                        title='id'
                        dataIndex='id'
                    />
                    <Table.Column
                        title='分类名称'
                        dataIndex='categoryName'
                    />
                    <Table.Column
                        title='排序'
                        dataIndex='sortOrder'
                    />
                    <Table.Column
                        title='管理'
                        render={(category: ICategory) => (<>
                            <Space>
                                <Button onClick={() => { this.showEditCategoryModal(category) }} type='primary'>编辑</Button>
                                <DeleteCategory deleteCategory={this.deleteCategory} category={category} />
                            </Space>
                        </>)}
                    />
                </Table>
            </>
        )
    }
}
