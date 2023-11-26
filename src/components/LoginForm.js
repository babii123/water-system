import React from 'react';
import { Button, Form, Input } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import userAction from '../store/actions/userAction'

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
class LoginForm extends React.Component {

  onFinish = (values) => {
    this.props.login(values)
  };

  shouldComponentUpdate(nextProps, nextState){
    // 判断userInfo的更新情况，跳转新页面
    if (nextProps.userInfo.userId){
      console.log('nextProps:', nextProps.userInfo);
      this.props.history.replace('/')
      return false;
    }
    return true;
  }

  render() {
    return (
      <>
        <Form
          name="basic"
          labelCol={{ span: 8, }}
          wrapperCol={{ span: 16, }}
          style={{
            maxWidth: 600,
          }}
          onFinish={this.onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </>
    )
  }
}

export default connect(
  (state) => {
    return {
      userInfo: state.userInfo
    }
  },
  (dispatch) => {
    return {
      login: (payLoad) => {
        dispatch(userAction.login(payLoad))
      }
    }
  }
)(withRouter(LoginForm));