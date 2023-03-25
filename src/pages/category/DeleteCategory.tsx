import { Button, message, Popconfirm } from "antd"
import { deleteCategoryById } from "../../api/category"
import { ICategory } from "./CategoryList"

interface IProps {
    category: ICategory
    deleteCategory: (category: ICategory) => void
}
const DeleteCategory: React.FC<IProps> = (props: IProps) => {
    const deleteCategory = () => {
        deleteCategoryById(props.category.id).then(response => {
            const { msg, code } = response.data
            if (code === 0) {
                message.success(msg)
                props.deleteCategory(props.category)
            } else {
                message.error(msg)
            }
        })
    }
    const cancelDelete = () => {
        message.info('取消删除')
    }
    return (
        <Popconfirm title='删除分类' onConfirm={deleteCategory} onCancel={cancelDelete}>
            <Button type='primary' danger>删除</Button>
        </Popconfirm>
    )
}

export default DeleteCategory