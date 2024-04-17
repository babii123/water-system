import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
import { color } from 'echarts';

function getColor(str: string) {
  if (str.includes('新增')) {
    return 'green'
  } else if (str.includes('删除')) {
    return 'red'
  } else if (str.includes('修改')) {
    return '#cd4f93'
  } else if (str.includes('导出')) {
    return '#00CCFF'
  } else if (str.includes('导入')) {
    return '#fac858'
  } else {
    return '#6951ba'
  }
}

function getTimeLineData(data: []) {
  console.log(data);
  let res: any = []
  data && data.length > 0 && data.forEach((item: any) => {
    res.push({
      color: getColor(item.handle),
      children: (
        <>
          <p>{item.handle} - {item.time}</p>
          <p>{item.description}</p>
        </>
      )
    })
  })
  return res;
}

const TimeLine: React.FC<{ items: any }> = ({ items }) => (
  <Timeline
    items={getTimeLineData(items)}
  />
);

export default TimeLine;