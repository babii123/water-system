import React, { useState } from 'react';
import { Button, Modal, Form, Input, Select, DatePicker } from 'antd';
import { Gender } from '../../../model/userInfoModel';
import { createUser_API, updateUser_API } from '../../../services/userRequest';
import { UserListDataType } from '../../../model/userInfoModel'
import { useDispatch } from 'react-redux';
import { createUser, getUserListByAPI, updateUser } from '../../../store/actions/userListActions';
import { ControlModel, UPDATE_MODEL } from '../../../model/globalModel'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const { Option } = Select;

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }} defaultValue={'86'}>
      <Option value="86">+86</Option>
      <Option value="87">+87</Option>
    </Select>
  </Form.Item>
);

type FieldType = {
  realName?: string
  accountName?: string
  email?: string
  phone?: string
  sex?: Gender
  birthday?: string
  roles: string[]
};

const CreateModel: React.FC<{ controlModel?: ControlModel, changeControl: Function, updateUserInfo?: UserListDataType }> = ({ controlModel, changeControl, updateUserInfo }) => {

  // const [modalOpen, setModalOpen] = useState(visible);
  const [dateString, setDateString] = useState<string>()
  const handleDateChange = (date: any, dateString: string) => {
    setDateString(dateString)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    changeControl({
      visible: false,
      editType: controlModel?.editType
    })
  };
  const dispatch = useDispatch()

  const _updateUser = (updateUserInfo: any, userId: string) => {
    dispatch(updateUser(updateUserInfo, userId))
  }
  const _createUser = (userInfo: any) => {
    dispatch(createUser(userInfo))
  }

  const onFinish = (values: FieldType) => {
    console.log('Success:', values);
    console.log('Success1:', updateUserInfo);

    values.birthday = dateString
    // 判断是否是更新
    if (updateUserInfo && values.roles) {
      // 判断是否需要修改了
      if (updateUserInfo.accountName !== values.accountName || updateUserInfo.email !== values.email || updateUserInfo.phone !== values.phone || updateUserInfo.realName !== values.realName || updateUserInfo.sex !== values.sex ||
        !(updateUserInfo.roles.length === values.roles?.length
          && updateUserInfo.roles.every((v, i) => v === values.roles[i])
        )) {
        _updateUser(values, updateUserInfo.userId)
        changeControl({
          visible: false,
          editType: controlModel?.editType
        })
      }
    } else {
      // 类型检查
      _createUser(values)
      changeControl({
        visible: false,
        editType: controlModel?.editType
      })
    }
  };
  return (
    <>
      <Modal
        title={controlModel?.editType === UPDATE_MODEL ? 'Update User' : 'Create User'}
        centered
        open={controlModel?.visible}
        onOk={() => changeControl({ visible: false, editType: controlModel?.editType })}
        onCancel={() => changeControl({ visible: false, editType: controlModel?.editType })}
        width={750}
        footer={null}
      >
        <Form
          {...formItemLayout}
          name="basic"
          style={{ maxWidth: 600 }}
          initialValues={updateUserInfo}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Real Name"
            name="realName"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Account Name"
            name="accountName"
            rules={[{ required: true, message: 'Please input your account name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item<FieldType>
            label="E-mail"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Gender"
            name="sex"
            rules={[{ required: true, message: 'Please select your gender!' }]}
          >
            <Select placeholder="select your gender">
              <Option value={1}>Male</Option>
              <Option value={2}>Female</Option>
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            label="Birthday"
            name="birthday"
            rules={[{ required: true, message: 'Please input your birthday!' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              format="YYYY-MM-DD"
              onChange={handleDateChange}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Roles"
            name="roles"
            rules={[{ required: true, message: 'Please select your roles!' }]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select roles"
              options={[
                { label: 'admin', value: 'admin' },
                { label: 'engineer', value: 'engineer' },
                { label: 'searcher', value: 'searcher' }
              ]}
            />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateModel;