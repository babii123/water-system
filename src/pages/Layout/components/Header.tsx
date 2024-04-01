import { Breadcrumb, Badge, Avatar, Space, Divider } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4346841_x6js1441e5b.js',
});


const Header: React.FC = () => {
  const navigate = useNavigate()
  const clickAvatar = () => {
    navigate(`/user_center/${localStorage.getItem('userId')}`)
  }
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
        <Space align="center">
          <IconFont type='icon-zhongyingwenqiehuan-yingwen' style={{ fontSize: '30px' }} />
          <Divider type="vertical" style={{ columnGap: '0' }} />
          {/* 头像和消息 */}
          <Badge count={1}>
            <Avatar
              style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}
              icon={<UserOutlined />}
              onClick={() => clickAvatar()} />
          </Badge>
        </Space>
      </div>
    </div>
  )
}

export default Header;