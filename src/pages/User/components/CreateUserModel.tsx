import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Select, DatePicker, message } from 'antd';
import { Gender } from '../../../model/userInfoModel';
import { UserTableType } from '../../../model/userInfoModel'
import { useDispatch } from 'react-redux';
import { createUser, updateUser } from '../../../store/actions/userListActions';
import { ControlModel, UPDATE_MODEL } from '../../../model/globalModel'
import { useTranslation } from 'react-i18next';
import { validateEmail, validatePhoneNumber } from '../../../utils/verify';

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

const CreateUserModel: React.FC<{
  controlModel?: ControlModel,
  changeControl: Function,
  updateUserInfo?: UserTableType
}> = ({ controlModel, changeControl, updateUserInfo }) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  useEffect(() => {
    if (updateUserInfo) {
      form.setFieldsValue(updateUserInfo)
    } else {
      form.resetFields()
    }
  }, [updateUserInfo])
  const [dateString, setDateString] = useState<string>()
  const handleDateChange = (date: any, dateString: string) => {
    setDateString(dateString)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    // changeControl({
    //   visible: false,
    //   editType: controlModel?.editType
    // })
  };
  const dispatch = useDispatch()

  const _updateUser = (updateUserInfo: any, userId: string) => {
    dispatch(updateUser(updateUserInfo, userId))
  }
  const _createUser = (userInfo: any) => {
    dispatch(createUser(userInfo))
  }

  const onFinish = (values: FieldType) => {
    if (!validatePhoneNumber(values.phone)) {
      message.error('输入手机号无效!');
      return;
    }
    if (!validateEmail(values.email)) {
      message.error('输入的邮箱地址无效!');
      return;
    }
    values.birthday = dateString
    // 判断是否是更新
    if (updateUserInfo && values.roles) {
      // 判断是否需要修改了
      if (JSON.stringify(updateUserInfo) !== JSON.stringify(values)) {
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
        title={controlModel?.editType === UPDATE_MODEL ? t('Update User') : t('Create User')}
        centered
        open={controlModel?.visible}
        onOk={() => changeControl({ visible: false, editType: controlModel?.editType })}
        onCancel={() => changeControl({ visible: false, editType: controlModel?.editType })}
        width={750}
        footer={null}
        forceRender
      >
        <Form
          {...formItemLayout}
          name="basic"
          style={{ maxWidth: 600 }}
          // initialValues={updateUserInfo}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item<FieldType>
            label={t("RealName")}
            name="realName"
            rules={[{ required: true, message: t('Please input real name!') }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label={t("AccountName")}
            name="accountName"
            rules={[{ required: true, message: t('Please input account name!') }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            name="phone"
            label={t("Phone")}
            rules={[{ required: true, message: t('Please input phone!') }]}
          >
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item<FieldType>
            label={t("Email")}
            name="email"
            rules={[{ required: true, message: t('Please input email!') }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label={t("Sex")}
            name="sex"
            rules={[{ required: true, message: t('Please select sex!') }]}
          >
            <Select placeholder="select  gender">
              <Option value={1}>Male</Option>
              <Option value={2}>Female</Option>
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            label={t("Birthday")}
            name="birthday"
            rules={[{ required: true, message: t('Please input birthday!') }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              format="YYYY-MM-DD"
              onChange={handleDateChange}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label={t("Roles")}
            name="roles"
            rules={[{ required: true, message: t('Please select roles!') }]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select roles"
              options={[
                { label: t('admin'), value: 'admin' },
                { label: t('engineer'), value: 'engineer' },
                { label: t('searcher'), value: 'searcher' }
              ]}
            />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              {t("Submit")}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateUserModel;