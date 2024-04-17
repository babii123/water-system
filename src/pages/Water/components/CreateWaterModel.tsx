import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { CREATE_MODEL, ControlModel, UPDATE_MODEL } from '../../../model/globalModel'
import TextArea from 'antd/es/input/TextArea';
import { WaterTableType } from '../../../model/waterModel';
import { createWater, updateWater } from '../../../store/actions/waterActions';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { WaterTypeTableType } from '../../../model/waterTypeModel';

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

const CreateWaterModel: React.FC<
  {
    controlModel?: ControlModel,
    changeControl: Function,
    updateWaterInfo?: WaterTableType,
    waterTypeList?: WaterTypeTableType[]
  }
> = (
  {
    controlModel,
    changeControl,
    updateWaterInfo,
    waterTypeList
  }
) => {
    const { t } = useTranslation();
    const [form] = Form.useForm()
    const [waterType, setWaterType] = useState<{ label: string, value: string }[]>()
    useEffect(() => {
      if (updateWaterInfo) {
        form.setFieldsValue(updateWaterInfo);
      } else {
        form.resetFields()
      }
      const waterTypeData = waterTypeList?.map(item => {
        return {
          label: item.type,
          value: item.type
        }
      })
      setWaterType(waterTypeData);
    }, [updateWaterInfo])
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
      changeControl({
        visible: false,
        editType: controlModel?.editType
      })
    };
    const dispatch = useDispatch()

    const _createWater = (water: any) => {
      dispatch(createWater(water))
    }
    const _updateWater = (water: any, id: number) => {
      dispatch(updateWater(water, id))
    }
    const onFinish = (values: any) => {
      console.log('Success:', updateWaterInfo);
      if (updateWaterInfo) {
        if (JSON.stringify(updateWaterInfo) !== JSON.stringify(values)) {
          _updateWater(values, updateWaterInfo.id)
          changeControl({
            visible: false,
            editType: controlModel?.editType
          })
        }
      } else {
        values.addTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
        _createWater(values)
        changeControl({
          visible: false,
          editType: controlModel?.editType
        })
      }
    };
    return (
      <>
        <Modal
          title={controlModel?.editType === UPDATE_MODEL ? t('Update Water') : t('Create Water')}
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
            // initialValues={updateWaterInfo}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
          >
            <Form.Item<FieldType>
              label={t("Type")}
              name="type"
              rules={[{ required: true, message: t('Please input type!') }]}
            >
              <Select
                style={{ width: '100%' }}
                options={waterType}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label={t("WaterName")}
              name="waterName"
              rules={[{ required: true, message: t('Please input water name!') }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label={t("Address")}
              name="address"
              rules={[{ required: true, message: t('Please input address!') }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label={t("Description")}
              name="description"
              rules={[{ required: true, message: t('Please input description!') }]}
            >
              <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
            </Form.Item>

            <Form.Item<FieldType>
              label={t("AddUser")}
              name="addUser"
              rules={[{ required: true, message: t('Please input add user!') }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label={t("CheckUser")}
              name="checkUser"
              rules={[{ required: true, message: t('Please input check user!') }]}
            >
              <Select
                mode="tags"
                style={{ width: '100%' }}
                tokenSeparators={[',']}
              />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                {t("Submit")}
              </Button>
            </Form.Item>
          </Form>
        </Modal >
      </>
    );
  };

export default CreateWaterModel;