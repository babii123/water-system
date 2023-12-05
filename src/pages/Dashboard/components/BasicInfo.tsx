const BasicInfo = () => {

  const basicInfoData = [
    {
      title: '1,234',
      description: 'export default BasicInfo'
    },
    {
      title: '1,234',
      description: 'export default BasicInfo'
    },
    {
      title: '1,234',
      description: 'export default BasicInfo'
    },
  ]

  return (
    <div className="basic-info">
      {
        basicInfoData.map((item, index) => {
          return (
            <div key={item.title} className="basic-info-box">
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