import React, { useEffect } from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { ControlModel, UPDATE_MODEL } from '../../../model/globalModel'
import { WaterQualityTableType } from '../../../model/waterQualityModel';
import { createWaterQuality, updateWaterQuality } from '../../../store/actions/waterQualityActions';
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
  ph?: number
  turbidity?: number
  fluoride?: number
};

const CreateWaterQualityModel: React.FC<
  {
    controlModel?: ControlModel,
    changeControl: Function,
    updateWaterQualityInfo?: WaterQualityTableType
  }
> = (
  {
    controlModel,
    changeControl,
    updateWaterQualityInfo
  }
) => {
    const [form] = Form.useForm()
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
      changeControl({
        visible: false,
        editType: controlModel?.editType
      })
    };
    const dispatch = useDispatch()

    const _createWaterQuality = (waterQuality: any) => {
      dispatch(createWaterQuality(waterQuality))
    }
    const _updateWaterQuality = (water: any, id: number) => {
      dispatch(updateWaterQuality(water, id))
    }
    const onFinish = (values: any) => {
      console.log('Success:', updateWaterQualityInfo);
      if (updateWaterQualityInfo) {
        if (JSON.stringify(updateWaterQualityInfo) !== JSON.stringify(values)) {
          _updateWaterQuality(values, updateWaterQualityInfo.id)
          changeControl({
            visible: false,
            editType: controlModel?.editType
          })
        }
      } else {
        values.addTime = dayjs().format('YYYY-MM-DD')
        _createWaterQuality(values)
        changeControl({
          visible: false,
          editType: controlModel?.editType
        })
      }
    };

    useEffect(() => {
      if (updateWaterQualityInfo) {
        form.setFieldsValue(updateWaterQualityInfo)
      } else {
        form.resetFields()
      }
    }, [updateWaterQualityInfo])

    return (
      <>
        <Modal
          title={controlModel?.editType === UPDATE_MODEL ? 'Update Water Quality' : 'Create Water Quality'}
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
            // initialValues={updateWaterQualityInfo}
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
              label="PH"
              name="ph"
              rules={[{ required: true, message: 'Please input your description!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Turbidity"
              name="turbidity"
              rules={[{ required: true, message: 'Please input your addUser!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="fluoride"
              name="fluoride"
              rules={[{ required: true, message: 'Please input your checkUser!' }]}
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

export default CreateWaterQualityModel;