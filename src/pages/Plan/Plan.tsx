import React, { useEffect, useState } from 'react';
import { Button, Input, Popover, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, PlusOutlined, DownloadOutlined, DeleteFilled, RestOutlined, ExclamationCircleTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getPlanListByAPI, getPlanListByCondition } from '../../store/actions/planActions';
import { PlanTableType } from '../../model/planModel';
import { CREATE_MODEL, ControlModel, MULTI, ONLY, UPDATE_MODEL } from '../../model/globalModel';
import CreatePlanModel from './components/CreatePlanModel';
import dayjs from 'dayjs';
import { getWaterPriceListByAPI } from '../../store/actions/waterPriceActions';

function Plan() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [controlModel, setControlModel] = useState<ControlModel>()
  const [updatePlan, setUpdatePlan] = useState<PlanTableType | undefined>()
  const [deleteVisible, setDeleteVisible] = useState<number>()
  const [deleteModel, setDeleteModel] = useState<boolean>()
  const [deleteValue, setDeleteValue] = useState<{ value: any, type: string }>()
  const [waterArea, setWaterArea] = useState<string>()
  const [waterPriceType, setWaterPriceType] = useState<string>()

  const columns: ColumnsType<PlanTableType> = [
    {
      key: 'id',
      title: 'ID',
      dataIndex: 'id',
      width: 70
    },
    {
      key: 'addTime',
      title: 'Add Time',
      dataIndex: 'addTime',
      width: 150
    },
    {
      key: 'planTime',
      title: 'Plan Time',
      width: 300,
      render: (_, record) => {
        return (
          <>
            {record.startTime} --- {record.endTime}
          </>
        )
      }
    },
    {
      key: 'waterSources',
      title: 'Water Sources',
      dataIndex: 'waterSources',
      width: 200,
      render: (_, record) => {
        return (
          <>
            {
              record.waterSources.map((item) => {
                return <Tag color='#2db7f5' key={item}>{item}</Tag>
              })
            }
          </>
        )
      }
    },
    {
      key: 'waterArea',
      title: 'Water Area',
      dataIndex: 'waterArea',
      width: 150
    },
    {
      key: 'waterPriceType',
      title: 'Water Price Type',
      dataIndex: 'waterPriceType',
      width: 150
    },
    {
      key: 'description',
      title: 'Description',
      dataIndex: 'description',
      width: 400
    },
    {
      key: 'addUser',
      title: 'Add User',
      dataIndex: 'addUser',
      width: 150
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
    }
  ];
  const data = useSelector((state: any) => {
    return state.plan.planList
  })
  const waterPriceList = useSelector((state: any) => {
    return state.waterPrice.waterPriceList
  })
  const dispatch = useDispatch()
  const _getPlanListByAPI = () => {
    dispatch(getPlanListByAPI())
  }
  const _getWaterPriceListByAPI = () => {
    dispatch(getWaterPriceListByAPI())
  }
  const _getPlanByCondition = (waterArea?: string, waterPriceType?: string) => {
    dispatch(getPlanListByCondition(waterArea, waterPriceType))
  }
  useEffect(() => {
    _getPlanListByAPI()
    _getWaterPriceListByAPI()
  }, [])

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

  const openModel = (record?: PlanTableType, editType?: string) => {
    if (record) {
      setUpdatePlan({ ...record, startTime: dayjs(record?.startTime, 'YYYY-MM-DD'), endTime: dayjs(record?.endTime, 'YYYY-MM-DD') })
    } else {
      setUpdatePlan({
        key: undefined,
        id: 0,
        addTime: undefined,
        startTime: undefined,
        endTime: undefined,
        waterSources: [],
        waterArea: '',
        waterPriceType: '',
        description: '',
        addUser: '',
        isDel: false,
        delReason: ''
      })
    }
    setControlModel({ visible: true, editType })
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const changeControl = (controlModel: ControlModel) => {
    setControlModel(controlModel);
    setUpdatePlan(undefined);
  }
  const findPlan = () => {
    _getPlanByCondition(waterArea, waterPriceType)
  }

  return (
    <div className='mycard'>
      <CreatePlanModel
        controlModel={controlModel}
        changeControl={changeControl}
        updatePlanInfo={updatePlan}
        waterPriceList={waterPriceList}
      />
      <Space style={{ marginBottom: 16 }}>
        <span className='searcher_title'>用水区域</span>
        <Input value={waterArea} onChange={(e) => setWaterArea(e.target.value)} />
        <span className='searcher_title'>用水类型</span>
        <Input value={waterPriceType} onChange={(e) => setWaterPriceType(e.target.value)} />
        {/* <span className='searcher_title'>日期</span>
        <Input placeholder="Basic usage" /> */}
        <Button type="primary" icon={<SearchOutlined />} onClick={() => findPlan()}>
          搜索
        </Button>
        <Button icon={<RestOutlined />}>
          重置
        </Button>
      </Space>
      <div style={{ marginBottom: 16 }}>
        <Space>
          <Button type="primary" onClick={() => openModel(undefined, CREATE_MODEL)} icon={<PlusOutlined />}>
            新增计划
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

export default Plan;