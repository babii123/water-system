import React, { useEffect } from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { ControlModel, UPDATE_MODEL } from '../../../model/globalModel'
import { WaterStorageTableType } from '../../../model/waterStorageModel';
import { createWaterStorage, updateWaterStorage } from '../../../store/actions/waterStorageActions';
import dayjs from 'dayjs';

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
  resourceId?: string
  addTime?: Date
  addUser?: string
  detectTime?: Date
  detectPeople?: string[]
  supply?: number
  storage?: number
};

const CreateWaterStorageModel: React.FC<
  {
    controlModel?: ControlModel,
    changeControl: Function,
    updateWaterStorageInfo?: WaterStorageTableType
  }
> = (
  {
    controlModel,
    changeControl,
    updateWaterStorageInfo
  }
) => {
    const [form] = Form.useForm()
    useEffect(() => {
      console.log(updateWaterStorageInfo);
      if (updateWaterStorageInfo) {
        form.setFieldsValue(updateWaterStorageInfo)
      } else {
        form.resetFields()
      }
    }, [updateWaterStorageInfo])
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
      changeControl({
        visible: false,
        editType: controlModel?.editType
      })
    };
    const dispatch = useDispatch()

    const _createWaterStorage = (waterStorage: any) => {
      dispatch(createWaterStorage(waterStorage))
    }
    const _updateWaterStorage = (water: any, id: number) => {
      dispatch(updateWaterStorage(water, id))
    }
    const onFinish = (values: any) => {
      console.log('Success:', updateWaterStorageInfo);
      if (updateWaterStorageInfo) {
        if (JSON.stringify(updateWaterStorageInfo) !== JSON.stringify(values)) {
          _updateWaterStorage(values, updateWaterStorageInfo.id)
          changeControl({
            visible: false,
            editType: controlModel?.editType
          })
        }
      } else {
        values.addTime = dayjs().format('YYYY-MM-DD')
        _createWaterStorage(values)
        changeControl({
          visible: false,
          editType: controlModel?.editType
        })
      }
    };
    return (
      <>
        <Modal
          title={controlModel?.editType === UPDATE_MODEL ? 'Update Water Storage' : 'Create Water Storage'}
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
            // initialValues={updateWaterStorageInfo}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
          >
            <Form.Item<FieldType>
              label="Resource ID"
              name="resourceId"
            >
              <Input disabled />
              {/* 修改为选择框 */}
            </Form.Item>

            <Form.Item<FieldType>
              label="Detect Time"
              name="detectTime"
              rules={[{ required: true, message: 'Please input your account name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Detect People"
              name="detectPeople"
              rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
              <Select
                mode="tags"
                style={{ width: '100%' }}
                tokenSeparators={[',']}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label="Supply"
              name="supply"
              rules={[{ required: true, message: 'Please input your description!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Storage"
              name="storage"
              rules={[{ required: true, message: 'Please input your addUser!' }]}
            >
              <Input />
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

export default CreateWaterStorageModel;