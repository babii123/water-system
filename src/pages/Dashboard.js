import React from 'react';
import { connect } from 'react-redux';

class Dashboard extends React.Component {
	handleClick = () => {
		this.props.history.replace('/login')
	}

	render() {
		return (
			<>
				<button onClick={this.handleClick}>点击</button>
			</>
		)
	}
};
export default connect()(Dashboard);