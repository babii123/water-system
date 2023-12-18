import React from 'react';
import Three from './Three';

class Two extends React.Component<{ count: number }> {
  render() {
    return <>
      Two
      {this.props.count}
      <Three count={this.props.count + 10} />
    </>
  }
}

export default Two