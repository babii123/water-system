import ReactEcharts from "echarts-for-react"
import { waterPriceResultModel } from '../../../services/dashboardRequest'

/**
 * 展示水量信息的库存量，1-100，100-120，120-140，140-160，160-180亿立方千米
 * @param param0 
 * @returns 
 */
const LineChart: React.FC<{ waterYield: { storageLine: [], supplyLine: [] } }> = ({ waterYield }) => {
  const getOption = () => {
    const option = {
      title: {
        text: '水量展示图(x-(亿立方米)，y-(个))'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
      legend: {
        data: ['供水量', '库存量']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['1-100', '100-120', '120-140', '140-160', '160-180', '180-200', '大于200']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '库存量',
          type: 'line',
          smooth: true,
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: waterYield.storageLine
        },
        {
          name: '供水量',
          type: 'line',
          smooth: true,
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: waterYield.supplyLine
        }
      ]
    };
    return option;
  }
  return (
    <div style={{ width: '100%' }}>
      <ReactEcharts option={getOption()} style={{ height: '240px' }} />
    </div>
  )
}

export default LineChart;