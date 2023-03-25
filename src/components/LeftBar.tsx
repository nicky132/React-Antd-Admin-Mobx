import React, {Component, Fragment, ReactNode} from 'react';
import {authRoute, IRoute} from "../router";
import {Layout, Menu} from "antd";
import {Link, matchPath, RouteComponentProps, withRouter} from 'react-router-dom';
import {inject, observer} from "mobx-react";
import PermissionStore from "../store/PermissionStore";

const {Sider} = Layout;

const {SubMenu} = Menu;

interface IState {
    defaultOpenKeys: string[]
    defaultSelectedKeys: string[]
}

interface IProps extends RouteComponentProps {
    permissionStore?: PermissionStore
}

@inject('permissionStore')
@observer
class LeftBar extends Component<IProps, IState> {

    constructor(props: IProps, context: any) {
        super(props, context);
        this.state = {
            defaultOpenKeys: [],
            defaultSelectedKeys: []
        }
    }

    componentDidMount() {
        this.heightMenu(authRoute)
    }

    heightMenu = (leftRoutes: IRoute[]) => {
        let path = this.props.location.pathname
        for (let r of leftRoutes) {
            let match = matchPath(path, {path: r.path})
            if (match) {
                if (match.isExact) {
                    this.setState({
                        defaultSelectedKeys: [r.path]
                    })
                } else {
                    this.setState({defaultOpenKeys: [r.path]})
                }
            }
            if (r.children) {
                this.heightMenu(r.children)
            }
        }
    }
    generateLeftBar = (routeList?: IRoute[]): ReactNode => {
        let permissionSet = new Set<string>(this.props.permissionStore?.permissionList.map(p => p.path))
        return (
            <>
                {
                    routeList?.map(route => {
                        if (!permissionSet.has(route.path)) {
                            return null
                        }
                        if (route.children) {
                            return (
                                <Fragment key={route.path}>
                                    <SubMenu key={route.path} icon={route.icon} title={route.title}>
                                        {this.generateLeftBar(route.children)}
                                    </SubMenu>
                                </Fragment>
                            );
                        }
                        return (
                            <Fragment key={route.path}>
                                <Menu.Item icon={route.icon} key={route.path}>
                                    <Link to={route.path}>
                                        {route.title}
                                    </Link>
                                </Menu.Item>
                            </Fragment>
                        )
                    })
                }
            </>
        )
    }

    render() {
        return (
            <>
                <Sider width={200} style={{minHeight: '100vh'}}>
                    {
                        this.state.defaultSelectedKeys.length > 0 ?
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={this.state.defaultSelectedKeys}
                                defaultOpenKeys={this.state.defaultOpenKeys}
                                style={{height: '100%', borderRight: 0}}
                            >
                                {this.generateLeftBar(authRoute)}
                            </Menu>
                            :
                            null
                    }
                </Sider>

            </>
        );
    }
}

export default withRouter(LeftBar);