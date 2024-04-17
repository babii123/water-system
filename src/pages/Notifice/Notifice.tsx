import React, { useEffect, useState } from 'react';
import type { CSSProperties } from 'react'
import { Badge, Collapse, Tooltip, theme } from 'antd';
import type { CollapseProps } from 'antd';
import { createFromIconfontCN, CaretRightOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './Notice.css'
import { getAllNotice_API, readNotice_API } from '../../services/noticeRequest';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4346841_j188fjl72wf.js',
});

interface NoticeModel {
  id: number;
  type: string;
  info: string;
  sendId: string;
  receiveId: string;
  time: Date;
  isRead: boolean;
}

function getLabel(type: string, time: Date) {
  const title = type === 'yield' ? '水量警告' : '水质警告';
  return `${title} - ${time}`;
}

function Notifice() {
  const { t } = useTranslation()
  // const [noticeData, setNoticeData] = useState<NoticeModel[]>([]);
  const [listData, setListData] = useState<CollapseProps['items']>()
  const panelStyle: React.CSSProperties = {
    marginBottom: '24px',
    background: '#fff',
    borderRadius: '4px',
    border: 'none',
  };
  const genExtra = () => (
    <Tooltip title={t('Send a message to the relevant responsible person')}>
      <IconFont
        type='icon-fasong'
        style={{ fontSize: '25px' }}
        onClick={(event) => {
          // If you don't want click extra trigger collapse, you can prevent this:
          event.stopPropagation();
        }}
      />
    </Tooltip>
  );

  let getItems: (panelStyle: CSSProperties, data: NoticeModel[]) => CollapseProps['items'] = (panelStyle, data) => {
    const arr = []
    for (const notice of data) {
      arr.push({
        key: notice.id,
        label: <><Badge dot={!notice.isRead} offset={[10, 0]}>{getLabel(notice.type, notice.time)}</Badge></>,
        children: <p>{notice.info}</p>,
        extra: genExtra(),
        style: panelStyle,
      })
    }
    console.log(data, arr);
    return arr;
  }
  const onChange = (key: string | string[]) => {
    for (const id of key){
      // 如果isRead是false
      readNotice_API(+id).then(res=>{
        if (res.code){
          _getAllNotice()
        }
      })
    }
  };
  const _getAllNotice = () => {
    const userId = localStorage.getItem('userId') as string;
    getAllNotice_API(userId).then(res => {
      console.log(res);
      if (res.code === 200) {
        // setNoticeData(res.data)
        setListData(getItems(panelStyle, res.data))
      }
    })
  }

  useEffect(() => {
    _getAllNotice();
  }, [])
  return (
    <div className='notice-box'>
      <Collapse
        bordered={false}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        items={listData}
        onChange={onChange}
      />
      
    </div>
  )
}

export default Notifice;