import { Table } from 'antd';
import { getData } from './helper'
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';

const HistoryData = () => {
    const navigate = useNavigate();
    const userTrack = getData()

    const columns = [
        {
            title: 'S.No',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <span className="text-blue-link">{text}</span>,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
        },
    ];

    return (
        <div>
            <Button type='normal' onClick={() => navigate("/dashboard")}>Dashboard</Button>
            <Table
                columns={columns}
                dataSource={userTrack}
                pagination={false}
                bordered={false}
            />
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userTrack?.map((item, index) => (
                        <tr key={item?.id}>
                            <td>{index}</td>
                            <td>{item?.action}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default HistoryData
