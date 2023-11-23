import React from 'react';
import { store, state, actions } from '../store'
// import { Link } from 'react-router-dom'

class Dashboard extends React.Component {
      state = {}
      constructor() {
            super()
            this.state = {
                  age: state.info.age,
            }
      }
      componentDidMount() {
            store.subscribe(() => {
                  this.setState({ age: state.info.age })
            })
      }
      handleClick = () => {
            actions.addAge();
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