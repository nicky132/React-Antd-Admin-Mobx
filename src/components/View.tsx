import {Alert, Spin} from "antd";
import React, {Component, Fragment, ReactNode, Suspense} from "react";
import {HashRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {authRoute, IRoute, unAuthRoute} from "../router";
import AppLayout from "./AppLayout";

export default class View extends Component {
    generateRoute = (routeList?: IRoute[]): ReactNode => {
        return (
            <>
                {
                    routeList?.map(route => {
                        if (route.children) {
                            return (
                                <Fragment key={route.path}>
                                    {
                                        route.redirect ?
                                            <Route path={route.path} exact={route.exact}>
                                                <Redirect to={route.redirect}/>
                                            </Route>
                                            :
                                            null
                                    }
                                    {this.generateRoute(route.children)}
                                </Fragment>
                            );
                        }
                        return (
                            <Route path={route.path} exact={route.exact} key={route.path}>
                                {route.component}
                            </Route>
                        )
                    })
                }
            </>
        )
    }

    render() {
        return (
            <>
                <Router>
                    <Route path='/' exact>
                        <Redirect to={'/admin/dashboard'}/>
                    </Route>
                    <Switch>
                        <Route path='/admin'>
                            <AppLayout>
                                <Suspense fallback={<Spin tip="Loading...">
                                    <Alert
                                        message="Alert message title"
                                        description="Further details about the context of this alert."
                                        type="info"
                                    />
                                </Spin>}>
                                    {this.generateRoute(authRoute)}
                                </Suspense>
                            </AppLayout>
                        </Route>
                        <Suspense fallback={<Spin tip="Loading...">
                            <Alert
                                message="Alert message title"
                                description="Further details about the context of this alert."
                                type="info"
                            />
                        </Spin>}>
                            <Switch>
                                {
                                    unAuthRoute.map((route) => (
                                        <Route path={route.path} key={route.path} exact={route.exact}>
                                            {
                                                route.component
                                            }
                                        </Route>
                                    ))
                                }
                            </Switch>
                        </Suspense>
                    </Switch>
                </Router>
            </>
        );
    }
}
