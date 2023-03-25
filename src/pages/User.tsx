/*
 * @Author: 寒云 <1355081829@qq.com>
 * @Date: 2022-02-09 17:34:43
 * @LastEditTime: 2022-02-09 17:40:06
 * @LastEditors: 寒云
 * @Description:
 * @FilePath: \react-antd-admin\src\pages\User.tsx
 * @QQ: 大前端QQ交流群：976961880
 * 善始者实繁，克终者盖寡
 */
import { Table } from "antd";
import React, { Component } from "react";
import {ColumnsType} from "antd/es/table";

export default class User extends Component {
  column: ColumnsType<any> = [];
  render() {
    return (
      <div>
        <Table columns={this.column} />
      </div>
    );
  }
}
