import React, { useEffect, useState } from 'react';
import { Button, Input, Popover, Space, Table, Tag } from 'antd';
import { ExclamationCircleTwoTone } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, PlusOutlined, DownloadOutlined, DeleteFilled, RestOutlined } from '@ant-design/icons';
import CreateModel from './components/CreateModel';
import dayjs from 'dayjs';
import { UserTableType } from '../../model/userInfoModel'
import { CREATE_MODEL, ControlModel, UPDATE_MODEL } from '../../model/globalModel'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, deleteUserList, getUserListByAPI, getUserListByCondition } from '../../store/actions/userListActions';
import { UserRole } from '../../store/reducer/userReducer'
import './User.css'

function User() {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [controlModel, setControlModel] = useState<ControlModel>()
    const [updateUser, setUpdateUser] = useState<UserTableType>()
    const [email, setEmail] = useState<string>()
    const [realName, setRealName] = useState<string>()
    const [phone, setPhone] = useState<string>()
    const [deleteVisible, setDeleteVisible] = useState<number>()
    const columns: ColumnsType<UserTableType> = [
        {
            key: 'id',
            title: 'ID',
            dataIndex: 'id',
            width: 70
        },
        {
            key: 'userId',
            title: 'UserId',
            dataIndex: 'userId',
        },
        {
            key: 'roles',
            title: 'Roles',
            dataIndex: 'roles',
            render: (_, { roles }) => (
                <>
                    {
                        roles.map((role) => {
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
                    }
                </>
            )
        },
        {
            key: 'realName',
            title: 'Real Name',
            dataIndex: 'realName',
        },
        {
            key: 'email',
            title: 'Email',
            dataIndex: 'email',
        },
        {
            key: 'phone',
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            key: 'sex',
            title: 'Sex',
            dataIndex: 'sex',
            render: (_, record) => {
                return (<>{record.sex === 1 ? '男' : '女'}</>)
            },
            width: 70
        },
        {
            key: 'birthday',
            title: 'Birthday',
            dataIndex: 'birthday',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => openModel(record, UPDATE_MODEL)}>Update</a>
                    <Popover content={
                        <>
                            <div style={{ marginBottom: '5px' }}>
                                <ExclamationCircleTwoTone twoToneColor='#faad14' style={{ marginRight: '5px' }} />
                                <span>Are you sure delete this user</span>
                            </div>
                            <Button size='small' onClick={() => { setDeleteVisible(undefined) }} style={{ marginRight: '5px' }}>No</Button>
                            <Button size='small' danger onClick={() => {
                                _deleteUser(record.userId)
                            }}>Yes</Button>
                        </>
                    }
                        trigger="focus"
                        open={deleteVisible === record.id}
                        onOpenChange={() => changeDeleteVisible(record.id)}
                    >
                        <Button type="link" danger>
                            Delete
                        </Button>
                    </Popover>
                </Space >
            ),
        },
    ];


    const data = useSelector((state: any) => {
        return state.userListReducer.userList
    })
    const dispatch = useDispatch()
    const _getUserListByAPI = () => {
        dispatch(getUserListByAPI())
    }
    const _deleteUser = (userId: string) => {
        // console.log('_delete');
        setDeleteVisible(undefined)
        dispatch(deleteUser(userId))
    }
    const _deleteUserList = (idList: React.Key[]) => {
        dispatch(deleteUserList(idList))
    }
    const _getUserByCondition = (email?: string, realName?: string, phone?: string) => {
        dispatch(getUserListByCondition(email, realName, phone))
    }
    useEffect(() => {
        // console.log('触发');
        _getUserListByAPI()
    }, [])

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const openModel = (record?: UserTableType, editType?: string) => {
        console.log(record);

        if (record) {
            setUpdateUser({ ...record, birthday: dayjs(record?.birthday, 'YYYY-MM-DD') })
        }
        setControlModel({ visible: true, editType })
    }

    const deleteUserSeleted = () => {
        console.log('selected', selectedRowKeys);
        _deleteUserList(selectedRowKeys)
    }

    const changeControl = (controlModel: ControlModel) => {
        setControlModel(controlModel)
        setUpdateUser(undefined)
    }
    const changeDeleteVisible = (id: number) => {
        setDeleteVisible(id)
    }
    const findUser = () => {
        _getUserByCondition(email, realName, phone)
    }
    return (
        <div className='mycard'>
            <CreateModel
                controlModel={controlModel}
                changeControl={changeControl}
                updateUserInfo={updateUser} />
            <Space style={{ marginBottom: 16 }}>
                <span className='searcher_title'>E-mail</span>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                <span className='searcher_title'>Real Name</span>
                <Input value={realName} onChange={(e) => setRealName(e.target.value)} />
                <span className='searcher_title'>Phone</span>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                <Button type="primary" icon={<SearchOutlined />} onClick={() => findUser()}>
                    搜索
                </Button>
                <Button icon={<RestOutlined />}>
                    重置
                </Button>
            </Space>
            <div style={{ marginBottom: 16 }}>
                <Space>
                    <Button type="primary" onClick={() => openModel(undefined, CREATE_MODEL)} icon={<PlusOutlined />}>
                        新增用户
                    </Button>
                    <Button type="primary" onClick={() => deleteUserSeleted()} icon={<DeleteFilled />} danger>
                        批量删除
                    </Button>
                    <Button icon={<DownloadOutlined />}>
                        导出所选
                    </Button>
                </Space>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} scroll={{ y: 420 }} />
        </div>
    );
};

export default User;