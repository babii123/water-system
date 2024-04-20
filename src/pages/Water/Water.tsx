import React, { useEffect, useState } from 'react';
import { Button, Input, Popover, Space, Table, Tag, Tooltip } from 'antd';
import { ExclamationCircleTwoTone } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, PlusOutlined, DownloadOutlined, DeleteFilled, RestOutlined, QuestionCircleFilled } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { CREATE_MODEL, ControlModel, UPDATE_MODEL, ONLY, MULTI } from '../../model/globalModel';
import { WaterTableType } from '../../model/tableModel';
import { deleteWater, deleteWaterByReason, deleteWaterList, getWaterListByAPI, getWaterListByCondition } from '../../store/actions/waterActions';
import CreateWaterModel from './components/CreateWaterModel';
import DeleteWaterModel from './components/DeleteWaterModel';
import CreateWaterQualityModel from '../Quality/components/CreateWaterQualityModel';
import CreateWaterStorageModel from '../Storage/components/CreateWaterStorageModel';
import { WaterQualityTableType } from '../../model/tableModel';
import { WaterStorageTableType } from '../../model/tableModel';
import { exportDataExcel } from '../../services/globalRequest'
import { useTranslation } from 'react-i18next';
import { UserRole } from '../../store/actions/userActions';
import { getWaterTypeListByAPI } from '../../store/actions/waterTypeActions';

const Water: React.FC = () => {
  const { t } = useTranslation();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [controlModel, setControlModel] = useState<ControlModel>()
  const [controlModel_quality, setControlModelQ] = useState<ControlModel>()
  const [controlModel_storage, setControlModelS] = useState<ControlModel>()
  const [updateWater, setUpdateWater] = useState<WaterTableType>()
  const [updateWaterQuality, setUpdateWaterQ] = useState<WaterQualityTableType>()
  const [updateWaterStorage, setUpdateWaterS] = useState<WaterStorageTableType>()
  const [deleteVisible, setDeleteVisible] = useState<number>()
  const [deleteModel, setDeleteModel] = useState<boolean>()
  const [deleteValue, setDeleteValue] = useState<{ value: any, type: string }>()
  const [waterArea, setWaterArea] = useState<string>()
  const [waterType, setWaterType] = useState<string>()

  const columns: ColumnsType<WaterTableType> = [
    {
      key: 'id',
      title: <>
        <span>ID</span>&nbsp;
        <Tooltip title="标红数据为普通用户删除数据" color='red'>
          <QuestionCircleFilled style={{ color: '#8a919f' }} />
        </Tooltip>
      </>,
      dataIndex: 'id',
      width: 50,
      render: (_, record) => (
        <span style={{ color: record.isDel ? 'red' : '' }}>{record.id}</span>
      )
    },
    {
      key: 'type',
      title: t('Type'),
      dataIndex: 'type',
      width: 150,
      render: (_, record) => (
        <span style={{ color: record.isDel ? 'red' : '' }}>{record.type}</span>
      )
    },
    {
      key: 'waterName',
      title: t('WaterName'),
      dataIndex: 'waterName',
      width: 150,
      render: (_, record) => (
        <span style={{ color: record.isDel ? 'red' : '' }}>{record.waterName}</span>
      )
    },
    {
      key: 'address',
      title: t('Address'),
      dataIndex: 'address',
      width: 150,
      render: (_, record) => (
        <span style={{ color: record.isDel ? 'red' : '' }}>{record.address}</span>
      )
    },
    {
      key: 'description',
      title: t('Description'),
      dataIndex: 'description',
      width: 400,
      render: (_, record) => (
        <span style={{ color: record.isDel ? 'red' : '' }}>{record.description}</span>
      )
    },
    {
      key: 'addTime',
      title: t('AddTime'),
      dataIndex: 'addTime',
      width: 120,
      render: (_, record) => (
        <span style={{ color: record.isDel ? 'red' : '' }}>{record.addTime.toString()}</span>
      )
    },
    {
      key: 'addUser',
      title: t('AddUser'),
      dataIndex: 'addUser',
      width: 150,
      render: (_, record) => (
        <span style={{ color: record.isDel ? 'red' : '' }}>{record.addUser}</span>
      )
    },
    {
      key: 'checkUser',
      title: t('CheckUser'),
      dataIndex: 'checkUser',
      width: 150,
      render: (_, record) => (
        <>
          {
            record.checkUser.map((item) => {
              return <Tag color='#2db7f5' key={item}>
                {item}
              </Tag>
            })
          }
        </>
      )
    },
    {
      key: 'delReason',
      title: t('delReason'),
      dataIndex: 'delReason',
      width: 150,
      render: (_, record) => (
        <span style={{ color: record.isDel ? 'red' : '' }}>{record.delReason}</span>
      )
    },
    {
      title: t('Action'),
      key: 'action',
      fixed: 'right',
      width: 350,
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => openModel(record, UPDATE_MODEL)}>{t("Update")}</a>
          <Popover content={
            <>
              <div style={{ marginBottom: '5px' }}>
                <ExclamationCircleTwoTone twoToneColor='#faad14' style={{ marginRight: '5px' }} />
                <span>{t("Are you sure delete this water")}</span>
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
          {/* 新建水量信息 */}
          <Tooltip placement="top" title={t('add storage info')}>
            <Button style={{ backgroundColor: '#87d068bc', color: '#fff' }}
              onClick={() => {
                setControlModelS({ visible: true, editType: CREATE_MODEL });
                setUpdateWaterS({
                  key: undefined,
                  id: 0,
                  resourceId: record.id,
                  addTime: undefined,
                  addUser: undefined,
                  detectTime: undefined,
                  detectPeople: [],
                  supply: undefined,
                  storage: undefined,
                  isDel: false,
                  delReason: ''
                })
              }
              }>{t("storage")}</Button>
          </Tooltip>
          {/* 新建水质信息 */}
          <Tooltip placement="top" title={t('add quality info')} >
            <Button
              style={{ backgroundColor: '#1677ffaf', color: '#fff' }}
              onClick={() => {
                setControlModelQ({ visible: true, editType: CREATE_MODEL })
                setUpdateWaterQ({
                  key: undefined,
                  id: 0,
                  resourceId: record.id,
                  addTime: undefined,
                  addUser: undefined,
                  detectTime: undefined,
                  detectPeople: undefined,
                  ph: undefined,
                  turbidity: undefined,
                  fluoride: undefined,
                  cyanin: undefined,
                  isDel: false,
                  delReason: ''
                })
              }
              }>{t("quality")}</Button>
          </Tooltip>
        </Space >
      ),
    },
  ];

  useEffect(() => {
    _getWaterListByAPI();
    _getWaterTypeListByAPI();
  }, [])

  const data = useSelector((state: any) => {
    return state.water.waterList
  })
  const userRole = useSelector((state: any) => {
    return state.userInfo.roles
  })
  const waterTypeList = useSelector((state: any) => {
    return state.waterType.waterTypeList
  })
  const dispatch = useDispatch()
  const _getWaterListByAPI = () => {
    dispatch(getWaterListByAPI())
  }
  const _getWaterTypeListByAPI = () => {
    dispatch(getWaterTypeListByAPI())
  }
  const _deleteWaterList = (idList: React.Key[], delReason: string) => {
    dispatch(deleteWaterList(idList, delReason))
  }
  const _deleteWaterByReason = (id: number, delReason: string) => {
    dispatch(deleteWaterByReason(id, delReason))
  }
  // 彻底删除
  const _deleteWater = (idList: any) => {
    dispatch(deleteWater(idList))
  }
  const _getWaterByCondition = (waterArea?: string, waterType?: string) => {
    dispatch(getWaterListByCondition(waterArea, waterType))
  }
  const changeDeleteVisible = (id: number) => {
    setDeleteVisible(id)
  }
  const showDeleteModel = (id: number[], type: string) => {
    if (userRole.includes(UserRole.ADMIN)) {
      const idList = id && id.length > 0 ? id : selectedRowKeys
      _deleteWater(idList)
    }
    setDeleteModel(true)
    setDeleteVisible(undefined)
    if (type === ONLY) {
      setDeleteValue({ value: id, type })
    }
    if (type === MULTI) {
      setDeleteValue({ value: selectedRowKeys, type })
    }
  }
  const openModel = (record?: WaterTableType, editType?: string) => {
    if (record) {
      setUpdateWater(record)
    }
    setControlModel({ visible: true, editType })
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const changeControl = (controlModel: ControlModel) => {
    setControlModel(controlModel)
    setUpdateWater(undefined)
  }
  const changeControlQuality = (controlModel: ControlModel) => {
    setControlModelQ(controlModel)
    setUpdateWaterQ(undefined)
  }
  const changeControlStorage = (controlModel: ControlModel) => {
    setControlModelS(controlModel)
    setUpdateWaterS(undefined)
  }
  const findWater = (waterArea?: string, waterType?: string) => {
    _getWaterByCondition(waterArea, waterType)
  }

  return (
    <div className='mycard'>
      {
        controlModel_quality?.visible && <CreateWaterQualityModel
          controlModel={controlModel_quality}
          changeControl={changeControlQuality}
          updateWaterQualityInfo={updateWaterQuality}
        />
      }
      {
        controlModel_storage?.visible && <CreateWaterStorageModel
          controlModel={controlModel_storage}
          changeControl={changeControlStorage}
          updateWaterStorageInfo={updateWaterStorage}
        />
      }
      {
        controlModel?.visible && <CreateWaterModel
          controlModel={controlModel}
          changeControl={changeControl}
          updateWaterInfo={updateWater}
          waterTypeList={waterTypeList}
        />
      }
      {
        !userRole.includes(UserRole.ADMIN) && <DeleteWaterModel
          deleteVisible={deleteModel}
          changeDeleteVisible={setDeleteModel}
          deleteValue={deleteValue}
          _deleteWaterList={_deleteWaterList}
          _deleteWaterByReason={_deleteWaterByReason}
        />
      }
      <Space style={{ marginBottom: 16 }}>
        <span className='searcher_title'>{t('Address')}</span>
        <Input value={waterArea} onChange={(e) => setWaterArea(e.target.value)} />
        <span className='searcher_title'>{t('Type')}</span>
        <Input value={waterType} onChange={(e) => setWaterType(e.target.value)} />
        <Button type="primary" icon={<SearchOutlined />} onClick={() => findWater()}>
          {t('Search')}
        </Button>
        <Button icon={<RestOutlined />} onClick={() => { setWaterArea(undefined); setWaterType(undefined); findWater() }}>
          {t('Reset')}
        </Button>
      </Space>
      <div style={{ marginBottom: 16 }}>
        <Space>
          <Button type="primary" onClick={() => openModel(undefined, CREATE_MODEL)} icon={<PlusOutlined />}>
            {t('AddWater')}
          </Button>
          <Button type="primary" onClick={() => showDeleteModel([], MULTI)} icon={<DeleteFilled />} danger>
            {t('BatchDelete')}
          </Button>
          <Button icon={<DownloadOutlined />} onClick={() => exportDataExcel('water')}>
            {t('Export')}
          </Button>
        </Space>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} scroll={{ y: 420 }} />
    </div >
  );
};

export default Water;