import React from "react";
import { Select, Input, Space, Card } from 'antd'
import WaterDataTable from '../components/WaterDataTable'

const WaterSupplyPlan = () => {
      const handleChange = (value) => {
            console.log(`selected ${value}`);
      };
      return (
            <>
                  <Space wrap>
                        <Input placeholder="水量需求" style={{ width: 120 }} />
                        <Select
                              placeholder="供水类型"
                              defaultValue="lucy"
                              style={{ width: 120 }}
                              onChange={handleChange}
                              options={[
                                    { value: 'jack', label: 'Jack' },
                                    { value: 'lucy', label: 'Lucy' },
                                    { value: 'Yiminghe', label: 'yiminghe' },
                              ]}
                        />
                  </Space>
                  
                  {/* 水资源信息 */}
                  <WaterDataTable />
                  {/* 方案 */}
                  <Card style={{ width: 300 }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                  </Card>
            </>
      )
}

export default WaterSupplyPlan;