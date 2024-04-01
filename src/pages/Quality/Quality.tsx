import React, { useEffect, useState } from 'react';
import { Button, Input, Popover, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, DownloadOutlined, DeleteFilled, RestOutlined } from '@ant-design/icons';
import { ControlModel, MULTI, ONLY, UPDATE_MODEL } from '../../model/globalModel';
import { WaterQualityTableType } from '../../model/waterQualityModel';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWaterQualityByReason, deleteWaterQualityList, getWaterQualityByID, getWaterQualityListByAPI } from '../../store/actions/waterQualityActions';
import { ExclamationCircleTwoTone } from '@ant-design/icons'
import CreateWaterQualityModel from './components/CreateWaterQualityModel';
import DeleteWaterQualityModel from './components/DeleteWaterQualityModel';
import { useTranslation } from 'react-i18next';
import { exportDataExcel } from '../../services/globalRequest';

function Quality() {
  const { t } = useTranslation();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [controlModel, setControlModel] = useState<ControlModel>()
  const [updateWaterQuality, setUpdateWaterQuality] = useState<WaterQualityTableType>()
  const [deleteVisible, setDeleteVisible] = useState<number>()
  const [deleteModel, setDeleteModel] = useState<boolean>()
  const [deleteValue, setDeleteValue] = useState<{ value: any, type: string }>()
  const [id, setID] = useState<number>()
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const columns: ColumnsType<WaterQualityTableType> = [
    {
      key: 'id',
      title: 'ID',
      dataIndex: 'id'
    },
    {
      key: 'resourceId',
      title: t('WaterID'),
      dataIndex: 'resourceId'
    },
    {
      key: 'addTime',
      title: t('AddTime'),
      dataIndex: 'addTime'
    },
    {
      key: 'addUser',
      title: t('AddUser'),
      dataIndex: 'addUser',
    },
    {
      key: 'detectTime',
      title: t('DetectTime'),
      dataIndex: 'detectTime'
    },
    {
      key: 'detectPeople',
      title: t('DetectPeople'),
      dataIndex: 'detectPeople',
      width: 150,
      render: (_, record) => (
        <>
          {
            record.detectPeople?.map((item) => {
              return <Tag color='#2db7f5' key={item}>
                {item}
              </Tag>
            })
          }
        </>
      )
    },
    {
      key: 'ph',
      title: t('PH'),
      dataIndex: 'ph'
    },
    {
      key: 'turbidity',
      title: t('Turbidity'),
      dataIndex: 'turbidity'
    },
    {
      key: 'fluoride',
      title: t('Fluoride'),
      dataIndex: 'fluoride'
    },
    {
      title: t('Action'),
      key: 'action',
      fixed: 'right',
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => openModel(record, UPDATE_MODEL)}>{t("Update")}</a>
          <Popover content={
            <>
              <div style={{ marginBottom: '5px' }}>
                <ExclamationCircleTwoTone twoToneColor='#faad14' style={{ marginRight: '5px' }} />
                <span>{t("Are you sure delete this quality")}</span>
              </div>
              <Button size='small' onClick={() => { setDeleteVisible(undefined) }} style={{ marginRight: '5px' }}>{t("No")}</Button>
              <Button size='small' danger onClick={() => { showDeleteModel([record.id], ONLY) }}>{t("Yes")}</Button>
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

  const data = useSelector((state: any) => {
    return state.waterQuality.waterQualityList
  })
  const dispatch = useDispatch()
  const _getWaterQualityListByAPI = () => {
    dispatch(getWaterQualityListByAPI())
  }
  const _deleteWaterQualityList = (idList: React.Key[]) => {
    dispatch(deleteWaterQualityList(idList))
  }
  const _deleteWaterQualityByReason = (id: number, delReason: string) => {
    dispatch(deleteWaterQualityByReason(id, delReason))
  }
  const _getWaterQualityByID = (id: number) => {
    dispatch(getWaterQualityByID(id))
  }
  const changeDeleteVisible = (id: number) => {
    setDeleteVisible(id)
  }
  const showDeleteModel = (id: number[], type: string) => {
    setDeleteModel(true)
    setDeleteVisible(undefined)
    if (type === ONLY) {
      setDeleteValue({ value: id, type })
    }
    if (type === MULTI) {
      setDeleteValue({ value: selectedRowKeys, type })
    }
  }
  const openModel = (record?: WaterQualityTableType, editType?: string) => {
    console.log(record);
    if (record) {
      setUpdateWaterQuality(record)
    }
    setControlModel({ visible: true, editType })
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const changeControl = (controlModel: ControlModel) => {
    setControlModel(controlModel)
    setUpdateWaterQuality(undefined)
  }

  useEffect(() => {
    _getWaterQualityListByAPI()
  }, [])

  const findQuality = (id?: number) => {
    if (id) {
      _getWaterQualityByID(id)
    } else {
      _getWaterQualityListByAPI()
    }
  }

  return (
    <>
      <CreateWaterQualityModel
        controlModel={controlModel}
        changeControl={changeControl}
        updateWaterQualityInfo={updateWaterQuality}
      />
      <DeleteWaterQualityModel
        deleteVisible={deleteModel}
        changeDeleteVisible={setDeleteModel}
        deleteValue={deleteValue}
        _deleteWaterQualityList={_deleteWaterQualityList}
        _deleteWaterQualityByReason={_deleteWaterQualityByReason}
      />
      <div className='mycard'>
        <Space style={{ marginBottom: 16 }}>
          <span className='searcher_title'>ID</span>
          <Input value={id} onChange={(e) => setID(parseInt(e.target.value))} />
          {/* <span>水资源类型</span> */}
          {/* <Input placeholder="水资源类型" /> */}
          {/* <span>测量时间</span> */}
          {/* <Input placeholder="测量时间" /> */}
          {/* <span>测量人员</span> */}
          {/* <Input placeholder="测量人员" /> */}
          {/* <span>PH值</span> */}
          {/* <Input placeholder="PH值" /> */}
          {/* <span>浊度</span> */}
          {/* <Input placeholder="浊度" /> */}
          {/* <span>污染物水平</span> */}
          {/* <Input placeholder="污染物水平" /> */}
          <Button type="primary" icon={<SearchOutlined />} onClick={() => findQuality(id)}>
            {t('Search')}
          </Button>
          <Button icon={<RestOutlined />} onClick={() => { setID(undefined); findQuality() }}>
            {t('Reset')}
          </Button>
        </Space>
        <div style={{ marginBottom: 16 }}>
          <Space>
            <Button type="primary" icon={<DeleteFilled />} danger>
              {t('BatchDelete')}
            </Button>
            <Button icon={<DownloadOutlined />} onClick={() => exportDataExcel('waterQuality')}>
              {t('Export')}
            </Button>
          </Space>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} scroll={{ y: 420 }} />
      </div>
    </>

  );
};

export default Quality;