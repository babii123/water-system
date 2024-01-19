import { createFromIconfontCN } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import '../Layout.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ItemType } from 'antd/es/menu/hooks/useItems';

type MenuItem = Required<MenuProps>['items'][number];

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4346841_dyrsmlbo016.js',
});

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}


const items: MenuProps['items'] = [
  getItem('工作台', 'dashboard', <IconFont type='icon-gongzuotai' />),
  {
    type: 'divider',
  },
  getItem('用户管理', 'user_manage', <IconFont type='icon-yonghuguanli' />),
  getItem('个人中心', 'user_center', <IconFont type='icon-gerenzhongxin' />),
  {
    type: 'divider',
  },
  getItem('供水计划', 'water_plan/', <IconFont type='icon-jihua' />, [
    getItem('供水计划管理', 'water_plan'),
    getItem('水价表', 'water_price'),
  ]),
  {
    type: 'divider',
  },
  getItem('水资源', 'water_resource/', <IconFont type='icon-ziyuan-xianxing' />, [
    getItem('水资源管理', 'water_resource'),
    getItem('水资源类型管理', 'water_type'),
  ]),
  getItem('水量管理', 'water_storage', <IconFont type='icon-shuiliang' />),
  getItem('水质管理', 'water_quality', <IconFont type='icon-zhiliang-xianxing' />),
];

const SideBar: React.FC = () => {

  const [menuList, setMenuList] = useState<ItemType[] | undefined>();
  const menuItems = useSelector((state: any) => {
    return state.userInfo.menuItems
  })

  const location = useLocation()
  const getSelectedKeys = () => {
    const pathname = location.pathname.slice(1)
    if (pathname.startsWith('user_center')) {
      return 'user_center'
    } else if (pathname === '') {
      return 'dashboard'
    } else {
      return pathname
    }
  }
  const selectedKeys = getSelectedKeys()

  useEffect(() => {
    const filter_res = items.filter((item) => menuItems.includes(String(item?.key)))
    setMenuList(filter_res)
  }, [menuItems])

  const navigate = useNavigate()
  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'user_center') {
      navigate(`/${e.key}/${localStorage.getItem('userId')}`)
    }
    navigate(`/${e.key}`)
  };

  return (
    <>
      <div className='title'>水资源管理系统</div>
      <Menu
        onClick={onClick}
        style={{
          width: 256,
          maxHeight: 725,
          color: '#fff',
          backgroundColor: 'rgb(127, 168, 215)'
        }}
        defaultSelectedKeys={['dashboard']}
        selectedKeys={[selectedKeys]}
        defaultOpenKeys={['water_plan/', 'water_resource/']}
        mode="inline"
        items={menuList}
      />
    </>
  );
};

export default SideBar;