import React, {Component, ReactNode} from "react";
import {inject, observer} from "mobx-react";
import PermissionStore from "../store/PermissionStore";

interface IProps {
    path: string
    children?: ReactNode
    permissionStore?: PermissionStore
}

@inject('permissionStore')
@observer
export default class Auth extends Component<IProps, any> {

    render() {
        const permissionSet = new Set(this.props.permissionStore?.permissionList.map(p => p.path))
        if (!permissionSet.has(this.props.path)) {
            return null
        }
        return (
            <>
                {this.props.children}
            </>
        );
    }
}
