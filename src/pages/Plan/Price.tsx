import { Card } from "antd";
import PriceTable from "./components/PriceTable";
import './Price.css'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getWaterPriceListByAPI } from "../../store/actions/waterPriceActions";

const { Meta } = Card;

function Price() {
  const data = useSelector((state: any) => {
    return state.waterPrice.waterPriceList
  })
  const dispatch = useDispatch()
  const _getWaterPriceListByAPI = () => {
    dispatch(getWaterPriceListByAPI())
  }
  useEffect(()=>{
    _getWaterPriceListByAPI()
  },[])
  return (
    <div>
      {/* 水价表 */}
      <div className="my-card margin-bottom">
        <PriceTable data={data}/>
      </div>

      {/* 水价依赖政策 */}
      <div className="flex">
        <div className="mycard margin-right price-update">
          <div className="price-update-title">
            修改日志
          </div>
          {/* <div style={{width:'100%', height: '1px', transform: 'scale(0.5)',backgroundColor:'#ccc' }}></div> */}
          <div className="price-update-content">
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </div>
        </div>
        <div className="mycard price-update">
          <div className="price-update-title">
            政策支持
          </div>
          <div className="price-update-content">
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </div>
        </div>
      </div>
      {/* 水价更改公告 */}
    </div>
  )
}

export default Price;