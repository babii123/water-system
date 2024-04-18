import { useParams } from "react-router-dom";
import { Button, DatePicker, Descriptions, Input, Select, Tag, } from 'antd';
import type { DescriptionsProps } from 'antd';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserInfo } from "../../model/userInfoModel"
import { UserRole, updateUserInfo, updateUserInfoToServer } from "../../store/actions/userActions";
import dayjs from "dayjs";
import { getBasicInfo } from "../../services/userRequest";
import './Center.css'
import UpdatePsModel from "./components/UpdatePsModel";
import { useTranslation } from "react-i18next";

function Center() {
  const { t } = useTranslation();
  const { userId } = useParams()
  const [userInfo, setUserInfo] = useState<any>({
    "id": 0,
    "userId": "",
    "email": "",
    "realName": "",
    "accountName": "",
    "phone": "",
    "sex": 1,
    "birthday": undefined,
    "roles": []
  })
  const [currentKey, setCurrentKey] = useState<string>()
  const [modelVisible, setModelVisible] = useState<boolean>()
  const dispatch = useDispatch()
  const _updateUserInfoToServer = (userInfo: UserInfo) => {
    if (userInfo) {
      dispatch(updateUserInfoToServer(userInfo))
    }
  }
  const _updateUserInfo = (userInfo: UserInfo) => {
    dispatch(updateUserInfo(userInfo))
  }
  const userInfo1: UserInfo = useSelector((state: any) => {
    return state.userInfo.userInfo
  })
  const roles = useSelector((state: any) => {
    return state.userInfo.roles
  })
  const inputBlur = () => {
    setCurrentKey('')
    _updateUserInfoToServer(userInfo)
  }
  
  useEffect(() => {
    setUserInfo(userInfo1)
  }, [userInfo1])
  useEffect(() => {
    if (localStorage.getItem('userId')) {
      getBasicInfo(localStorage.getItem('userId') || '').then(res => {
        _updateUserInfo(res.data)
      })
    }
  }, [])
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: t('RealName'),
      children: (
        <>
          {
            currentKey === '1'
              ?
              <Input
                autoFocus
                onBlur={() => inputBlur()}
                style={{ width: '100px' }}
                value={userInfo.realName}
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    realName: e.target.value
                  })
                }}
              />
              :
              <div onClick={() => setCurrentKey('1')}>{userInfo.realName}</div>
          }
        </>
      ),
      span: 2
    },
    {
      key: '2',
      label: t('AccountName'),
      children: (
        <>
          {
            currentKey === '2'
              ?
              <Input
                onBlur={() => inputBlur()}
                autoFocus
                style={{ width: '100px' }}
                value={userInfo.accountName}
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    accountName: e.target.value
                  })
                }}
              />
              :
              <div onClick={() => setCurrentKey('2')}>{userInfo.accountName}</div>
          }
        </>
      ),
    },
    {
      key: '3',
      label: t('Sex'),
      children: (
        <>
          {
            currentKey === '3'
              ?
              <Select
                placeholder="select your gender"
                defaultValue={userInfo.sex}
                onBlur={() => inputBlur()}
                onChange={(value) => {
                  setUserInfo({
                    ...userInfo,
                    sex: value
                  })
                }}
                options={[
                  {
                    label: t('male'),
                    value: 1
                  },
                  {
                    label: t('female'),
                    value: 2
                  }
                ]}
              />
              :
              <div onClick={() => setCurrentKey('3')}>{userInfo?.sex === 1 ? '男' : '女'}</div>
          }
        </>
      ),
    },
    {
      key: '4',
      label: t('Phone'),
      children: (
        <>
          {
            currentKey === '4'
              ?
              <Input
                onBlur={() => inputBlur()}
                autoFocus
                style={{ width: '150px' }}
                value={userInfo.phone}
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    phone: e.target.value
                  })
                }}
              />
              :
              <div onClick={() => setCurrentKey('4')}>{userInfo?.phone}</div>
          }
        </>
      ),
    },
    {
      key: '5',
      label: t('Email'),
      children: (
        <>
          {
            currentKey === '5'
              ?
              <Input
                onBlur={() => inputBlur()}
                autoFocus
                style={{ width: '200px' }}
                value={userInfo.email}
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    email: e.target.value
                  })
                }}
              />
              :
              <div onClick={() => setCurrentKey('5')}>{userInfo?.email}</div>
          }
        </>
      ),
      span: 2,
    },
    {
      key: '6',
      label: t('Birthday'),
      children: (
        <>
          {
            currentKey === '6'
              ?
              <DatePicker
                onBlur={() => inputBlur()}
                style={{ width: '100%' }}
                format="YYYY-MM-DD"
                onChange={(date: any, dateString: string) => {
                  setUserInfo({
                    ...userInfo,
                    birthday: dateString
                  })
                }}
              />
              :
              <div onClick={() => setCurrentKey('6')}>{dayjs(userInfo?.birthday).format('YYYY-MM-DD')}</div>
          }
        </>
      ),
      span: 3,
    },
    {
      key: '7',
      label: t('Roles'),
      children: (
        roles.map((role: string) => {
          let color = '#2db7f5'
          if (role === UserRole.ADMIN) {
            color = '#f50';
          }
          if (role === UserRole.ENGINEER) {
            color = '#2db7f5';
          }
          if (role === UserRole.SEARCHER) {
            color = '#87d068';
          }
          return (
            <Tag color={color} key={role}>
              {role}
            </Tag>
          );
        })
      ),
    }
  ];
  const extraContent = (
    <>
      <Button onClick={() => setModelVisible(true)}>{t('UpdatePassword')}</Button>
    </>
  )
  return (
    <>
      <UpdatePsModel
        modelVisible={modelVisible}
        changeModelVisible={setModelVisible}
      />
      <div className="mycard">
        {/* {userId} */}
        <Descriptions
          title={t("BasicInfo")}
          layout="vertical"
          bordered
          items={items}
          extra={extraContent}
        />
      </div>
    </>
  )
}

export default Center;