import React, {Component} from 'react';
import {Alert, BackTop, Dropdown, Layout, Menu, Spin} from 'antd';
import LeftBar from "./LeftBar";
import SubTitle from "./SubTitle";
import {DownOutlined} from '@ant-design/icons';
import '../static/css/common/header.css'
import Avatar from 'antd/lib/avatar/avatar';
import {RouteComponentProps} from "react-router";
import {matchPath, withRouter} from 'react-router-dom';
import {inject, observer} from "mobx-react";
import AdminStore from "../store/AdminStore";
import {rm, set} from "../utils/storage";
import PermissionStore from "../store/PermissionStore";
import {Page403} from "../pages/error/Page403";

const {Header, Content} = Layout;

interface IProps extends RouteComponentProps {
    admin?: AdminStore
    permissionStore?: PermissionStore
}

interface IState {
    auth: boolean
}

@inject('admin')
@inject('permissionStore')
@observer
class AppLayout extends Component<IProps, IState> {

    constructor(props: IProps, context: any) {
        super(props, context);
        this.state = {
            auth: false
        }
        let newSearchParams = new URLSearchParams(this.props.location.search)
        let token = newSearchParams.get('token');
        if (token !== null) {
            set('token', token);
        }
    }

    logout = () => {
        rm('token')
        this.props.history.push('/login')
    }

    componentDidMount() {
        this.props.admin?.initAdmin();
        this.props.permissionStore?.initPermission()
    }

    static getDerivedStateFromProps(props: Readonly<IProps>, state: Readonly<IState>) {
        if (props.admin?.status === 'finish' || props.permissionStore?.status === 'finish') {
            let auth: boolean = false
            if (props.permissionStore?.permissionList) {
                let path = props.location.pathname
                for (let permission of props.permissionStore?.permissionList) {
                    let match = matchPath(permission.path, {path: path})
                    if (match !== null && match.isExact) {
                        auth = true;
                        document.title = permission.title
                        break
                    }
                }
            }
            return {auth: auth};
        }
        return null;
    }

    render() {
        if (this.props.admin?.status === 'loading' || this.props.permissionStore?.status === 'loading') {
            return (
                <Spin tip="Loading...">
                    <Alert
                        message="Alert message title"
                        description="Further details about the context of this alert."
                        type="info"
                    />
                </Spin>
            );
        }
        if (!this.state.auth) {
            return (
                <>
                    <Page403/>
                </>
            )
        }
        return (
            <Layout>
                <Header className="header">
                    <Menu className={'header-menu'} theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                    <div>
                        <Dropdown overlay={<Menu>
                            <Menu.Item key={'1'} onClick={this.logout}>退出</Menu.Item>
                        </Menu>}
                        >
                            <span className='avatar'>
                               {this.props.admin?.admin.adminName} <Avatar
                                src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'/>
                                <DownOutlined/>
                            </span>
                        </Dropdown>

                    </div>
                </Header>
                <Layout>
                    <LeftBar/>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <SubTitle/>
                        <Content
                            className="site-layout-background"
                            style={{
                                marginTop: 24,
                                minHeight: 280,
                            }}
                        >
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
                <BackTop/>
            </Layout>
        );
    }
}

export default withRouter(AppLayout);
