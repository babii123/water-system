import React from 'react';
// import One from './Components/One';
import { Button, Input } from 'antd';
import { count } from 'console';

class Error404 extends React.Component {
  state: { count: 0, value: string } = {
    count: 0,
    value: '',
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    return {
      value: '1111'
    }
  }
  addCount = () => {
    this.setState({ count: this.state.count + 2 })
  }
  handleChange = (e: any) => {
    this.setState({ value: e.target.value })
  }
  render() {
    return <>
      {this.state.count}
      {this.state.value}
      <Input value={this.state.value} onChange={this.handleChange} />
      <Button onClick={() => this.addCount()}>点击</Button>
    </>
  }
}

export default Error404