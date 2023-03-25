import React, {Component, Fragment, ReactNode} from 'react';
import {Breadcrumb} from "antd";
import {matchPath, withRouter} from 'react-router-dom';
import {RouteComponentProps} from "react-router";
import {authRoute, IRoute} from "../router";

interface IProps extends RouteComponentProps {

}


class SubTitle extends Component<IProps> {


    generate = (routeList?: IRoute[]): ReactNode => {
        let path = this.props.location.pathname

        return (
            <>
                {
                    routeList?.map(route => {
                        let match = matchPath(path, {path: route.path})
                        if (match !== null) {
                            return (
                                <Fragment key={route.path}>
                                    <Breadcrumb.Item key={route.path}>{route.title}</Breadcrumb.Item>
                                    {
                                        route.children ?
                                            this.generate(route.children)
                                            :
                                            null
                                    }
                                </Fragment>
                            )
                        }
                        return null
                    })
                }
            </>
        )
    }


    render() {
        return (
            <>

                <Breadcrumb style={{margin: '16px 0'}}>
                    {this.generate(authRoute)}
                </Breadcrumb>

            </>
        );
    }

}

export default withRouter(SubTitle);