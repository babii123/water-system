import { connect } from 'react-redux';
import LineChart from './components/LineChart';
import PieChart from './components/PieChart';
import DataCard from './components/DataCard';
import TimeLine from './components/TimeLine';
import LoginTable from './components/LoginTable';
import './Dashboard.css'
import BasicInfo from './components/BasicInfo';
import { useEffect, useState } from 'react';
import { getUserDashboard, userResultModel, getPlanDashboard, getWaterPriceDashboard, waterPriceResultModel, getWaterDashboard } from '../../services/dashboardRequest'

function Dashboard() {
  const [userData, setUserData] = useState<userResultModel>()
  const [waterCount, setWaterCount] = useState<number>()
  const [planCount, setPlanCount] = useState<number>()
  const [waterPrice, setWaterPrice] = useState<waterPriceResultModel>()

  useEffect(() => {
    getData()
    setInterval(() => {
      getData()
    }, 1000 * 30)
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
    getWaterPriceDashboard().then((res: any) => {
      if (res.code === 200) {
        setWaterPrice(res.data)
      }
    })
    getWaterDashboard().then(res => {
      if (res.code === 200) {
        setWaterCount(res.data)
      }
    })
    console.log(waterPrice?.basicPrices.valueOf());
  }
  const dataCardProps = [
    {
      title: '用水量',
      icon: 'icon-yewei',
      bgc: 'data-card-bgc1 margin-right',
      amount: 1004
    },
    {
      title: '水资源数',
      icon: 'icon-caozuo-heng',
      bgc: 'data-card-bgc2 margin-right',
      amount: waterCount
    },
    {
      title: '用户数',
      icon: 'icon-zhanyezhong',
      bgc: 'data-card-bgc3 margin-right',
      amount: userData?.allCount
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
          <BasicInfo
            waterCount={waterCount}
            userCount={userData?.allCount}
            planCount={planCount}
          />
          {/* 用水量折线图 */}
          <LineChart
            waterPrice={waterPrice}
          />
        </div>
        <div style={{ flex: 1 }} className='mycard'>
          {/* 水资源分类饼状图 */}
          <PieChart
            adminCount={userData?.adminCount}
            engineerCount={userData?.engineerCount}
            searcherCount={userData?.searcherCount}
          />
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
        <div style={{ flex: 1, overflowY: 'auto' }} className='mycard margin-right'>
          {/* 操作时间线 */}
          <TimeLine />
        </div>
        <div style={{ flex: 2 }} className='mycard'>
          {/* 登录用户表格 */}
          <LoginTable
            data={userData?.adminList}
          />
        </div>
      </div>
    </div>
  )
};
export default connect()(Dashboard);