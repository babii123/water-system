import React, { useEffect } from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { ControlModel, UPDATE_MODEL } from '../../../model/globalModel'
import { WaterQualityTableType } from '../../../model/tableModel';
import { createWaterQuality, updateWaterQuality } from '../../../store/actions/waterQualityActions';
import dayjs from 'dayjs';
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
  resourceId?: string
  addTime?: Date
  addUser?: string
  detectTime?: Date
  detectPeople?: string[]
  ph?: number
  turbidity?: number
  fluoride?: number
  cyanin?: number
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
    const { t } = useTranslation();
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
          title={controlModel?.editType === UPDATE_MODEL ? t('Update Water Quality') : t('Create Water Quality')}
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
              label={t("WaterID")}
              name="resourceId"
            >
              <Input disabled />
              {/* 修改为选择框 */}
            </Form.Item>

            <Form.Item<FieldType>
              label={t("DetectTime")}
              name="detectTime"
              rules={[{ required: true, message: t('Please input detect time!') }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label={t("DetectPeople")}
              name="detectPeople"
              rules={[{ required: true, message: t('Please input detect people!') }]}
            >
              <Select
                mode="tags"
                style={{ width: '100%' }}
                tokenSeparators={[',']}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label={t("PH")}
              name="ph"
              rules={[{ required: true, message: t('Please input ph!') }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label={t("Turbidity")}
              name="turbidity"
              rules={[{ required: true, message: t('Please input turbidity!') }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label={t("Fluoride")}
              name="fluoride"
              rules={[{ required: true, message: t('Please input fluoride!') }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label={t("Cyanin")}
              name="cyanin"
              rules={[{ required: true, message: t('Please input cyanin!') }]}
            >
              <Input />
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

export default CreateWaterQualityModel;