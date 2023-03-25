import { ICategory } from "./CategoryList"
import React, { useEffect } from 'react'
import { Button, Form, Input, message, Modal } from "antd"
import { updateCategoryById } from "../../api/category";

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
interface IProps {
    category?: ICategory
    visible?: boolean
    cancel: (refresh?: boolean) => void
}
const EditCategory: React.FC<IProps> = (props: IProps) => {
    const cancel = () => { props.cancel() }
    const [form] = Form.useForm()
    useEffect(() => {
        return () => {
            form.resetFields()
        }
        // eslint-disable-next-line
    }, [props.visible])
    const updateCategory = (category: ICategory) => {
        updateCategoryById(props.category?.id as number, category).then(response => {
            const { code, msg } = response.data
            if (code === 0) {
                message.success(msg)
                props.cancel(true)
            } else {
                message.error(msg)
            }
        })
    }
    return (
        <Modal visible={props.visible} footer={null} title='编辑分类' onCancel={cancel} maskClosable={false}>
            <Form
                {...layout}
                form={form}
                initialValues={{
                    ...props.category
                }}
                onFinish={updateCategory}
            >
                <Form.Item label='分类名称' name='categoryName'>
                    <Input />
                </Form.Item>
                <Form.Item label='排序' name='sortOrder'>
                    <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        保存
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default EditCategory