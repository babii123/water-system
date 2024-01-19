import React from "react";

const BasicInfo:React.FC<
  { userCount?: number, waterCount?: number, planCount?: number }
> = (
  { userCount, waterCount, planCount }
) => {

  const basicInfoData = [
    {
      key: 1,
      title: userCount,
      description: '用户数量'
    },
    {
      key: 2,
      title: waterCount,
      description: '水资源数量'
    },
    {
      key: 3,
      title: planCount,
      description: '供水计划数量'
    },
  ]

  return (
    <div className="basic-info">
      {
        basicInfoData.map((item, index) => {
          return (
            <div key={item.key} className="basic-info-box">
              <div className="basic-info-title">{item.title}</div>
              <span className="basic-info-description">{item.description}</span>
            </div>
          )
        })
      }
    </div>
  )
}

export default BasicInfo;