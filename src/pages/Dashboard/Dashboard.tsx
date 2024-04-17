import { connect } from 'react-redux';
import LineChart from './components/LineChart';
import PieChart from './components/PieChart';
import DataCard from './components/DataCard';
import TimeLine from './components/TimeLine';
import QualityChart from './components/QualityChart';
import './Dashboard.css'
import { useEffect, useState } from 'react';
import { getUserDashboard, userResultModel, getPlanDashboard, getWaterPriceDashboard, waterPriceResultModel, getWaterDashboard, getHandleLog, getWaterTypeDashboard, getWaterYieldDashboard, getWaterQualityDashboard } from '../../services/dashboardRequest'

function Dashboard() {
  const [userData, setUserData] = useState<userResultModel>()
  const [waterCount, setWaterCount] = useState<number>()
  const [waterType, setWaterType] = useState<{ allCount: 0, typeArr: [] }>()
  const [waterQuality, setwaterQuality] = useState<[[]]>([[]])
  const [planCount, setPlanCount] = useState<number>()
  const [waterYield, setWaterYield] = useState<{ storageLine: [], supplyLine: [] }>({ storageLine: [], supplyLine: [] })
  const [handleLog, setHandleLog] = useState([]);

  useEffect(() => {
    getData();
  }, [])
  const getData = () => {
    getUserDashboard().then((res) => {
      if (res.code === 200) {
        setUserData(res.data)
      }
    })
    getPlanDashboard().then((res) => {
      if (res.code === 200) {
        setPlanCount(res.data)
      }
    })
    getWaterDashboard().then(res => {
      if (res.code === 200) {
        setWaterCount(res.data)
      }
    })
    getWaterTypeDashboard().then(res => {
      if (res.code === 200) {
        setWaterType(res.data)
      }
    })
    getWaterYieldDashboard().then(res => {
      if (res.code === 200) {
        setWaterYield(res.data)
      }
    })
    getWaterQualityDashboard().then(res => {
      console.log(res);
      if (res.code === 200) {
        setwaterQuality(res.data)
      }
    })
    getHandleLog().then(res => {
      if (res.code === 200) {
        setHandleLog(res.data);
      }
    })
  }
  const dataCardProps = [
    {
      title: '用户数',
      icon: 'icon-zhanyezhong',
      bgc: 'data-card-bgc1 margin-right',
      amount: userData?.allCount
    },
    {
      title: '水资源数',
      icon: 'icon-yewei',
      bgc: 'data-card-bgc2 margin-right',
      amount: waterCount
    },
    {
      title: '水资源类型数',
      icon: 'icon-caozuo-heng',
      bgc: 'data-card-bgc3 margin-right',
      amount: waterType?.allCount
    },
    {
      title: '供水计划数',
      icon: 'icon-jihua1',
      bgc: 'data-card-bgc4',
      amount: planCount
    },
  ]

  return (
    <div>
      <div style={{ height: '260px' }} className='flex margin-bottom'>
        <div style={{ flex: 3 }} className='mycard margin-right flex'>
          {/* 用水量折线图 */}
          <LineChart waterYield={waterYield} />
        </div>
        <div style={{ flex: 1 }} className='mycard'>
          {/* 水资源分类饼状图 */}
          <PieChart data={waterType?.typeArr} />
        </div>
      </div>
      <div style={{ display: 'flex', height: '73px' }} className='margin-bottom'>
        {
          dataCardProps.map((item, index) => {
            return (<DataCard data={item} key={item.title} />)
          })
        }
      </div>
      <div style={{ display: 'flex', height: '300px' }}>
        <div style={{ flex: 2, overflowY: 'auto' }} className='mycard margin-right'>
          {/* 操作时间线 */}
          <TimeLine items={handleLog} />
        </div>
        <div style={{ flex: 2 }} className='mycard'>
          {/* 登录用户表格 */}
          <QualityChart waterQuality={waterQuality} />
        </div>
      </div>
    </div>
  )
};
export default connect()(Dashboard);