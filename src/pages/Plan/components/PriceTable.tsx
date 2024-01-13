import React from 'react';
import { Space, Table, Tag } from 'antd';
import { WaterPriceTableType } from '../../../model/waterPriceModel';

const { Column, ColumnGroup } = Table;

const PriceTable: React.FC<{ data: WaterPriceTableType[] }> = ({ data }) => (
  <Table dataSource={data} pagination={{ position: [] }}>
    <Column title="用户类型" dataIndex="type" />
    <ColumnGroup title="自来水价格">
      <Column title="基本水价" dataIndex="basicPrice" />
      <Column title="水资源费" dataIndex="resourceCost" />
    </ColumnGroup>
    <Column title="污水处理费" dataIndex="pollutionCost" />
    <Column title="用户最终负担价格" dataIndex="realPrice" />
    <Column
      title="操作"
      key="action"
      render={(_: any, record: WaterPriceTableType) => (
        <Space size="middle">
          <a>Invite</a>
          <a>Delete</a>
        </Space>
      )}
    />
  </Table>
);

export default PriceTable;