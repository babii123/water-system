import React, { useEffect } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { NoticeListModel } from '../../../model/tableModel';
import { useTranslation } from 'react-i18next';
import { sendEmail_API } from '../../../services/noticeRequest';

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
  title: string;
  info: string;
  sendId: string,
  receiveId: string;
};

const SendEmailModal: React.FC<
  {
    visible?: boolean,
    changeControl: Function,
    notice?: NoticeListModel
  }
> = (
  {
    visible,
    changeControl,
    notice
  }
) => {
    const { t } = useTranslation();
    const [form] = Form.useForm()
    useEffect(() => {
      if (notice) {
        form.setFieldsValue({
          title: notice.type === 'yield' ? '水量警告' : '水质警告',
          info: notice.info,
          sendId: notice.receiveId,
          receiveId: ''
        });
      } else {
        form.resetFields()
      }
    }, [notice])
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
      changeControl()
    };

    const onFinish = (values: any) => {
      sendEmail_API({
        info: values.info,
        sendId: notice?.receiveId || '',
        receiveId: values.receiveId + '@qq.com',
        title: values.title
      }).then((res) => {
        if (res.code === 200) {
          changeControl()
          message.success('发送成功!')
        } else {
          message.error('邮箱不存在!')
        }
      })
    };
    return (
      <>
        <Modal
          title='发送邮件'
          centered
          open={visible}
          onOk={() => changeControl()}
          onCancel={() => changeControl()}
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
            form={form}
          >
            <Form.Item<FieldType>
              label="邮件标题"
              name="title"
              rules={[{ required: true, message: 'Please input type!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="收件邮箱"
              name="receiveId"
              rules={[{ required: true, message: 'Please input email!' }]}
            >
              <Input addonAfter="@qq.com" />
            </Form.Item>

            <Form.Item<FieldType>
              label="邮件内容"
              name="info"
              rules={[{ required: true, message: 'Please input info!' }]}
            >
              <TextArea />
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

export default SendEmailModal;