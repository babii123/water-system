import ReactEcharts from "echarts-for-react"

const Pie: React.FC<{
  adminCount?: number
  engineerCount?: number
  searcherCount?: number
}> = (
  {
    adminCount,
    engineerCount,
    searcherCount
  }
) => {
  const getOption = () => {
    const option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: adminCount, name: 'admin' },
            { value: engineerCount, name: 'engineer' },
            { value: searcherCount, name: 'searcher' },
          ]
        }
      ]
    };
    return option;
  }
  return (
    <div style={{ width: '90%' }}>
      <ReactEcharts option={getOption()} />
    </div>
  )
}

export default Pie;