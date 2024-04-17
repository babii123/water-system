import { Button, Card, Form, Input, List, Modal, Tooltip, Upload, UploadProps, message } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import PriceTable from "./components/PriceTable";
import './Price.css'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getWaterPriceListByAPI } from "../../store/actions/waterPriceActions";
import { createWaterLink_API, deleteWaterLink_API, getAllWaterLink_API } from "../../services/planRequest";
import { WaterLinkData } from "../../model/tableModel";
import { useTranslation } from "react-i18next";
import { exportDataExcel } from "../../services/globalRequest";

const formItemLayout = {
  labelCol: {
    xs: { span: 4 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 16 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 4,
      offset: 0,
    },
    sm: {
      span: 4,
      offset: 4,
    },
  },
};

type FieldType = {
  title?: string,
  link?: string
};

function Price() {
  const { t } = useTranslation()
  const [form] = Form.useForm();
  const data = useSelector((state: any) => {
    return state.waterPrice.waterPriceList
  })
  const [waterLinkData, setWaterLinkData] = useState<WaterLinkData[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const props: UploadProps = {
    name: 'file',
    action: 'http://localhost:5000/water-price/upload',
    headers: {
      authorization: localStorage.getItem('token') as string,
    },
    maxCount: 1,
    showUploadList: false,
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        _getWaterPriceListByAPI();
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload(file) {
      const arr = file.name.split('.');
      if (arr[arr.length - 1] === 'xlsx') {
        return true;
      } else {
        message.warning('请上传后缀为.xlsx的文件!!!');
      }
    }
  };

  const dispatch = useDispatch()
  const _getWaterPriceListByAPI = () => {
    dispatch(getWaterPriceListByAPI())
  }

  const _getWaterLinkByAPI = () => {
    // 获取水资源相关链接
    getAllWaterLink_API().then(res => {
      if (res.code === 200) {
        setWaterLinkData(res.data);
      }
    })
  }

  const deleteWaterLink = (id: number) => {
    deleteWaterLink_API(id).then((res) => {
      if (res.code === 200) {
        _getWaterLinkByAPI();
      }
    })
  }

  const onFinishFailed = () => {
    setModalVisible(false);
  }

  const onFinish = (values: any) => {
    createWaterLink_API(values).then(res => {
      if (res.code === 200) {
        setModalVisible(false);
        _getWaterLinkByAPI();
      }
    })
  }

  useEffect(() => {
    _getWaterPriceListByAPI();
    _getWaterLinkByAPI();
  }, [])
  return (
    <div>
      {/* 水价表 */}
      <div className="my-card margin-bottom">
        水价表
        <Tooltip title="上传水价信息">
          <Upload {...props}>
            <Button icon={<UploadOutlined />}></Button>
          </Upload>
        </Tooltip>
        <Tooltip title="下载导入模板">
          <Button icon={<DownloadOutlined />} onClick={() => exportDataExcel('waterPrice')}></Button>
        </Tooltip>
        <PriceTable data={data} />
      </div>

      {/* 水价依赖政策 */}
      <div className="flex">
        <div className="mycard margin-right price-update">
          <div className="price-update-title">
            <span>水资源相关链接</span>&nbsp;
            <PlusCircleOutlined style={{ color: '#7fa8d7' }} onClick={() => setModalVisible(true)} />
          </div>
          {/* <div style={{width:'100%', height: '1px', transform: 'scale(0.5)',backgroundColor:'#ccc' }}></div> */}
          <div className="price-update-content">
            <List
              itemLayout="horizontal"
              dataSource={waterLinkData}
              renderItem={item => (
                <List.Item
                  actions={[<MinusCircleOutlined style={{ color: '#7fa8d7' }} onClick={() => deleteWaterLink(item.id)} />]}
                >
                  {item.title}
                </List.Item>
              )} />
          </div>
        </div>
      </div>
      <Modal
        title={t('Create Water Link')}
        centered
        open={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        width={500}
        footer={null}
        forceRender
      >
        <Form
          {...formItemLayout}
          name="basic"
          form={form}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label={t("title")}
            name="title"
            rules={[{ required: true, message: t('Please input title!') }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label={t("link")}
            name="link"
            rules={[{ required: true, message: t('Please input link!') }]}
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
    </div >
  )
}

export default Price;