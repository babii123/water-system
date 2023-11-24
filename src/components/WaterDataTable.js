import React from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux'
import waterSupplyPlanAction from '../store/actions/waterSupplyPlanAction';
import { dataSort } from '../utils/dataSort';

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
      handleClick = () => {
            const newData = dataSort(this.props.data)
            console.log('newData', newData);
            this.props.updateWaterData(newData);
      }

      componentDidMount() {
            this.props.getWaterData();
      }

      render() {
            return (
                  <>
                        <button onClick={this.handleClick}>点击根据储水量排序</button>
                        <Table columns={columns} dataSource={this.props.data} />
                  </>
            )
      }
};
export default connect(
      (state) => {
            console.log('WaterDataTable', state.waterSupplyPlanReducer);
            return {
                  data: state.waterSupplyPlanReducer.waterData,
            }
      }, (dispatch) => {
            return {
                  getWaterData: () => {
                        dispatch(waterSupplyPlanAction.getWaterData());
                  },
                  updateWaterData: (payLoad) => {
                        dispatch(waterSupplyPlanAction.updateWaterData(payLoad));
                  }
            }
      }
)(WaterDataTable)

