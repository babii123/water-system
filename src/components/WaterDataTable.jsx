import React from 'react';
import { Table } from 'antd';
import { store, state, actions } from '../store'
const columns = [
      {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
      },
      {
            title: '地标',
            dataIndex: 'address',
            key: 'address',
      },
      {
            title: '储水量',
            dataIndex: 'storage',
            key: 'storage',
      },
      {
            title: '成本',
            dataIndex: 'cost',
            key: 'cost',
      },
];

class WaterDataTable extends React.Component {
      state = {}
      constructor() {
            super()
            this.state = {
                  data: [state.waterData[0]],
            }
      }
      componentDidMount() {
            store.subscribe(() => {
                  console.log('table', state.waterData);
                  this.setState({ data: state.waterData })
            })
      }
      handleClick = () => {
            // actions.updateWaterData([{ key: 1, id: 1, address: '234', storage: '12', cost: '1' }]);
            actions.getWaterData();
      }

      render() {
            return (
                  <>
                        <Table columns={columns} dataSource={this.state.data} />
                        <button onClick={this.handleClick}>点击</button>
                  </>
            )
      }
};
export default WaterDataTable;

