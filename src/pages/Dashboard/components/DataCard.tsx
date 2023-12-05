import { dataCard } from "../PropsModel";
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4346841_f0nzrdap367.js',
});
const DataCard: React.FC<{ data: dataCard }> = ({ data }) => {
  return (
    <div style={{ flex: 1 }} className={`data-card ${data.bgc}`}>
      <div className="data-card-title">{data.title}</div>
      <IconFont type={data.icon} className="data-card-icon" />
      <div className="data-card-data">{data.amount}</div>
    </div>
  )
}

export default DataCard;