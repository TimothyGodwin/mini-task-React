import React, { useState } from 'react'
import { Space, Image, Table } from 'antd';
import Button from '../../components/button/Button';
import { UserType } from '../../types';
import '../../styles/TableStyles.css';
import DeleteModal from '../../components/deleteModal/DeleteModal';
import showNotification from '../../components/notification/Notification';
import { useDispatch } from 'react-redux';
import { setDeleteData, setDeleteDataMulti } from '../../globalStore/slices/IdSlices';
import { getData } from './helper';

const TableView = ({ data, handleUseAction }) => {
    const userTrack = getData();
    const dispatch: any = useDispatch();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const columns: any = [
        {
            title: '',
            dataIndex: 'avatar',
            key: 'avatar',
            width: '20%',
            render: (text) => (
                <div className="flex justify-center">
                    <Image
                        src={text}
                        alt="avatar"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                </div>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => { return a.email.localeCompare(b.email) },
            render: (text) => <span className="text-blue-link">{text}</span>,
        },
        {
            title: 'First Name',
            dataIndex: 'first_name',
            sorter: (a, b) => { return a.first_name.localeCompare(b.first_name) },
            key: 'first_name',
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            sorter: (a, b) => { return a.last_name.localeCompare(b.last_name) },
            key: 'last_name',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="normal" onClick={() => handleUseAction('edit', record)}>Edit</Button>
                    <Button type='delete' onClick={() => handleUseAction('delete', record)}>Delete</Button>
                </Space>
            ),
        },
    ];

    const handleDeleteUser = async () => {
        dispatch(setDeleteDataMulti(selectedRowKeys));
        showNotification.SUCCESS('User deleted successfully');
        const trackActivity = [...userTrack, { id: Date.now(), action: `Multiple User deleted` }];
        sessionStorage.setItem('trackActivity', JSON.stringify(trackActivity));
        handleClose();
        setSelectedRowKeys([])
    }

    const handleClose = () => {
        setOpenDeleteModal(false)
    }
    const onDelete = (status: boolean) => {
        if (status) handleDeleteUser();
        else handleClose()
    }

    return (
        <div className="w-full overflow-x-auto">
            {selectedRowKeys?.length > 0 &&
                <Button type="delete" onClick={() => {
                    setOpenDeleteModal(true)
                }}>Delete</Button>}
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                pagination={false}
                bordered={false}
                className="custom-table"
            />
            {openDeleteModal && <DeleteModal open={openDeleteModal} onDelete={onDelete} />}
        </div>
    )
}

export default TableView


