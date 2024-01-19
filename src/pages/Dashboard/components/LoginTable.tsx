import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { UserTableType } from '../../../model/userInfoModel'

const columns: ColumnsType<UserTableType> = [
  {
    title: 'User ID',
    dataIndex: 'userId',
    key: 'userId'
  },
  {
    title: 'Real Name',
    dataIndex: 'realName',
    key: 'realName'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone'
  },
];

const LoginTable: React.FC<{ data: any }> = ({ data }) => <Table columns={columns} dataSource={data} scroll={{ y: 200 }} pagination={false}/>;

export default LoginTable;