import React, {Component} from "react";
import '../../static/css/login/login.css'
import {login} from "../../api/login";
import {Button, Form, Input, message} from "antd";
import {withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import {set} from "../../utils/storage";
import {inject, observer} from "mobx-react";
import AdminStore from "../../store/AdminStore";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 4, span: 16},
};

interface IState {
    name: string
    password: string
}

interface IProps extends RouteComponentProps {
    admin?: AdminStore
}

@inject('admin')
@observer
class Index extends Component<IProps, IState> {
    constructor(props: IProps, context: any) {
        super(props, context);
        this.state = {
            name: '',
            password: ''
        }
    }

    onFinish = (values: IState) => {
        login(values).then(respons => {
            const {code, msg} = respons.data
            if (code === 0) {
                const {token} = respons.data.data
                set('token', token)
                this.props.admin?.initAdmin();
                this.props.history.push('/')
            } else {
                message.error(msg)
            }
        })
    }
    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        return (
            <div
                className='login'
            >
                <Form
                    id='login-form'
                    className='login-form'
                    ref={null}
                    initialValues={this.state}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    {...layout}
                >
                    <Form.Item>
                        <h1 style={{textAlign: 'center', width: '100%'}}>跃码教育后台管理系统</h1>
                    </Form.Item>
                    <Form.Item
                        label="用户名"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '用户名不可以为空'
                            },
                            {
                                type: "string",
                                min: 2,
                                message: '用户名长度不可以小于2位'
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '密码不可以为空'
                            },
                            {
                                type: "string",
                                min: 2,
                                message: '密码长度不可以小于2位'
                            }
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }

}

export default withRouter(Index)
