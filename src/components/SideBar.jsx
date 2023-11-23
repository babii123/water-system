import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Typography } from 'antd';
const { Title } = Typography
function getItem(label, key, icon, children, type) {
      return {
            key,
            icon,
            children,
            label,
            type,
      };
}
const items = [
      getItem('工作台', 'sub1', <MailOutlined />),
      getItem('供水计划', 'sub2', <AppstoreOutlined />),
      {
            type: 'divider',
      },
      getItem('水资源', 'sub4'),
      getItem('水量', 'grp'),
];
const SideBar = () => {
      const onClick = (e) => {
            
      };
      return (
            <>
                  <Title level={3}>水资源信息管理系统</Title>
                  <Menu
                        onClick={onClick}
                        style={{
                              width: 256,
                              maxHeight: 725,
                              backgroundColor: '#fff'
                        }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        items={items}
                  />
            </>
      );
};
export default SideBar;