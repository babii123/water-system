import React, { useEffect, useState } from 'react';
import { Button, Input, Popover, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, DownloadOutlined, DeleteFilled, RestOutlined } from '@ant-design/icons';
import { ControlModel, MULTI, ONLY, UPDATE_MODEL } from '../../model/globalModel';
import { WaterStorageTableType } from '../../model/waterStorageModel';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWaterStorageByReason, deleteWaterStorageList, getWaterStorageListByAPI } from '../../store/actions/waterStorageActions';
import { ExclamationCircleTwoTone } from '@ant-design/icons'
import CreateWaterStorageModel from './components/CreateWaterStorageModel';
import DeleteWaterStorageModel from './components/DeleteWaterStorageModel';

function Storage() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [controlModel, setControlModel] = useState<ControlModel>()
  const [updateWaterStorage, setUpdateWaterStorage] = useState<WaterStorageTableType>()
  const [deleteVisible, setDeleteVisible] = useState<number>()
  const [deleteModel, setDeleteModel] = useState<boolean>()
  const [deleteValue, setDeleteValue] = useState<{ value: any, type: string }>()
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const columns: ColumnsType<WaterStorageTableType> = [
    {
      key: 'id',
      title: 'ID',
      dataIndex: 'id'
    },
    {
      key: 'resourceId',
      title: 'Water ID',
      dataIndex: 'resourceId'
    },
    {
      key: 'addTime',
      title: 'Add Time',
      dataIndex: 'addTime'
    },
    {
      key: 'addUser',
      title: 'Add User',
      dataIndex: 'addUser',
    },
    {
      key: 'detectTime',
      title: 'Detect Time',
      dataIndex: 'detectTime'
    },
    {
      key: 'detectPeople',
      title: 'Detect People',
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
      key: 'supply',
      title: 'Supply',
      dataIndex: 'supply'
    },
    {
      key: 'storage',
      title: 'Storage',
      dataIndex: 'storage'
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => { openModel(record, UPDATE_MODEL) }}>Update</a>
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
        </Space >
      ),
    },
  ];

  useEffect(() => {
    _getWaterStorageListByAPI()
  }, [])
  const data = useSelector((state: any) => {
    return state.waterStorage.waterStorageList
  })
  const dispatch = useDispatch()
  const _getWaterStorageListByAPI = () => {
    dispatch(getWaterStorageListByAPI())
  }
  const _deleteWaterStorageList = (idList: React.Key[]) => {
    dispatch(deleteWaterStorageList(idList))
  }
  const _deleteWaterStorageByReason = (id: number, delReason: string) => {
    dispatch(deleteWaterStorageByReason(id, delReason))
  }
  const changeDeleteVisible = (id?: number) => {
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
  const openModel = (record?: WaterStorageTableType, editType?: string) => {
    console.log(record);
    if (record) {
      setUpdateWaterStorage(record)
    }
    setControlModel({ visible: true, editType })
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const changeControl = (controlModel: ControlModel) => {
    setControlModel(controlModel)
    setUpdateWaterStorage(undefined)
  }

  return (
    <>
      <CreateWaterStorageModel
        controlModel={controlModel}
        changeControl={changeControl}
        updateWaterStorageInfo={updateWaterStorage}
      />
      <DeleteWaterStorageModel
        deleteVisible={deleteModel}
        changeDeleteVisible={setDeleteModel}
        deleteValue={deleteValue}
        _deleteWaterStorageList={_deleteWaterStorageList}
        _deleteWaterStorageByReason={_deleteWaterStorageByReason}
      />
      <div className='mycard'>
        <Space style={{ marginBottom: 16 }}>
          {/* <span>ID</span> */}
          <Input placeholder="ID" />
          {/* <span>水资源类型</span> */}
          <Input placeholder="水资源类型" />
          {/* <span>测量时间</span> */}
          <Input placeholder="测量时间" />
          {/* <span>测量人员</span> */}
          <Input placeholder="测量人员" />
          {/* <span>PH值</span> */}
          <Input placeholder="PH值" />
          {/* <span>浊度</span> */}
          <Input placeholder="浊度" />
          {/* <span>污染物水平</span> */}
          <Input placeholder="污染物水平" />
          <Button type="primary" icon={<SearchOutlined />}>
            搜索
          </Button>
          <Button icon={<RestOutlined />}>
            重置
          </Button>
        </Space>
        <div style={{ marginBottom: 16 }}>
          <Space>
            <Button type="primary" icon={<DeleteFilled />} danger>
              批量删除
            </Button>
            <Button icon={<DownloadOutlined />}>
              导出所选
            </Button>
          </Space>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} scroll={{ y: 420 }} />
      </div>
    </>

  );
};

export default Storage;