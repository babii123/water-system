import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { UserTableType } from '../../../model/userInfoModel'

const columns: ColumnsType<UserTableType> = [
  {
    title: '用户ID',
    dataIndex: 'userId',
    key: 'userId'
  },
  {
    title: '真实姓名',
    dataIndex: 'realName',
    key: 'realName'
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone'
  },
];

const LoginTable: React.FC<{ data: any }> = ({ data }) => <Table columns={columns} dataSource={data} scroll={{ y: 200 }} pagination={false}/>;

export default LoginTable;