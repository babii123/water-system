import { connect } from 'react-redux';
import LineChart from './components/LineChart';
import PieChart from './components/PieChart';
import DataCard from './components/DataCard';
import TimeLine from './components/TimeLine';
import LoginTable from './components/LoginTable';
import './Dashboard.css'
import BasicInfo from './components/BasicInfo';

function Dashboard() {

  const dataCardProps = [
    {
      title: '用水量',
      icon: 'icon-yewei',
      bgc: 'data-card-bgc1 margin-right',
      amount: 0
    },
    {
      title: '操作数',
      icon: 'icon-caozuo-heng',
      bgc: 'data-card-bgc2 margin-right',
      amount: 0
    },
    {
      title: '登录用户数',
      icon: 'icon-zhanyezhong',
      bgc: 'data-card-bgc3 margin-right',
      amount: 0
    },
    {
      title: '供水计划数',
      icon: 'icon-jihua1',
      bgc: 'data-card-bgc4',
      amount: 0
    },
  ]

  return (
    <div>
      <div style={{ height: '260px' }} className='flex margin-bottom'>
        <div style={{ flex: 3 }} className='mycard margin-right flex'>
          <BasicInfo />
          {/* 用水量折线图 */}
          <LineChart />
        </div>
        <div style={{ flex: 1 }} className='mycard'>
          {/* 水资源分类饼状图 */}
          <PieChart />
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
        <div style={{ flex: 1,overflowY: 'auto' }} className='mycard margin-right'>
          {/* 操作时间线 */}
          <TimeLine />
        </div>
        <div style={{ flex: 2 }} className='mycard'>
          {/* 登录用户表格 */}
          <LoginTable />
        </div>
      </div>
    </div>
  )
};
export default connect()(Dashboard);