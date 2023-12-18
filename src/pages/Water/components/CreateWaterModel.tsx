import React from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { ControlModel, UPDATE_MODEL } from '../../../model/globalModel'
import TextArea from 'antd/es/input/TextArea';
import { createWaterType, updateWaterType } from '../../../store/actions/waterTypeActions';
import { WaterDataType } from '../../../model/waterModel';

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
  type?: string
  waterName?: string
  address?: string
  description?: string
  addUser?: string
  checkUser?: string[]
};

const CreateWaterModel: React.FC<{ controlModel?: ControlModel, changeControl: Function, updateWaterInfo?: WaterDataType }> = ({ controlModel, changeControl, updateWaterInfo }) => {

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    changeControl({
      visible: false,
      editType: controlModel?.editType
    })
  };
  const dispatch = useDispatch()

  const _createWaterType = (waterType: any) => {
    dispatch(createWaterType(waterType))
  }
  const _updateWaterType = (waterType: any, id: number) => {
    dispatch(updateWaterType(waterType, id))
  }
  const onFinish = (values: any) => {
    console.log('Success:', updateWaterInfo);
    if (updateWaterInfo) {
      if ((updateWaterInfo.type !== values.type || updateWaterInfo.description !== values.description)) {
        _updateWaterType(values, updateWaterInfo.id)
        changeControl({
          visible: false,
          editType: controlModel?.editType
        })
      }
    } else {
      _createWaterType(values)
      changeControl({
        visible: false,
        editType: controlModel?.editType
      })
    }
  };
  return (
    <>
      <Modal
        title={controlModel?.editType === UPDATE_MODEL ? 'Update Water' : 'Create Water'}
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
          initialValues={updateWaterInfo}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
            {/* 修改为选择框 */}
          </Form.Item>

          <Form.Item<FieldType>
            label="Water Name"
            name="waterName"
            rules={[{ required: true, message: 'Please input your account name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input your description!' }]}
          >
            <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Add User"
            name="addUser"
            rules={[{ required: true, message: 'Please input your addUser!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Check User"
            name="checkUser"
            rules={[{ required: true, message: 'Please input your checkUser!' }]}
          >
            <Select
              mode="tags"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
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

export default CreateWaterModel;