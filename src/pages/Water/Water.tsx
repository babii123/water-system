import React, { useEffect, useState } from 'react';
import { Button, Input, Popover, Space, Table, Tag, Tooltip } from 'antd';
import { ExclamationCircleTwoTone } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, PlusOutlined, DownloadOutlined, DeleteFilled, RestOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { CREATE_MODEL, ControlModel, UPDATE_MODEL, ONLY, MULTI } from '../../model/globalModel';
import { deleteWaterTypeList } from '../../store/actions/waterTypeActions';
import { WaterTableType } from '../../model/waterModel';
import { deleteWaterByReason, getWaterListByAPI, getWaterListByCondition } from '../../store/actions/waterActions';
import CreateWaterModel from './components/CreateWaterModel';
import DeleteWaterModel from './components/DeleteWaterModel';
import CreateWaterQualityModel from '../Quality/components/CreateWaterQualityModel';
import CreateWaterStorageModel from '../Storage/components/CreateWaterStorageModel';
import { WaterQualityTableType } from '../../model/waterQualityModel';
import { WaterStorageTableType } from '../../model/waterStorageModel';

const Water: React.FC = () => {
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
      title: 'ID',
      dataIndex: 'id',
      width: 50
    },
    {
      key: 'type',
      title: 'Type',
      dataIndex: 'type',
      width: 150
    },
    {
      key: 'waterName',
      title: 'Water Name',
      dataIndex: 'waterName',
      width: 150
    },
    {
      key: 'address',
      title: 'Address',
      dataIndex: 'address',
      width: 150
    },
    {
      key: 'description',
      title: 'Description',
      dataIndex: 'description',
      width: 400
    },
    {
      key: 'addTime',
      title: 'Add Time',
      dataIndex: 'addTime',
      width: 120
    },
    {
      key: 'addUser',
      title: 'Add User',
      dataIndex: 'addUser',
      width: 150,
      render: (_, record) => (
        <Tag color='#f50' key={record.id}>
          {record.addUser}
        </Tag>
      )
    },
    {
      key: 'checkUser',
      title: 'Check User',
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
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 350,
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => openModel(record, UPDATE_MODEL)}>Update</a>
          <Popover content={
            <>
              <div style={{ marginBottom: '5px' }}>
                <ExclamationCircleTwoTone twoToneColor='#faad14' style={{ marginRight: '5px' }} />
                <span>Are you sure delete this user</span>
              </div>
              <Button size='small' onClick={() => { setDeleteVisible(undefined) }} style={{ marginRight: '5px' }}>No</Button>
              <Button size='small' danger onClick={() => { showDeleteModel([record.id], ONLY) }}>Yes</Button>
            </>
          }
            trigger="focus"
            open={deleteVisible === record.id}
            onOpenChange={() => changeDeleteVisible(record.id)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popover>
          {/* 新建水量信息 */}
          <Tooltip placement="top" title='add storage info'>
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
              }>storage</Button>
          </Tooltip>
          {/* 新建水质信息 */}
          <Tooltip placement="top" title='add quality info' >
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
                  isDel: false,
                  delReason: ''
                })
              }
              }> quality</Button>
          </Tooltip>
        </Space >
      ),
    },
  ];

  useEffect(() => {
    _getWaterTypeListByAPI()
  }, [])

  const data = useSelector((state: any) => {
    return state.water.waterList
  })
  const dispatch = useDispatch()
  const _getWaterTypeListByAPI = () => {
    dispatch(getWaterListByAPI())
  }
  const _deleteWaterList = (idList: React.Key[]) => {
    dispatch(deleteWaterTypeList(idList))
  }
  const _deleteWaterByReason = (id: number, delReason: string) => {
    dispatch(deleteWaterByReason(id, delReason))
  }
  const _getWaterByCondition = (waterArea?: string, waterType?: string) => {
    dispatch(getWaterListByCondition(waterArea, waterType))
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
  const findWater = () => {
    _getWaterByCondition(waterArea, waterType)
  }

  return (
    <div className='mycard'>
      <CreateWaterQualityModel
        controlModel={controlModel_quality}
        changeControl={changeControlQuality}
        updateWaterQualityInfo={updateWaterQuality}
      />
      <CreateWaterStorageModel
        controlModel={controlModel_storage}
        changeControl={changeControlStorage}
        updateWaterStorageInfo={updateWaterStorage}
      />
      <CreateWaterModel
        controlModel={controlModel}
        changeControl={changeControl}
        updateWaterInfo={updateWater} />
      <DeleteWaterModel
        deleteVisible={deleteModel}
        changeDeleteVisible={setDeleteModel}
        deleteValue={deleteValue}
        _deleteWaterList={_deleteWaterList}
        _deleteWaterByReason={_deleteWaterByReason}
      />
      <Space style={{ marginBottom: 16 }}>
        <span className='searcher_title'>区域</span>
        <Input value={waterArea} onChange={(e) => setWaterArea(e.target.value)} />
        <span className='searcher_title'>类型</span>
        <Input value={waterType} onChange={(e) => setWaterType(e.target.value)} />
        <Button type="primary" icon={<SearchOutlined />} onClick={() => findWater()}>
          搜索
        </Button>
        <Button icon={<RestOutlined />}>
          重置
        </Button>
      </Space>
      <div style={{ marginBottom: 16 }}>
        <Space>
          <Button type="primary" onClick={() => openModel(undefined, CREATE_MODEL)} icon={<PlusOutlined />}>
            新增数据
          </Button>
          <Button type="primary" onClick={() => showDeleteModel([], MULTI)} icon={<DeleteFilled />} danger>
            批量删除
          </Button>
          <Button icon={<DownloadOutlined />}>
            导出所选
          </Button>
        </Space>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} scroll={{ y: 420 }} />
    </div>
  );
};

export default Water;