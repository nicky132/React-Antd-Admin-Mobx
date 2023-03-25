import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import AdminStore from "../../store/AdminStore";
import { Button } from "antd";

interface IProps {
    admin?: AdminStore
}

@inject('admin')
@observer
class Admin extends Component<IProps> {
    login = () => {
        this.props.admin?.changeAdmin({ id: 1, adminName: 'hanyun1111111111111', createdAt: '' })
    }

    componentDidMount() {
        this.props.admin?.initAdmin()
    }

    render() {
        return (
            <div>
                {this.props.admin?.admin.adminName}
                <Button type={'primary'} onClick={this.login}>login</Button>
            </div>
        );
    }
}

export default Admin;
