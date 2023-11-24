import React from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux'
import waterSupplyPlanAction from '../store/actions/waterSupplyPlanAction';

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
            this.props.getWaterData();

            // actions.updateWaterData({ key: 2, id: 1, address: '234', storage: '12', cost: '1' });
            // this.props.getWaterData();
            // actions.getWaterData();
      }

      render() {
            return (
                  <>
                        {this.props.age}
                        <Table columns={columns} dataSource={this.props.data} />
                        <button onClick={this.handleClick}>点击</button>
                  </>
            )
      }
};
export default connect(
      (state) => {
            console.log('xxx', state.userReducer.age);
            return {
                  age: state.userReducer.age,
                  data: state.userReducer.waterData,
                  userInfo: state.userReducer.userInfo,
            }
      }, (dispatch) => {
            return {
                  getWaterData: (payLoad) => {
                        dispatch({
                              type: 'update_water_data',
                              payLoad
                        })
                  }
            }
      }
)(WaterDataTable)

