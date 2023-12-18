import React, { useEffect, useState } from 'react';
import { Button, Input, Popover, Space, Table, Tag } from 'antd';
import { ExclamationCircleTwoTone } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, PlusOutlined, DownloadOutlined, DeleteFilled, RestOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { CREATE_MODEL, ControlModel, UPDATE_MODEL } from '../../model/globalModel';
import { deleteWaterType, deleteWaterTypeList } from '../../store/actions/waterTypeActions';
import { WaterDataType } from '../../model/waterModel';
import { deleteWater, deleteWaterByReason, getWaterListByAPI } from '../../store/actions/waterActions';
import CreateWaterModel from './components/CreateWaterModel';

const Water: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [controlModel, setControlModel] = useState<ControlModel>()
  const [updateWater, setUpdateWater] = useState<WaterDataType>()
  const [deleteVisible, setDeleteVisible] = useState<number>()

  const columns: ColumnsType<WaterDataType> = [
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
              <Button size='small' danger onClick={() => { _deleteWaterType(record.id, '') }}>Yes</Button>
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
  const changeDeleteVisible = (id: number) => {
    setDeleteVisible(id)
  }
  const data = useSelector((state: any) => {
    return state.water.waterList
  })
  const dispatch = useDispatch()
  const _getWaterTypeListByAPI = () => {
    dispatch(getWaterListByAPI())
  }
  const _deleteWaterType = (id: number, delReason: string) => {
    setDeleteVisible(undefined)
    dispatch(deleteWaterByReason(id, delReason))
  }
  const _deleteUserList = (idList: React.Key[]) => {
    dispatch(deleteWaterTypeList(idList))
  }
  useEffect(() => {
    _getWaterTypeListByAPI()
  }, [])

  const openModel = (record?: WaterDataType, editType?: string) => {
    console.log(record);
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

  return (
    <div className='mycard'>
      <CreateWaterModel
        controlModel={controlModel}
        changeControl={setControlModel}
        updateWaterInfo={updateWater} />
      <Space style={{ marginBottom: 16 }}>
        <span>区域</span>
        <Input placeholder="Basic usage" />
        <span>日期</span>
        <Input placeholder="Basic usage" />
        <Button type="primary" icon={<SearchOutlined />}>
          搜索
        </Button>
        <Button icon={<RestOutlined />}>
          重置
        </Button>
      </Space>
      <div style={{ marginBottom: 16 }}>
        <Space>
          <Button type="primary" onClick={() => openModel(undefined, CREATE_MODEL)}  icon={<PlusOutlined />}>
            新增数据
          </Button>
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
  );
};

export default Water;