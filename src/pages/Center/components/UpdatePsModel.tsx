import React from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import { changePassWord } from '../../../services/userRequest';
import { useTranslation } from 'react-i18next';

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

type FieldType = {
  oldPassword?: string
  newPassword?: string
};

const UpdatePsModel: React.FC<
  {
    modelVisible?: boolean,
    changeModelVisible: Function,
  }
> = (
  {
    modelVisible,
    changeModelVisible,
  }
) => {
    const { t } = useTranslation()
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
      changeModelVisible(false)
    };
    const onFinish = (values: any) => {
      const userId = localStorage.getItem('userId')
      if (userId) {
        changePassWord(userId, values).then(res => {
          if (res.code === 200) {
            message.success(t('change success!'))
          } else {
            message.error(t('change fail!'))
          }
        })
        changeModelVisible(false)
      }
    };
    return (
      <>
        <Modal
          title={t('Change Password')}
          centered
          open={modelVisible}
          onOk={() => changeModelVisible(false)}
          onCancel={() => changeModelVisible(false)}
          width={750}
          footer={null}
          forceRender
        >
          <Form
            {...formItemLayout}
            name="basic"
            style={{ maxWidth: 600 }}
            // initialValues={updateWaterTypeInfo}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label={t('oldPassword')}
              name="oldPassword"
              rules={[{ required: true, message: t('Please input old password!') }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label={t('newPassword')}
              name="newPassword"
              rules={[{ required: true, message: t('Please input new password!') }]}
            >
              <Input.Password />
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

export default UpdatePsModel;