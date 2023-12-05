import { createFromIconfontCN } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import '../Layout.css'
import { useNavigate } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number];

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4346841_f0nzrdap367.js',
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
  getItem('供水计划', 'water_plan', <IconFont type='icon-jihua' />, [
    getItem('供水计划管理', 'water_plan'),
    getItem('水价表', 'water_price'),
  ]),
  {
    type: 'divider',
  },
  getItem('水资源管理', 'water_type', <IconFont type='icon-ziyuan-xianxing' />),
  getItem('水量管理', 'water_storage', <IconFont type='icon-shuiliang' />),
  getItem('水质管理', 'water_quality', <IconFont type='icon-zhiliang-xianxing' />),
];

const SideBar: React.FC = () => {
  const navigate = useNavigate()
  const onClick: MenuProps['onClick'] = (e) => {
    navigate(`/${e.key}`)
    // console.log('click ', e);
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
        defaultOpenKeys={['water_plan']}
        mode="inline"
        items={items}
      />
    </>
  );
};

export default SideBar;