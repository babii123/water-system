import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRoles, changeMenuItems } from '../store/actions/userActions'
import { useEffect } from "react";
import { verifyLogin } from "../services/userRequest";

const menuData = {
  admin: ['dashboard', 'user_manage', 'user_center', 'water_plan/', 'water_plan', 'water_price', 'water_resource/', 'water_resource', 'water_type', 'water_storage', 'water_quality'],
  engineer: ['dashboard', 'user_center', 'water_plan/', 'water_plan', 'water_price', 'water_resource/', 'water_resource', 'water_type', 'water_storage', 'water_quality'],
  searcher: ['dashboard', 'user_center', 'water_plan/', 'water_plan', 'water_price', 'water_resource/', 'water_resource', 'water_type', 'water_storage', 'water_quality']
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
  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if (userId) {
      verifyLogin(userId).then(res => {
        if (res.data.length === 0) {
          navigate('/login')
        } else {
          // 初始化roles
          _setRoles(res.data)
          if (res.data.includes('admin')) {
            // 初始化menuItem
            _changeMenuItems(menuData.admin)
          } else {
            _changeMenuItems(menuData.engineer)
          }
        }
      }).catch(err => {
        navigate('/login')
      })
    } else {
      navigate('/login')
    }
  }, [])
  return children
};

export default AuthMiddleware