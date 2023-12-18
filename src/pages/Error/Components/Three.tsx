import React from "react"
import { connect } from "react-redux"

class Three extends React.Component<{ count: number, updateCount: Function }> {
  changeCount = () => {
    this.props.updateCount(this.props.count + 1)
  }
  render() {
    return <>
      Three
      {this.props.count}
      <button onClick={this.changeCount}>点击+</button>
    </>
  }
}

export default connect((state) => ({ }),
  (dispatch) => {
    return {
      updateCount: (newCount: number) => {
        dispatch({ type: 'update_count', payLoad: newCount })
      }
    }
  })(Three)