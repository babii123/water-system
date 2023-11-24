import React from 'react';
import { connect } from 'react-redux';
// import { store, state, actions } from '../store'
// import { Link } from 'react-router-dom'

class Dashboard extends React.Component {
      handleClick = () => {
            // actions.addAge();
      }

      render() {
            return (
                  <>
                        {this.state.age}
                        <button onClick={this.handleClick}>点击</button>
                  </>
            )
      }
};
export default Dashboard;