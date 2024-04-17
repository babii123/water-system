import React from 'react';
import { Space, Table, Tag } from 'antd';
import { WaterPriceTableType } from '../../../model/tableModel';
import { useTranslation } from 'react-i18next';

const { Column, ColumnGroup } = Table;

const PriceTable: React.FC<{ data: WaterPriceTableType[] }> = ({ data }) => {
  const { t } = useTranslation()
  return (
    <Table dataSource={data} pagination={{ position: [] }}>
      <Column title={t('userType')} dataIndex="type" />
      <ColumnGroup title={t('waterPrice')}>
        <Column title={t('basicPrice')} dataIndex="basicPrice" />
        <Column title={t('resourceCost')} dataIndex="resourceCost" />
      </ColumnGroup>
      <Column title={t('pollutionCost')} dataIndex="pollutionCost" />
      <Column title={t('realPrice')} dataIndex="realPrice" />
      {/* <Column
      title="操作"
      key="action"
      render={(_: any, record: WaterPriceTableType) => (
        <Space size="middle">
          <a>Invite</a>
          <a>Delete</a>
        </Space>
      )}
    /> */}
    </Table>
  );
}

export default PriceTable;