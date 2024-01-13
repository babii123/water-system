import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Select, DatePicker } from 'antd';
import { useDispatch } from 'react-redux';
import { CREATE_MODEL, ControlModel, UPDATE_MODEL } from '../../../model/globalModel'
import TextArea from 'antd/es/input/TextArea';
import { PlanTableType } from '../../../model/planModel';
import { createPlan, updatePlan } from '../../../store/actions/planActions';
import { WaterPriceTableType } from '../../../model/waterPriceModel';
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
  key?: number,
  id?: number,
  addTime?: Date
  startTime?: Date
  endTime?: Date
  waterSources?: string[]
  waterArea?: string
  waterPriceType?: string
  description?: string
  addUser?: string
  isDel?: boolean
  delReason?: string
};

const CreatePlanModel: React.FC<
  {
    controlModel?: ControlModel,
    changeControl: Function,
    updatePlanInfo?: PlanTableType,
    waterPriceList?: WaterPriceTableType[]
  }> = ({
    controlModel,
    changeControl,
    updatePlanInfo,
    waterPriceList
  }) => {
    const [form] = Form.useForm();
    const [startTime, setStartTime] = useState<string>()
    const [endTime, setEndTime] = useState<string>()
    const [waterPrice, setWaterPrice] = useState<{ label: string, value: string }[]>()
    useEffect(() => {
      if (updatePlanInfo) {
        form.setFieldsValue(updatePlanInfo)
      } else {
        form.resetFields()
      }
      const data = waterPriceList?.map(item => {
        return {
          label: item.type,
          value: item.type + item.id
        }
      })
      setWaterPrice(data)
    }, [updatePlanInfo])
    const handleStartDateChange = (date: any, dateString: string) => {
      setStartTime(dateString)
    };
    const handleEndDateChange = (date: any, dateString: string) => {
      setEndTime(dateString)
    };
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
      changeControl({
        visible: false,
        editType: controlModel?.editType
      })
    };
    const dispatch = useDispatch()

    const _createPlan = (plan: any) => {
      dispatch(createPlan(plan))
    }
    const _updatePlan = (plan: any, id: number) => {
      dispatch(updatePlan(plan, id))
    }
    const onFinish = (values: any) => {
      if (controlModel?.editType === UPDATE_MODEL && updatePlanInfo) {
        if (JSON.stringify(updatePlanInfo) !== JSON.stringify(values)) {
          _updatePlan(values, updatePlanInfo.id)
          changeControl({
            visible: false,
            editType: controlModel?.editType
          })
        }
      } else {
        values.startTime = startTime
        values.endTime = endTime
        values.addTime = dayjs().format('YYYY-MM-DD')
        _createPlan(values)
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
          forceRender
        >
          <Form
            {...formItemLayout}
            name="basic"
            form={form}
            style={{ maxWidth: 600 }}
            // initialValues={updatePlanInfo}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Start Time"
              name="startTime"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                format="YYYY-MM-DD"
                onChange={handleStartDateChange}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label="End Time"
              name="endTime"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                format="YYYY-MM-DD"
                onChange={handleEndDateChange}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label="Water Sources"
              name="waterSources"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Select
                mode="tags"
                style={{ width: '100%' }}
                tokenSeparators={[',']}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label="Water Area"
              name="waterArea"
              rules={[{ required: true, message: 'Please input your addUser!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Water Price Type"
              name="waterPriceType"
              rules={[{ required: true, message: 'Please input your addUser!' }]}
            >
              <Select
                style={{ width: '100%' }}
                options={waterPrice}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please input your description!' }]}
            >
              <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
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

export default CreatePlanModel;