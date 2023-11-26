import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { Menu } from 'antd';
import { withRouter } from 'react-router-dom'
import '../styles/layout.css'

const IconFont = createFromIconfontCN({
	scriptUrl: '//at.alicdn.com/t/c/font_4346841_q99xu89ffnm.js',
});

function getItem(label, key, icon, children, type) {
	return {
		key,
		icon,
		children,
		label,
		type,
	};
}

const items = [
	{
		type: 'divider',
	},
	getItem('工作台', 'dashboard', <IconFont type='icon-gongzuotai' />),
	getItem('供水计划', 'water_plan', <IconFont type='icon-jihua' />),
	{
		type: 'divider',
	},
	getItem('水资源管理', 'water_type', <IconFont type='icon-ziyuan-xianxing' />),
	getItem('水量管理', 'water_storage', <IconFont type='icon-shuiliang' />),
	getItem('水质管理', 'water_quality', <IconFont type='icon-zhiliang-xianxing' />),
];

class SideBar extends React.Component {
	/**
	 * 侧边栏响应，defaultSelectedKeys不变化
	 * @param {*} props 
	 */
	constructor(props) {
		super(props)
		console.log('sideBar1', this.props.location.pathname.substr(1));
		this.state = {
			current: this.props.location.pathname.substr(1)
		}
		// this.setState({ current: this.props.location.pathname.substr(1) })
	}

	componentDidMount() {
		// console.log('sideBar1', this.props.location.pathname.substr(1));
		// this.setState({ current: this.props.location.pathname.substr(1) })
	}

	onClick = (e) => {
		console.log(this.props);
		this.setState({ current: e.key })
		this.props.history.push(`/${e.key}`)
	};
	render() {
		return (
			<>
				<div className='title'>张家界市水资源管理系统</div>
				<Menu
					onClick={this.onClick}
					style={{
						width: 256,
						maxHeight: 725,
						backgroundColor: '#fff'
					}}
					defaultSelectedKeys={[this.current]}
					selectedKeys={[this.current]}
					defaultOpenKeys={[]}
					mode="inline"
					items={items}
				/>
			</>
		);
	}
};
export default withRouter(SideBar);