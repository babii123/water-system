import React from 'react';
import { Button, Table, Select, Input, Space } from 'antd';
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
	state = {
		age: 1,
		name: 11,
	}

	constructor(){
		super()
		this.state.other = {
			address: 'China'
		}
	}

	componentDidMount() {
		this.props.getWaterData();
	}

	handleClick = () => {
		const newData = dataSort(this.props.data)
		this.props.updateWaterData(newData);
		this.setState({ age: 10 })
	}

	render() {
		return (
			<>
				<Space wrap>
					<Input placeholder="水量需求" style={{ width: 120 }} />
					<Select
						placeholder="供水类型"
						defaultValue="lucy"
						style={{ width: 120 }}
						onChange={this.handleChange}
						options={[
							{ value: 'jack', label: 'Jack' },
							{ value: 'lucy', label: 'Lucy' },
							{ value: 'Yiminghe', label: 'yiminghe' },
						]}
					/>
					<Button onClick={this.handleClick}>点击根据储水量排序</Button>
				</Space>
				<Table columns={columns} dataSource={this.props.data} />
			</>
		)
	}
};
export default connect(
	(state) => {
		return {
			data: state.water.waterData,
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