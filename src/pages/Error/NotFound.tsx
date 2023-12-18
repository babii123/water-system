import React from 'react';
import { connect } from 'react-redux';
// import One from './Components/One';
import { Button, Input } from 'antd';
import One from './Components/One';

const data = [
  {
    "net": "PCIE0_TX_P",
    "signal": "TX0",
    "signalDisplay": "TX0",
    "netDisplay": "PCIE0_TX_P",
    "pinType": "positive",
    "pinRight": [
      {
        "pin": "PCIE0_TX_P",
        "pinDisplay": "PCIE0_TX_P",
        "pinNodeDisplay": "PCIE0_TX_P",
        "pinValue": "",
        "pinSubckt": "",
        "pinLibraryId": "",
        "pinModelvalue": "",
        "component": "U2"
      }
    ],
    "pinLeft": [
      {
        "pin": "PCIE0_TX_P",
        "pinDisplay": "PCIE0_TX_P",
        "pinNodeDisplay": "PCIE0_TX_P",
        "pinValue": "",
        "pinSubckt": "",
        "pinLibraryId": "",
        "pinModelvalue": "",
        "component": "U1"
      }
    ]
  },
  {
    "net": "PCIE0_TX_N",
    "signal": "TX0",
    "signalDisplay": "TX0",
    "netDisplay": "PCIE0_TX_N",
    "pinType": "negative",
    "pinRight": [
      {
        "pin": "PCIE0_TX_N",
        "pinDisplay": "PCIE0_TX_N",
        "pinNodeDisplay": "PCIE0_TX_N",
        "pinValue": "",
        "pinSubckt": "",
        "pinLibraryId": "",
        "pinModelvalue": "",
        "component": "U2"
      }
    ],
    "pinLeft": [
      {
        "pin": "PCIE0_TX_N",
        "pinDisplay": "PCIE0_TX_N",
        "pinNodeDisplay": "PCIE0_TX_N",
        "pinValue": "",
        "pinSubckt": "",
        "pinLibraryId": "",
        "pinModelvalue": "",
        "component": "U1"
      }
    ]
  },
  {
    "net": "PCIE0_RX_P",
    "signal": "RX0",
    "signalDisplay": "RX0",
    "netDisplay": "PCIE0_RX_P",
    "pinType": "positive",
    "pinRight": [
      {
        "pin": "PCIE0_RX_P",
        "pinDisplay": "PCIE0_RX_P",
        "pinNodeDisplay": "PCIE0_RX_P",
        "pinValue": "",
        "pinSubckt": "",
        "pinLibraryId": "",
        "pinModelvalue": "",
        "component": "U2"
      }
    ],
    "pinLeft": [
      {
        "pin": "PCIE0_RX_P",
        "pinDisplay": "PCIE0_RX_P",
        "pinNodeDisplay": "PCIE0_RX_P",
        "pinValue": "",
        "pinSubckt": "",
        "pinLibraryId": "",
        "pinModelvalue": "",
        "component": "U1"
      }
    ]
  },
  {
    "net": "PCIE0_RX_N",
    "signal": "RX0",
    "signalDisplay": "RX0",
    "netDisplay": "PCIE0_RX_N",
    "pinType": "negative",
    "pinRight": [
      {
        "pin": "PCIE0_RX_N",
        "pinDisplay": "PCIE0_RX_N",
        "pinNodeDisplay": "PCIE0_RX_N",
        "pinValue": "",
        "pinSubckt": "",
        "pinLibraryId": "",
        "pinModelvalue": "",
        "component": "U2"
      }
    ],
    "pinLeft": [
      {
        "pin": "PCIE0_RX_N",
        "pinDisplay": "PCIE0_RX_N",
        "pinNodeDisplay": "PCIE0_RX_N",
        "pinValue": "",
        "pinSubckt": "",
        "pinLibraryId": "",
        "pinModelvalue": "",
        "component": "U1"
      }
    ]
  }
]

class NotFound extends React.Component<{ count: number }> {
  // state: { visible: { value?: string, editType?: string }, count: number } = {
  //   visible: {
  //     value: undefined,
  //     editType: undefined
  //   },
  //   count: 10
  // }

  // shouldComponentUpdate(nextProps: Readonly<{ count: number; }>, nextState: Readonly<{}>, nextContext: any): boolean {
  //   console.log('xxx', nextState);
  //   return true
  // }

  // updateVisible = (value: string, editType: string) => {
  //   this.setState({
  //     visible: {
  //       value,
  //       editType
  //     }
  //   })
  // }
  state: { count: number } = { count: 0 }
  constructor(props: any) {
    super(props)
    this.state = { count: props.count }
  }
  // static getDerivedStateFromProps(nextProps: any, prevState: any) {
  //   return {
  //     count: nextProps.count 
  //   }
  // }
  render() {
    return <>
      NotFound
      {this.props.count}
      {this.state.count}
      <One count={this.state.count + 10} />
      <Button onClick={() => this.setState({ count: this.state.count + 1 })}>点击</Button>
      {/* {
        data.map((item, index) => {
          return (
            <div style={{ display: 'flex' }} key={index}>
              <div>
                {
                  this.state.visible.value === item.pinLeft[0].pin && this.state.visible.editType === item.pinLeft[0].component
                    ?
                    <Input value={item.pinLeft[0].pinDisplay} onBlur={() => this.updateVisible('', '')} autoFocus />
                    :
                    <span onClick={() => this.updateVisible(item.pinLeft[0].pin, 'left')}>{item.pinLeft[0].pinDisplay}</span>
                }
              </div>
              <div>
                {
                  this.state.visible.value === item.net && this.state.visible.editType === 'net'
                    ?
                    <Input value={item.netDisplay} onBlur={() => this.updateVisible('', '')} autoFocus />
                    :
                    <span onClick={() => this.updateVisible(item.net, 'net')}>{item.netDisplay}</span>
                }
              </div>
              <div>
                {
                  this.state.visible.value === item.pinRight[0].pin && this.state.visible.editType === item.pinRight[0].component
                    ?
                    <Input
                      className='aurora-input'
                      value={item.pinRight[0].pinDisplay}
                      onBlur={() => this.updateVisible('', '')}
                      autoFocus
                    />
                    :
                    <span onClick={() => this.updateVisible(item.pinRight[0].pin, item.pinRight[0].component)}>{item.pinRight[0].pinDisplay}</span>
                }
              </div>
            </div>
          )
        })
      } */}
    </>
  }
}

export default connect((state: any) => {
  return {
    count: state.userInfo.count
  }
})(NotFound);