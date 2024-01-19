import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { login_API } from '../../../services/userRequest';
import { useNavigate } from 'react-router-dom';

type FieldType = {
  emailOrPhone?: string;
  password?: string;
};

const LoginForm: React.FC = () => {
  const navigate = useNavigate()
  const onFinish = (values: any) => {
    login_API(values).then(res => {
      if (res.data.token) {
        localStorage.setItem('token', res.data.token)
      }
      if (res.data.userId) {
        localStorage.setItem('userId', res.data.userId)
      }
      navigate('/')
    }).catch(err => {
      console.log(err);
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ 
        emailOrPhone: '16670018630',
        password: '12345678'
       }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="account"
        name="emailOrPhone"
        rules={[{ required: true, message: 'Please input your email or phone!' }]}
        style={{ width: '525px' }}
      >
        <Input placeholder='email or phone' />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
        style={{ width: '525px' }}
      >
        <Input.Password placeholder='password' />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 7, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm;