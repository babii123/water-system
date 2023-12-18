import React from 'react';
import { connect } from 'react-redux';
import Two from './Two';

class One extends React.Component<{ count: number }> {
  render() {
    return <>
      One
      {this.props.count}
      <Two count={this.props.count + 10} />
    </>
  }
}

export default One