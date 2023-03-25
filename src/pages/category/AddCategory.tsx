import { Button, Form, Input, Modal } from "antd"

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

interface IProps {
    visible?: boolean
    cancel?: (refresh?: boolean) => void
}
const AddCategory: React.FC<IProps> = (props: IProps) => {
    const [form] = Form.useForm()
    const cancel = () => {
        if (props.cancel) {
            props.cancel()
        }
    }
    return (
        <Modal
            footer={null}
            visible={props.visible}
            title='添加分类'
            onCancel={cancel}
            maskClosable={false}
        >
            <Form
                form={form}
                {...layout}
            >
                <Form.Item label='分类名称' name='categoryName'>
                    <Input />
                </Form.Item>
                <Form.Item label='排序' name='sortOrder'>
                    <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        添加
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddCategory