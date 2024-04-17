import React, { useEffect, useState } from 'react';
import { Button, Input, Popover, Space, Table, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, DownloadOutlined, DeleteFilled, RestOutlined, QuestionCircleFilled } from '@ant-design/icons';
import { ControlModel, MULTI, ONLY, UPDATE_MODEL } from '../../model/globalModel';
import { WaterStorageTableType } from '../../model/tableModel';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWaterStorage, deleteWaterStorageByReason, deleteWaterStorageList, getWaterStorageByID, getWaterStorageListByAPI } from '../../store/actions/waterStorageActions';
import { ExclamationCircleTwoTone } from '@ant-design/icons'
import CreateWaterStorageModel from './components/CreateWaterStorageModel';
import DeleteWaterStorageModel from './components/DeleteWaterStorageModel';
import { useTranslation } from 'react-i18next';
import { exportDataExcel } from '../../services/globalRequest';
import { UserRole } from '../../store/actions/userActions';

function Storage() {
  const { t } = useTranslation();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [controlModel, setControlModel] = useState<ControlModel>()
  const [updateWaterStorage, setUpdateWaterStorage] = useState<WaterStorageTableType>()
  const [deleteVisible, setDeleteVisible] = useState<number>()
  const [deleteModel, setDeleteModel] = useState<boolean>()
  const [deleteValue, setDeleteValue] = useState<{ value: any, type: string }>()
  const [id, setID] = useState<number>()
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const columns: ColumnsType<WaterStorageTableType> = [
    {
      key: 'id',
      title: <>
        <span>ID</span>&nbsp;
        <Tooltip title="标红数据为普通用户删除数据" color='red'>
          <QuestionCircleFilled style={{ color: '#8a919f' }} />
        </Tooltip>
      </>,
      dataIndex: 'id',
      render: (_, record) => (
        <span style={{ color: record.isDel ? 'red' : '' }}>{record.id}</span>
      )
    },
    {
      key: 'resourceId',
      title: t('WaterID'),
      dataIndex: 'resourceId',
      render: (_, record) => (
        <span style={{ color: record.isDel ? 'red' : '' }}>{record.resourceId}</span>
      )
    },
    {
      key: 'addTime',
      title: t('AddTime'),
      dataIndex: 'addTime',
      render: (_, record) => (
        <span style={{ color: record.isDel ? 'red' : '' }}>{record.addTime?.toString()}</span>
      )
    },
    {
      key: 'addUser',
      title: t('AddUser'),
      dataIndex: 'addUser',
      render: (_, record) => (
        <span style={{ color: record.isDel ? 'red' : '' }}>{record.addUser}</span>
      )
    },
    {
      key: 'detectTime',
      title: t('DetectTime'),
      dataIndex: 'detectTime',
      render: (_, record) => (
        <span style={{ color: record.isDel ? 'red' : '' }}>{record.detectTime?.toString()}</span>
      )
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
      key: 'supply',
      title: t('Supply'),
      dataIndex: 'supply',
      render: (_, record) => (
        <span style={{ color: record.isDel ? 'red' : '' }}>{record.supply}</span>
      )
    },
    {
      key: 'storage',
      title: t('Storage'),
      dataIndex: 'storage',
      render: (_, record) => (
        <span style={{ color: record.isDel ? 'red' : '' }}>{record.storage}</span>
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
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => { openModel(record, UPDATE_MODEL) }}>{t("Update")}</a>
          <Popover content={
            <>
              <div style={{ marginBottom: '5px' }}>
                <ExclamationCircleTwoTone twoToneColor='#faad14' style={{ marginRight: '5px' }} />
                <span>{t('Are you sure delete this storage')}</span>
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

  useEffect(() => {
    _getWaterStorageListByAPI()
  }, [])
  const data = useSelector((state: any) => {
    return state.waterStorage.waterStorageList
  })
  const userRole = useSelector((state: any) => {
    return state.userInfo.roles
  })
  const dispatch = useDispatch()
  const _getWaterStorageListByAPI = () => {
    dispatch(getWaterStorageListByAPI())
  }
  const _deleteWaterStorageList = (idList: React.Key[], delReason: string) => {
    dispatch(deleteWaterStorageList(idList, delReason))
  }
  const _deleteWaterStorageByReason = (id: number, delReason: string) => {
    dispatch(deleteWaterStorageByReason(id, delReason))
  }
  // 彻底删除
  const _deleteWaterStorage = (idList: any) => {
    dispatch(deleteWaterStorage(idList))
  }
  const _getWaterStorageByID = (id: number) => {
    dispatch(getWaterStorageByID(id))
  }
  const changeDeleteVisible = (id?: number) => {
    setDeleteVisible(id)
  }
  const showDeleteModel = (id: number[], type: string) => {
    if (userRole.includes(UserRole.ADMIN)) {
      const idList = id && id.length > 0 ? id : selectedRowKeys
      _deleteWaterStorage(idList)
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
  const findStorage = (id?: number) => {
    if (id) {
      _getWaterStorageByID(id)
    } else {
      _getWaterStorageListByAPI()
    }
  }

  return (
    <>
      <CreateWaterStorageModel
        controlModel={controlModel}
        changeControl={changeControl}
        updateWaterStorageInfo={updateWaterStorage}
      />
      {
        !userRole.includes(UserRole.ADMIN) && <DeleteWaterStorageModel
          deleteVisible={deleteModel}
          changeDeleteVisible={setDeleteModel}
          deleteValue={deleteValue}
          _deleteWaterStorageList={_deleteWaterStorageList}
          _deleteWaterStorageByReason={_deleteWaterStorageByReason}
        />
      }
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
          <Button type="primary" icon={<SearchOutlined />} onClick={() => findStorage(id)}>
            {t('Search')}
          </Button>
          <Button icon={<RestOutlined />} onClick={() => { setID(undefined); findStorage() }}>
            {t('Reset')}
          </Button>
        </Space>
        <div style={{ marginBottom: 16 }}>
          <Space>
            <Button type="primary" icon={<DeleteFilled />} danger>
              {t('BatchDelete')}
            </Button>
            <Button icon={<DownloadOutlined />} onClick={() => exportDataExcel('waterStorage')}>
              {t('Export')}
            </Button>
          </Space>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} scroll={{ y: 420 }} />
      </div>
    </>

  );
};

export default Storage;