import React, { useEffect, useState } from 'react';
import { Button, Input, Popover, Space, Table, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, DownloadOutlined, DeleteFilled, RestOutlined, QuestionCircleFilled } from '@ant-design/icons';
import { ControlModel, MULTI, ONLY, UPDATE_MODEL } from '../../model/globalModel';
import { WaterQualityTableType } from '../../model/tableModel';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWaterQuality, deleteWaterQualityByReason, deleteWaterQualityList, getWaterQualityByID, getWaterQualityListByAPI } from '../../store/actions/waterQualityActions';
import { ExclamationCircleTwoTone } from '@ant-design/icons'
import CreateWaterQualityModel from './components/CreateWaterQualityModel';
import DeleteWaterQualityModel from './components/DeleteWaterQualityModel';
import { useTranslation } from 'react-i18next';
import { exportDataExcel } from '../../services/globalRequest';
import { UserRole } from '../../store/actions/userActions';
import { checkCyanin, checkFluoride, checkPH, checkTurbidity } from '../../utils/checkQuality';

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
      key: 'ph',
      title: <>
        {t('PH')}
        <Tooltip title="合格PH的范围：6.5<=PH<=8.5" color='red'>
          <QuestionCircleFilled style={{ color: '#8a919f' }} />
        </Tooltip>
      </>,
      dataIndex: 'ph',
      render: (_, record) => (
        <span style={{ color: record.isDel || !checkPH(record.ph) ? 'red' : '' }}>{record.ph}</span>
      )
    },
    {
      key: 'turbidity',
      title: <>
        {t('Turbidity')}
        <Tooltip title="合格浑浊度的范围：<=1NTU" color='red'>
          <QuestionCircleFilled style={{ color: '#8a919f' }} />
        </Tooltip>
      </>,
      dataIndex: 'turbidity',
      render: (_, record) => (
        <span style={{ color: record.isDel || !checkTurbidity(record.turbidity) ? 'red' : '' }}>{record.turbidity}</span>
      )
    },
    {
      key: 'fluoride',
      title: <>
        {t('Fluoride')}
        <Tooltip title="合格含氟量的范围：<=1mg/L" color='red'>
          <QuestionCircleFilled style={{ color: '#8a919f' }} />
        </Tooltip>
      </>,
      dataIndex: 'fluoride',
      render: (_, record) => (
        <span style={{ color: record.isDel || !checkFluoride(record.fluoride) ? 'red' : '' }}>{record.fluoride}</span>
      )
    },
    {
      key: 'cyanin',
      title: <>
        {t('Cyanin')}
        <Tooltip title="合格含氰量的范围：<=1mg/L" color='red'>
          <QuestionCircleFilled style={{ color: '#8a919f' }} />
        </Tooltip>
      </>,
      dataIndex: 'cyanin',
      render: (_, record) => (
        <span style={{ color: record.isDel || !checkCyanin(record.cyanin) ? 'red' : '' }}>{record.cyanin}</span>
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
      width: 150,
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
  const userRole = useSelector((state: any) => {
    return state.userInfo.roles
  })
  const dispatch = useDispatch()
  const _getWaterQualityListByAPI = () => {
    dispatch(getWaterQualityListByAPI())
  }
  // 批量删除
  const _deleteWaterQualityList = (idList: React.Key[], delReason: string) => {
    dispatch(deleteWaterQualityList(idList, delReason))
  }
  // 标记删除
  const _deleteWaterQualityByReason = (id: number, delReason: string) => {
    dispatch(deleteWaterQualityByReason(id, delReason))
  }
  // 彻底删除
  const _deleteWaterQuality = (idList: any) => {
    dispatch(deleteWaterQuality(idList))
  }
  const _getWaterQualityByID = (id: number) => {
    dispatch(getWaterQualityByID(id))
  }
  const changeDeleteVisible = (id: number) => {
    setDeleteVisible(id)
  }
  const showDeleteModel = (id: number[], type: string) => {
    if (userRole.includes(UserRole.ADMIN)) {
      const idList = id && id.length > 0 ? id : selectedRowKeys
      _deleteWaterQuality(idList)
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
      {
        !userRole.includes(UserRole.ADMIN) && <DeleteWaterQualityModel
          deleteVisible={deleteModel}
          changeDeleteVisible={setDeleteModel}
          deleteValue={deleteValue}
          _deleteWaterQualityList={_deleteWaterQualityList}
          _deleteWaterQualityByReason={_deleteWaterQualityByReason}
        />
      }
      <div className='mycard'>
        <Space style={{ marginBottom: 16 }}>
          <span className='searcher_title'>ID</span>
          <Input value={id} onChange={(e) => setID(parseInt(e.target.value))} />
          <Button type="primary" icon={<SearchOutlined />} onClick={() => findQuality(id)}>
            {t('Search')}
          </Button>
          <Button icon={<RestOutlined />} onClick={() => { setID(undefined); findQuality() }}>
            {t('Reset')}
          </Button>
        </Space>
        <div style={{ marginBottom: 16 }}>
          <Space>
            <Button type="primary" icon={<DeleteFilled />} danger onClick={() => { showDeleteModel([], MULTI) }}>
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