/* eslint-disable react/prop-types */
import { Button, Checkbox } from 'antd';
import { useState, useEffect } from 'react';
import { AutoSizer, Column, Table, SortDirection } from 'react-virtualized';
import 'react-virtualized/styles.css';
import DeleteModal from '../../components/deleteModal/DeleteModal';
import { setDeleteDataMulti } from '../../globalStore/slices/IdSlices';
import { useDispatch } from 'react-redux';
import showNotification from '../../components/notification/Notification';
import { getData } from './helper';

function VirtualTable({ data, handleUseAction }) {
    const dispatch = useDispatch();
    const userTrack = getData();
    const [sortBy, setSortBy] = useState('email');
    const [sortDirection, setSortDirection] = useState(SortDirection.ASC);
    const [selectedRows, setSelectedRows] = useState([]);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [sortedList, setSortedList] = useState([]);

    useEffect(() => {
        setSortedList(data);
    }, [data]);

    const handleSort = ({ sortBy, sortDirection }) => {
        setSortBy(sortBy);
        setSortDirection(sortDirection);

        const sortedData = data.sort((a, b) => {
            if (a[sortBy] < b[sortBy]) {
                return sortDirection === SortDirection.ASC ? -1 : 1;
            }
            if (a[sortBy] > b[sortBy]) {
                return sortDirection === SortDirection.ASC ? 1 : -1;
            }
            return 0;
        });

        setSortedList(sortedData);
    };

    const handleSelectAll = () => {
        if (selectedRows.length === sortedList.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(sortedList.map((user) => user?.id));
        }
    };

    const handleSelectRow = (index) => {
        if (selectedRows.includes(index)) {
            setSelectedRows(selectedRows.filter(i => i !== index));
        } else {
            setSelectedRows([...selectedRows, index]);
        }
    };

    const renderCheckBox = ({ rowData }) => (
        <Checkbox
            checked={selectedRows.includes(rowData?.id)}
            onChange={() => handleSelectRow(rowData?.id)}
        />
    );

    const renderCheckBoxAll = () => (
        <Checkbox
            checked={selectedRows.length === sortedList.length}
            onChange={handleSelectAll}
        />
    );

    const renderAvatarCell = ({ cellData }) => (
        <img src={cellData} alt="avatar" className="w-10 h-10 rounded-full" />
    );

    const renderActionBtn = ({ rowData }) => (
        <>
            <button onClick={() => handleUseAction('edit', rowData)}>Edit</button>
            <button className="ml-3" onClick={() => handleUseAction('delete', rowData)}>Delete</button>
        </>
    );

    const handleDeleteUser = async () => {
        console.log("selectedRows checking: ", selectedRows)
        dispatch(setDeleteDataMulti(selectedRows));
        showNotification.SUCCESS('Users deleted successfully');
        const trackActivity = [...userTrack, { id: Date.now(), action: `Multiple User deleted`, usersId: selectedRows }];
        sessionStorage.setItem('trackActivity', JSON.stringify(trackActivity));
        handleClose();
        setSelectedRows([]);
    }

    const handleClose = () => {
        setOpenDeleteModal(false);
    }

    const onDelete = (status) => {
        if (status) handleDeleteUser();
        else handleClose();
    }

    return (
        <div>
            {selectedRows?.length > 0 &&
                <Button type="delete" onClick={() => {
                    setOpenDeleteModal(true);
                }}>Delete</Button>}

            <div style={{ height: '500px', width: '90%' }}>
                <AutoSizer>
                    {({ width, height }) => (
                        <Table
                            width={width}
                            height={height}
                            headerHeight={50}
                            rowHeight={60}
                            rowCount={sortedList.length}
                            rowGetter={({ index }) => sortedList[index]}
                            sort={handleSort}
                            sortBy={sortBy}
                            sortDirection={sortDirection}
                        >
                            <Column
                                label={renderCheckBoxAll()}
                                dataKey="select"
                                width={50}
                                cellRenderer={renderCheckBox}
                    
                            />
                            <Column
                                label=""
                                dataKey="avatar"
                                width={100}
                                cellRenderer={renderAvatarCell}
                                disableSort
                            />
                            <Column
                                label="Email"
                                dataKey="email"
                                width={250}
                            />
                            <Column
                                label="First Name"
                                dataKey="first_name"
                                width={250}
                            />
                            <Column
                                label="Last Name"
                                dataKey="last_name"
                                width={250}
                            />
                            <Column
                                label="Action"
                                dataKey="avatar"
                                width={100}
                                cellRenderer={renderActionBtn}
                                disableSort
                            />
                        </Table>
                    )}
                </AutoSizer>
            </div>
            {openDeleteModal && <DeleteModal open={openDeleteModal} onDelete={onDelete} />}
        </div>
    );
}

export default VirtualTable;