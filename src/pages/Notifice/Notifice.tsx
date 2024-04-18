import React, { useEffect, useState } from 'react';
import type { CSSProperties } from 'react'
import { Badge, Collapse, Tooltip } from 'antd';
import type { CollapseProps } from 'antd';
import { createFromIconfontCN, CaretRightOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './Notice.css'
import { NoticeListModel } from '../../model/tableModel';
import { useDispatch, useSelector } from 'react-redux';
import { getNoticeListByAPI, updateNotice } from '../../store/actions/noticeAction';
import SendEmailModal from './components/SendEmailModal';
import { UserRole } from '../../store/actions/userActions';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4346841_j188fjl72wf.js',
});

function getLabel(type: string, time: Date) {
  const title = type === 'yield' ? '水量警告' : '水质警告';
  return `${title} - ${time}`;
}

function Notifice() {
  const { t } = useTranslation()
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [notice, setNotice] = useState<NoticeListModel>();
  const userRole = useSelector((state: any) => {
    return state.userInfo.roles
  })
  const panelStyle: React.CSSProperties = {
    marginBottom: '24px',
    background: '#fff',
    borderRadius: '4px',
    border: 'none',
  };
  const genExtra = (notice: any) => (
    <Tooltip title={t('Send a message to the relevant responsible person')}>
      <IconFont
        type='icon-fasong'
        style={{ fontSize: '25px' }}
        onClick={(event) => {
          setModalVisible(true);
          setNotice(notice);
          // If you don't want click extra trigger collapse, you can prevent this:
          event.stopPropagation();
        }}
      />
    </Tooltip>
  );
  let getItems: (panelStyle: CSSProperties, data: NoticeListModel[]) => CollapseProps['items'] = (panelStyle, data) => {
    const arr = []
    for (const notice of data) {
      arr.push({
        key: notice.id,
        label: <><Badge dot={!notice.isRead} offset={[10, 0]}>{getLabel(notice.type, notice.time)}</Badge></>,
        children: <p>{notice.info}</p>,
        extra: userRole.includes(UserRole.ADMIN)  ? genExtra(notice) : null,
        style: panelStyle,
      })
    }
    return arr;
  }

  const data = useSelector((state: any) => {
    return getItems(panelStyle, state.notice.noticeList)
  })
  const dispatch = useDispatch();
  const _getNoticeListByAPI = () => {
    dispatch(getNoticeListByAPI())
  }
  const _updateNotice = (id: number) => {
    dispatch(updateNotice(id))
  }
  const onChange = (key: string | string[]) => {
    for (const id of key) {
      _updateNotice(+id);
    }
  };
  useEffect(() => {
    _getNoticeListByAPI();
  }, [])
  return (
    <>
      {
        modalVisible && <SendEmailModal notice={notice} changeControl={() => setModalVisible(false)} visible={modalVisible} />
      }
      <div className='notice-box'>
        <Collapse
          bordered={false}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          items={data}
          onChange={onChange}
        />
      </div>
    </>
  )
}

export default Notifice;