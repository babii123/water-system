import React from 'react';
import { Route } from 'react-router-dom';
import '../styles/layout.css';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Dashboard from './Dashboard';
import WaterSupplyPlan from './WaterSupplyPlan';
import { connect } from 'react-redux';
// import NotFound from './NotFound';

class LayOut extends React.Component {

	componentDidMount(){
		if (!localStorage.getItem('userId')){
			this.props.history.replace('/login')
			console.log('sss', this.props.userInfo.userId);
		}
	}

	render() {
		return (
			<div className='view-container'>
				<div className='sideBar'>
					<SideBar />
				</div>
				<div className='main-container'>
					<Header />
					<div className='content'>
						<Route path="/" exact component={Dashboard} />
						<Route path="/water_plan" component={WaterSupplyPlan} />
						<Route path="/water_type" component={WaterSupplyPlan} />
						<Route path="/water_storage" component={WaterSupplyPlan} />
						<Route path="/water_quality" component={WaterSupplyPlan} />
					</div>
				</div>
			</div>
		)
	}
};
export default connect(
	(state) => {
		return {
			userInfo: state.userInfo
		}
	}
)(LayOut);