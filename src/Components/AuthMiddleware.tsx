import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRoles, changeMenuItems } from '../store/actions/userActions'

const menuData = {
  admin: ['dashboard', 'user_manage', 'user_center', 'water_plan/', 'water_type', 'water_storage', 'water_quality'],
  engineer: ['dashboard', 'user_center', 'water_plan/', 'water_type', 'water_storage', 'water_quality'],
  searcher: ['dashboard', 'user_center', 'water_plan/', 'water_type', 'water_storage', 'water_quality'],
}

const AuthMiddleware = ({ children }: { children: any }) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const _changeMenuItems = (menu: Array<string>) => {
    dispatch(changeMenuItems(menu))
  }
  const _setRoles = (roles: Array<string>) => {
    dispatch(setRoles(roles))
  }
  // useEffect(() => {
  //   const userId = localStorage.getItem('userId')
  //   // console.log(userId);
  //   if (userId) {
  //     verifyLogin(userId).then(res => {
  //       // console.log(res);
  //       if (res.data.length === 0) {
  //         navigate('/login')
  //       } else {
  //         // 初始化roles
  //         _setRoles(res.data)
  //         if (res.data.includes('admin')) {
  //           // 初始化menuItem
  //           _changeMenuItems(menuData.admin)
  //         } else {
  //           _changeMenuItems(menuData.engineer)
  //         }
  //       }
  //     }).catch(err => {
  //       console.log(err);
  //       navigate('/error/404')
  //     })
  //   } else {
  //     navigate('/login')
  //   }
  // }, [])
  return children
};

export default AuthMiddleware