import React from 'react';
import { connect } from 'react-redux';
import userAction from '../store/actions/userAction';

class Dashboard extends React.Component {
      handleClick = () => {
            // userAction.addAge();
            this.props.addAge()
      }

      render() {
            return (
                  <>
                        {this.props.age}
                        <button onClick={this.handleClick}>点击</button>
                  </>
            )
      }
};
export default connect(
      (state) => {
            console.log('ddd',state)
            return { age: state.userReducer.age }
      },
      (dispatch) => {
            return {
                  addAge: (payLoad)=>{
                        console.log('addAge');
                        dispatch({
                              type: 'addAge',
                              payLoad
                        })
                  }
            }
      }
) (Dashboard);