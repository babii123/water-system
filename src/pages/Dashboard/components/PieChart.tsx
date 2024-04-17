import ReactEcharts from "echarts-for-react"

/**
 * 展示各种水资源类型的水资源数量
 * @param param0 
 * @returns 
 */
const PieChart: React.FC<{ data?: [] }> = ({ data }) => {
  const getOption = () => {
    const option = {
      title: {
        text: '水资源类型统计图'
      },
      tooltip: {
        trigger: 'item'
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      series: [
        {
          name: '名称',
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
          data
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

export default PieChart;