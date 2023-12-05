import { Breadcrumb, Badge, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <div className="header-box">
      <div className='header-breadcrumd'>
        {/* 面包屑 */}
        <Breadcrumb
          items={[
            {
              title: '供水计划',
            },
            {
              title: <Link to={''}>水价表</Link>,
            },
          ]}
        />
      </div>
      <div className='avatar'>
        {/* 头像和消息 */}
        <Badge count={1}>
          <Avatar style={{ backgroundColor: '#87d068' }} shape="square" icon={<UserOutlined />} />
        </Badge>
      </div>
    </div>
  )
}

export default Header;