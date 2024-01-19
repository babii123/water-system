import ReactEcharts from "echarts-for-react"
// import echarts from "echarts";
import { waterPriceResultModel } from '../../../services/dashboardRequest'

const LineChart: React.FC<{ waterPrice?: waterPriceResultModel }> = ({ waterPrice }) => {
  const getOption = () => {
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['Email', 'Union Ads']
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
          data: ['生活', '工业企业', '行政事业', '经营服务', '特种行业']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'basicPrices',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [waterPrice?.basicPrices.生活用水, waterPrice?.basicPrices.工业企业用水, waterPrice?.basicPrices.行政事业用水, waterPrice?.basicPrices.经营服务用水, waterPrice?.basicPrices.特种行业用水]
        },
        {
          name: 'pollutionCosts',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [waterPrice?.pollutionCosts.生活用水, waterPrice?.pollutionCosts.工业企业用水, waterPrice?.pollutionCosts.行政事业用水, waterPrice?.pollutionCosts.经营服务用水, waterPrice?.pollutionCosts.特种行业用水]
        },
        {
          name: 'realPrices',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [waterPrice?.realPrices.生活用水, waterPrice?.realPrices.工业企业用水, waterPrice?.realPrices.行政事业用水, waterPrice?.realPrices.经营服务用水, waterPrice?.realPrices.特种行业用水]
        },
        {
          name: 'resourceCosts',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [waterPrice?.resourceCosts.生活用水, waterPrice?.resourceCosts.工业企业用水, waterPrice?.resourceCosts.行政事业用水, waterPrice?.resourceCosts.经营服务用水, waterPrice?.resourceCosts.特种行业用水]
        },
      ]
    };
    return option;
  }
  return (
    <div style={{ width: '80%' }}>
      <ReactEcharts option={getOption()} style={{ height: '240px' }} />
    </div>
  )
}

export default LineChart;