import React from "react";
import { Card } from 'antd'
import WaterDataTable from '../components/WaterDataTable'

class WaterSupplyPlan extends React.Component {
	handleChange = (value) => {
		console.log(`selected ${value}`);
	};
	render() {
		return (
			<>
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
}

export default WaterSupplyPlan;