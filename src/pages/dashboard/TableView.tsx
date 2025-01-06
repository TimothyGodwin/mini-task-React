import React from 'react'
import { ColumnsType } from 'antd/es/table';
import { Space, Image, Table } from 'antd';
import Button from '../../components/button/Button';
import { UserType } from '../../types';
import '../../styles/TableStyles.css';

const TableView = ({ data, handleUseAction }) => {

    const columns: ColumnsType<UserType> = [
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
            render: (text) => <span className="text-blue-link">{text}</span>,
        },
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
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

    return (
        <div className="w-full overflow-x-auto">
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                bordered={false}
                className="custom-table"
            />
        </div>
    )
}

export default TableView


