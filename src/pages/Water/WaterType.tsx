import React, { useEffect, useState } from 'react';
import { Button, Input, Popover, Space, Table } from 'antd';
import { ExclamationCircleTwoTone } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, PlusOutlined, DownloadOutlined, DeleteFilled, RestOutlined } from '@ant-design/icons';
import { CREATE_MODEL, ControlModel, UPDATE_MODEL } from '../../model/globalModel'
import { useDispatch, useSelector } from 'react-redux';
import { WaterTypeTableType } from '../../model/waterTypeModel';
import { deleteWaterType, deleteWaterTypeList, getWaterTypeListByAPI } from '../../store/actions/waterTypeActions';
import CreateModel from './components/CreateWaterTypeModel';
import { useTranslation } from 'react-i18next';
import { exportDataExcel } from '../../services/globalRequest';

function WaterType() {
  const { t } = useTranslation();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [controlModel, setControlModel] = useState<ControlModel>()
  const [updateWaterType, setUpdateWaterType] = useState<WaterTypeTableType>()
  const [deleteVisible, setDeleteVisible] = useState<number>()
  const columns: ColumnsType<WaterTypeTableType> = [
    {
      key: 'id',
      title: 'ID',
      dataIndex: 'id',
      width: 70
    },
    {
      key: 'type',
      title: t('Type'),
      dataIndex: 'type',
      width: 250
    },
    {
      key: 'description',
      title: t('Description'),
      dataIndex: 'description',
      width: 700
    },
    {
      title: t('Action'),
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => { openModel(record, UPDATE_MODEL) }}>{t("Update")}</a>
          <Popover content={
            <>
              <div style={{ marginBottom: '5px' }}>
                <ExclamationCircleTwoTone twoToneColor='#faad14' style={{ marginRight: '5px' }} />
                <span>{t("Are you sure delete this water type")}</span>
              </div>
              <Button size='small' onClick={() => { setDeleteVisible(undefined) }} style={{ marginRight: '5px' }}>{t("No")}</Button>
              <Button size='small' danger onClick={() => { _deleteWaterType(record.id) }}>{t("Yes")}</Button>
            </>
          }
            trigger="focus"
            open={deleteVisible === record.id}
            onOpenChange={() => changeDeleteVisible(record.id)}
          >
            <Button type="link" danger>
              {t("Delete")}
            </Button>
          </Popover>
        </Space >
      ),
    },
  ];

  const changeDeleteVisible = (id: number) => {
    setDeleteVisible(id)
  }

  const data = useSelector((state: any) => {
    return state.waterType.waterTypeList
  })
  const dispatch = useDispatch()
  const _getWaterTypeListByAPI = () => {
    dispatch(getWaterTypeListByAPI())
  }
  const _deleteWaterType = (id: number) => {
    // console.log('_delete');
    setDeleteVisible(undefined)
    dispatch(deleteWaterType(id))
  }
  const _deleteWaterTypeList = (idList: React.Key[]) => {
    dispatch(deleteWaterTypeList(idList))
  }
  useEffect(() => {
    // console.log('触发');
    _getWaterTypeListByAPI()
  }, [])

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const openModel = (record?: WaterTypeTableType, editType?: string) => {
    if (record) {
      setUpdateWaterType(record)
    }
    setControlModel({ visible: true, editType })
  }

  const deleteWaterTypeSeleted = () => {
    console.log('selected', selectedRowKeys);
    _deleteWaterTypeList(selectedRowKeys)
  }

  const changeControl = (controlModel: ControlModel) => {
    setControlModel(controlModel)
    setUpdateWaterType(undefined)
  }

  return (
    <div className='mycard'>
      <CreateModel
        controlModel={controlModel}
        changeControl={changeControl}
        updateWaterTypeInfo={updateWaterType} />
      {/* <Space style={{ marginBottom: 16 }}>
        <span className='searcher_title'>E-mail</span>
        <Input placeholder="Basic usage" />
        <span className='searcher_title'>Real Name</span>
        <Input placeholder="Basic usage" />
        <span className='searcher_title'>Phone</span>
        <Input placeholder="Basic usage" />
        <Button type="primary" icon={<SearchOutlined />}>
          搜索
        </Button>
        <Button icon={<RestOutlined />}>
          重置
        </Button>
      </Space> */}
      <div style={{ marginBottom: 16 }}>
        <Space>
          <Button type="primary" onClick={() => openModel(undefined, CREATE_MODEL)} icon={<PlusOutlined />}>
            {t('AddType')}
          </Button>
          <Button type="primary" onClick={() => deleteWaterTypeSeleted()} icon={<DeleteFilled />} danger>
            {t('BatchDelete')}
          </Button>
          <Button icon={<DownloadOutlined />} onClick={() => exportDataExcel('waterType')}>
            {t('Export')}
          </Button>
        </Space>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} scroll={{ y: 420 }} />
    </div>
  );
};

export default WaterType;