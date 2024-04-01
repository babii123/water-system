import { createFromIconfontCN } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import '../Layout.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { useTranslation } from 'react-i18next';

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


const SideBar: React.FC = () => {
  const { t } = useTranslation();
  const items: MenuProps['items'] = [
    getItem(t('dashboard'), 'dashboard', <IconFont type='icon-gongzuotai' />),
    {
      type: 'divider',
    },
    getItem(t('userManage'), 'user_manage', <IconFont type='icon-yonghuguanli' />),
    getItem(t('userCenter'), 'user_center', <IconFont type='icon-gerenzhongxin' />),
    {
      type: 'divider',
    },
    getItem(t('waterPlan'), 'water_plan/', <IconFont type='icon-jihua' />, [
      getItem(t('waterPlanManage'), 'water_plan'),
      getItem(t('waterPriceTable'), 'water_price'),
    ]),
    {
      type: 'divider',
    },
    getItem(t('WaterSources'), 'water_resource/', <IconFont type='icon-ziyuan-xianxing' />, [
      getItem(t('waterSourcesManage'), 'water_resource'),
      getItem(t('waterTypeManage'), 'water_type'),
    ]),
    getItem(t('waterStorageManage'), 'water_storage', <IconFont type='icon-shuiliang' />),
    getItem(t('waterQualityManage'), 'water_quality', <IconFont type='icon-zhiliang-xianxing' />),
  ];
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
      <div className='title'>{t('Water Resources Management System')}</div>
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