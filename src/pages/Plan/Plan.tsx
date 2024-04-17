import React, { useEffect, useState } from 'react';
import { Button, Input, Popover, Space, Table, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, PlusOutlined, DownloadOutlined, DeleteFilled, RestOutlined, ExclamationCircleTwoTone, QuestionCircleFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { deletePlan, deletePlanByReason, deletePlanList, getPlanListByAPI, getPlanListByCondition } from '../../store/actions/planActions';
import { PlanTableType } from '../../model/tableModel';
import { CREATE_MODEL, ControlModel, MULTI, ONLY, UPDATE_MODEL } from '../../model/globalModel';
import CreatePlanModel from './components/CreatePlanModel';
import dayjs from 'dayjs';
import { getWaterPriceListByAPI } from '../../store/actions/waterPriceActions';
import { useTranslation } from 'react-i18next';
import { exportDataExcel } from '../../services/globalRequest';
import DeletePlanModel from './components/DeletePlanModel';
import { UserRole } from '../../store/actions/userActions';
import { getWaterListByAPI } from '../../store/actions/waterActions';

function Plan() {
  const { t } = useTranslation();
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
      title: <>
        <span>ID</span>&nbsp;
        <Tooltip title="标红数据为普通用户删除数据" color='red'>
          <QuestionCircleFilled style={{ color: '#8a919f' }} />
        </Tooltip>
      </>,
      width: 70,
      dataIndex: 'id',
      render: (_, record) => (
        <span style={{ color: record.isDel ? 'red' : '' }}>{record.id}</span>
      )
    },
    {
      key: 'addTime',
      title: t('AddTime'),
      dataIndex: 'addTime',
      width: 150,
      render: (_, record) => (
        <span style={{ color: record.isDel ? 'red' : '' }}>{record.addTime.toString()}</span>
      )
    },
    {
      key: 'planTime',
      title: t('PlanTime'),
      width: 300,
      render: (_, record) => {
        return (
          <span style={{ color: record.isDel ? 'red' : '' }}>
            {record.startTime} --- {record.endTime}
          </span>
        )
      }
    },
    {
      key: 'waterSources',
      title: t('WaterSources'),
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
      title: t('WaterArea'),
      dataIndex: 'waterArea',
      width: 150,
      render: (_, record) => (
        <span style={{ color: record.isDel ? 'red' : '' }}>{record.waterArea}</span>
      )
    },
    {
      key: 'waterPriceType',
      title: t('WaterPriceType'),
      dataIndex: 'waterPriceType',
      width: 150,
      render: (_, record) => (
        <span style={{ color: record.isDel ? 'red' : '' }}>{record.waterPriceType}</span>
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
      key: 'addUser',
      title: t('addUser'),
      dataIndex: 'addUser',
      width: 150,
      render: (_, record) => (
        <span style={{ color: record.isDel ? 'red' : '' }}>{record.addUser}</span>
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
                <span>{t("Are you sure delete this plan")}</span>
              </div>
              <Button size='small' onClick={() => { setDeleteVisible(undefined) }} style={{ marginRight: '5px' }}>{t('No')}</Button>
              <Button size='small' danger onClick={() => { showDeleteModel([record.id], ONLY) }}>{t('Yes')}</Button>
            </>
          }
            trigger="focus"
            open={deleteVisible === record.id}
            onOpenChange={() => changeDeleteVisible(record.id)}
          >
            <Button type="link" danger>
              {t('Delete')}
            </Button>
          </Popover>
        </Space >
      ),
    }
  ];
  const data = useSelector((state: any) => {
    return state.plan.planList
  })
  const userRole = useSelector((state: any) => {
    return state.userInfo.roles
  })
  // 获取水资源water，新增计划时选择
  const waterList = useSelector((state: any) => {
    return state.water.waterList;
  })
  const waterPriceList = useSelector((state: any) => {
    return state.waterPrice.waterPriceList
  })
  const dispatch = useDispatch()
  const _getPlanListByAPI = () => {
    dispatch(getPlanListByAPI())
  }
  const _getWaterListByAPI = () => {
    dispatch(getWaterListByAPI())
  }
  const _deletePlanList = (idList: React.Key[], delReason: string) => {
    dispatch(deletePlanList(idList, delReason))
  }
  const _deletePlanByReason = (id: number, delReason: string) => {
    dispatch(deletePlanByReason(id, delReason))
  }
  // 彻底删除
  const _deletePlan = (idList: any) => {
    dispatch(deletePlan(idList))
  }
  const _getWaterPriceListByAPI = () => {
    dispatch(getWaterPriceListByAPI())
  }
  const _getPlanByCondition = (waterArea?: string, waterPriceType?: string) => {
    dispatch(getPlanListByCondition(waterArea, waterPriceType))
  }
  useEffect(() => {
    _getPlanListByAPI();
    _getWaterPriceListByAPI();
    _getWaterListByAPI();
  }, [])

  const changeDeleteVisible = (id: number) => {
    setDeleteVisible(id)
  }

  const showDeleteModel = (id: number[], type: string) => {
    if (userRole.includes(UserRole.ADMIN)) {
      const idList = id && id.length > 0 ? id : selectedRowKeys
      _deletePlan(idList)
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
  const findPlan = (waterArea?: string, waterPriceType?: string) => {
    _getPlanByCondition(waterArea, waterPriceType)
  }

  return (
    <div className='mycard'>
      <CreatePlanModel
        controlModel={controlModel}
        changeControl={changeControl}
        updatePlanInfo={updatePlan}
        waterPriceList={waterPriceList}
        waterList={waterList}
      />
      {
        !userRole.includes(UserRole.ADMIN) && <DeletePlanModel
          deleteVisible={deleteModel}
          changeDeleteVisible={setDeleteModel}
          deleteValue={deleteValue}
          _deletePlanList={_deletePlanList}
          _deletePlanByReason={_deletePlanByReason}
        />
      }
      <Space style={{ marginBottom: 16 }}>
        <span className='searcher_title'>{t('SupplyArea')}</span>
        <Input value={waterArea} onChange={(e) => setWaterArea(e.target.value)} />
        <span className='searcher_title'>{t('SupplyType')}</span>
        <Input value={waterPriceType} onChange={(e) => setWaterPriceType(e.target.value)} />
        {/* <span className='searcher_title'>日期</span>
        <Input placeholder="Basic usage" /> */}
        <Button type="primary" icon={<SearchOutlined />} onClick={() => findPlan(waterArea, waterPriceType)}>
          {t('Search')}
        </Button>
        <Button icon={<RestOutlined />} onClick={() => { setWaterArea(undefined); setWaterPriceType(undefined); findPlan() }}>
          {t('Reset')}
        </Button>
      </Space>
      <div style={{ marginBottom: 16 }}>
        <Space>
          <Button type="primary" onClick={() => openModel(undefined, CREATE_MODEL)} icon={<PlusOutlined />}>
            {t('AddPlan')}
          </Button>
          <Button type="primary" onClick={() => showDeleteModel([], MULTI)} icon={<DeleteFilled />} danger>
            {t('BatchDelete')}
          </Button>
          <Button icon={<DownloadOutlined />} onClick={() => exportDataExcel('supplyPlan')}>
            {t('Export')}
          </Button>
        </Space>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} scroll={{ y: 420 }} />
    </div>
  );
};

export default Plan;