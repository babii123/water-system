import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Select, DatePicker } from 'antd';
import { useDispatch } from 'react-redux';
import { ControlModel, UPDATE_MODEL } from '../../../model/globalModel'
import TextArea from 'antd/es/input/TextArea';
import { PlanTableType } from '../../../model/tableModel';
import { createPlan, updatePlan } from '../../../store/actions/planActions';
import { WaterPriceTableType } from '../../../model/tableModel';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { WaterTableType } from '../../../model/tableModel';

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
  addTime?: string
  startTime?: string
  endTime?: string
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
    waterPriceList?: WaterPriceTableType[],
    waterList?: WaterTableType[],
  }> = ({
    controlModel,
    changeControl,
    updatePlanInfo,
    waterPriceList,
    waterList
  }) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [startTime, setStartTime] = useState<string>()
    const [endTime, setEndTime] = useState<string>()
    const [waterPrice, setWaterPrice] = useState<{ label: string, value: string }[]>()
    const [water, setWater] = useState<{ label: string, value: string }[] | any[]>()
    useEffect(() => {
      if (updatePlanInfo) {
        form.setFieldsValue(updatePlanInfo)
      } else {
        form.resetFields()
      }
      const waterPriceData = waterPriceList?.map(item => {
        return {
          label: item.type,
          value: item.type
        }
      })
      const waterData = waterList?.map(item => {
        if (!item.isDel) {
          return {
            label: item.waterName,
            value: item.waterName
          }
        }
      }).filter(item => item !== undefined)
      setWaterPrice(waterPriceData);
      setWater(waterData);
    }, [updatePlanInfo])
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
      // changeControl({
      //   visible: false,
      //   editType: controlModel?.editType
      // })
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
          _updatePlan({ ...values, startTime, endTime, addTime: dayjs().format('YYYY-MM-DD') }, updatePlanInfo.id)
          changeControl({
            visible: false,
            editType: controlModel?.editType
          })
        }
      } else {
        _createPlan({ ...values, startTime, endTime, addTime: dayjs().format('YYYY-MM-DD') })
        changeControl({
          visible: false,
          editType: controlModel?.editType
        })
      }
    };

    return (
      <>
        <Modal
          title={controlModel?.editType === UPDATE_MODEL ? t('Update Plan') : t('Create Plan')}
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
              label={t("StartTime")}
              name="startTime"
              rules={[{ required: true, message: t('Please input start time!') }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                format="YYYY-MM-DD"
                onChange={(date: any, dateString: string) => {
                  console.log(dateString);
                  setStartTime(dateString)
                }}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label={t("EndTime")}
              name="endTime"
              rules={[{ required: true, message: t('Please input end time!') }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                format="YYYY-MM-DD"
                onChange={(date: any, dateString: string) => {
                  console.log(dateString);
                  setEndTime(dateString)
                }}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label={t("WaterSources")}
              name="waterSources"
              rules={[{ required: true, message: t('Please input water sources!') }]}
            >
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                options={water}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label={t("WaterArea")}
              name="waterArea"
              rules={[{ required: true, message: t('Please input water area!') }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label={t("WaterPriceType")}
              name="waterPriceType"
              rules={[{ required: true, message: t('Please input water price type!') }]}
            >
              <Select
                style={{ width: '100%' }}
                options={waterPrice}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label={t("Description")}
              name="description"
              rules={[{ required: true, message: t('Please input description!') }]}
            >
              <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
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

export default CreatePlanModel;