import React, { useState } from 'react';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, PlusOutlined, DownloadOutlined, DeleteFilled, RestOutlined } from '@ant-design/icons';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

function Storage() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className='mycard'>
      <Space style={{ marginBottom: 16 }}>
        <span>ID</span>
        <Input placeholder="Basic usage" />
        <span>水资源类型</span>
        <Input placeholder="Basic usage" />
        <span>水量范围</span>
        <Input placeholder="Basic usage" />
        <Button type="primary" icon={<SearchOutlined />}>
          搜索
        </Button>
        <Button icon={<RestOutlined />}>
          重置
        </Button>
      </Space>
      <div style={{ marginBottom: 16 }}>
        <Space>
          <Button type="primary" onClick={start} icon={<PlusOutlined />}>
            新增计划
          </Button>
          <Button type="primary" onClick={start} icon={<DeleteFilled />} danger>
            批量删除
          </Button>
          <Button icon={<DownloadOutlined />}>
            导出所选
          </Button>
        </Space>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} scroll={{ y: 420 }} />
    </div>
  );
};

export default Storage;