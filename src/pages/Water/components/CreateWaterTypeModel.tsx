import React, { useEffect, useRef } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { ControlModel, UPDATE_MODEL } from '../../../model/globalModel'
import TextArea from 'antd/es/input/TextArea';
import { WaterTypeTableType } from '../../../model/tableModel';
import { createWaterType, updateWaterType } from '../../../store/actions/waterTypeActions';
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
  type?: string
  description?: string
};

const CreateWaterTypeModel: React.FC<
  {
    controlModel?: ControlModel,
    changeControl: Function,
    updateWaterTypeInfo?: WaterTypeTableType
  }
> = (
  {
    controlModel,
    changeControl,
    updateWaterTypeInfo
  }
) => {
    const { t } = useTranslation();
    const [form] = Form.useForm()
    useEffect(() => {
      if (updateWaterTypeInfo) {
        form.setFieldsValue(updateWaterTypeInfo);
      } else {
        form.resetFields()
      }
    }, [updateWaterTypeInfo])
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
      console.log('Success:', values);
      if (updateWaterTypeInfo) {
        if ((updateWaterTypeInfo.type !== values.type || updateWaterTypeInfo.description !== values.description)) {
          _updateWaterType(values, updateWaterTypeInfo.id)
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
          title={controlModel?.editType === UPDATE_MODEL ? t('Update Water Type') : t('Create Water Type')}
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
            // initialValues={updateWaterTypeInfo}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
          >
            <Form.Item<FieldType>
              label="Type"
              name="type"
              rules={[{ required: true, message: 'Please input type!' }]}
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

export default CreateWaterTypeModel;