import ReactEcharts from "echarts-for-react"
import { waterPriceResultModel } from '../../../services/dashboardRequest'

/**
 * 展示水质标准
 * @param param0 
 * @returns 
 */
const QualityChart: React.FC<{ waterQuality: [[]] }> = ({ waterQuality }) => {
  // There should not be negative values in rawData
  const rawData = waterQuality;
  const totalData: number[] = [];
  for (let i = 0; i < rawData[0].length; ++i) {
    let sum = 0;
    for (let j = 0; j < rawData.length; ++j) {
      sum += rawData[j][i];
    }
    totalData.push(sum);
  }

  const grid = {
    left: 40,
    right: 40,
    top: 50,
    bottom: 30
  };

  const series: echarts.BarSeriesOption[] = ['合格', '不合格'].map((name, sid) => {
    return {
      name,
      type: 'bar',
      stack: 'total',
      barWidth: '60%',
      label: {
        show: true,
        formatter: (params: any) => Math.round(params.value * 1000) / 10 + '%'
      },
      data: rawData[sid] && rawData[sid].map((d, did) =>
        totalData[did] <= 0 ? 0 : d / totalData[did]
      )
    };
  });

  const getOption = () => {
    const option = {
      title: {
        text: '水质展示图'
      },
      legend: {
        selectedMode: false
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid,
      yAxis: {
        type: 'value'
      },
      xAxis: {
        type: 'category',
        data: ['PH', '含氟量', '浑浊度', '含氟量']
      },
      series
    };
    return option;
  }

  return (
    <div style={{ width: '100%' }}>
      <ReactEcharts option={getOption()} style={{ height: '240px' }} />
    </div>
  )
}

export default QualityChart;