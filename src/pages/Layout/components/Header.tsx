import { Breadcrumb, Badge, Avatar, Space, Divider, Dropdown, Menu } from 'antd'
import { UserOutlined, BellFilled } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { createFromIconfontCN } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { NoticeListModel } from '../../../model/tableModel';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4346841_j188fjl72wf.js',
});


const Header: React.FC<{ noticeList: NoticeListModel[] }> = ({ noticeList }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [lang, setLang] = useState('zh');
  const [noticeCount, setNoticeCount] = useState(0);
  useEffect(() => {
    const count = noticeList.filter(item => !item.isRead).length;
    setNoticeCount(count)
  }, [noticeList])
  const clickAvatar = () => {
    navigate(`/user_center/${localStorage.getItem('userId')}`)
  }
  const clickNotice = () => {
    navigate(`/notice`)
  }

  // 2.更改语言函数
  const changeLanguageFun = () => {
    const language = lang === 'zh' ? 'en' : 'zh';
    setLang(language);
    i18n.changeLanguage(language);
    // window.location.reload()
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <span onClick={() => clickAvatar()}>个人中心</span>
      </Menu.Item>
      <Menu.Item key="1">
        <span onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('userId'); }}>退出登录</span>
      </Menu.Item>
    </Menu>
  );

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
          {/* 头像和消息 */}
          <Badge count={noticeCount} size="small">
            <BellFilled
              onClick={() => clickNotice()}
              style={{ fontSize: '25px', color: '#8a919f' }}
            />
          </Badge>
          <Divider type="vertical" style={{ columnGap: '0' }} />
          <IconFont
            type='icon-zhongyingwenqiehuan-yingwen'
            style={{ fontSize: '30px' }}
            onClick={() => changeLanguageFun()}
          />
          <Divider type="vertical" style={{ columnGap: '0' }} />
          <Dropdown overlay={menu} trigger={['click']}>
            <Avatar
              style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}
              icon={<UserOutlined />}
              onClick={() => clickAvatar()} />
          </Dropdown>
        </Space>
      </div>
    </div>
  )
}

export default Header;