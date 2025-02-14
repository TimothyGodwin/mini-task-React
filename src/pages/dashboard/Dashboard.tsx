import React, { useState, useMemo, useCallback, useEffect, act } from 'react';
import { Input, Button, Pagination } from 'antd';
import { SearchOutlined, AppstoreOutlined, TableOutlined } from '@ant-design/icons';
import CustomButton from '../../components/button/Button';
import clsx from 'clsx';
import TableView from './TableView';
import CardView from './CardView';
import UserModal from '../../components/userModal/UserModal';
import { UserType } from '../../types';
import { debounce } from 'lodash';
import useApiRequests from '../../api/useApiRequests';
import Loader from '../../components/loader/Loader';
import showNotification from '../../components/notification/Notification';
import DeleteModal from '../../components/deleteModal/DeleteModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserList } from '../../globalStore/slices/thunks';
import { setDeleteData } from '../../globalStore/slices/IdSlices';
import VirtualScroll from './VTable';
import { getData } from './helper';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    // const userTrack = JSON.parse(sessionStorage.getItem('trackActivity') || '');
    const userTrack = getData()
    const navigate = useNavigate();
    const { apiCalls, loading: fectchLoading, error }: any = useApiRequests('crudUsers', 'delete');
    const dispatch: any = useDispatch();
    const { data, total, per_page, loading } = useSelector((state: any) => state.id);
    const [searchText, setSearchText] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isTableSelected, setIsTableSelected] = useState<boolean>(true);
    const [openUserModal, setOpenUserModal] = useState<boolean>(false);
    const [editUser, setEditUser] = useState<UserType | null>(null);
    const [loader, setLoader] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

    useEffect(() => {
        console.log("userTrack : ", userTrack)
        dispatch(fetchUserList(1));
    }, []);


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        dispatch(fetchUserList(page));
    };

    const handleUseAction = (action: string, user: UserType | null) => {
        console.log("action : ", action, user)
        setEditUser(user);
        if (action === 'edit' || action === 'add') {
            setOpenUserModal(true);
        } else if (action === 'delete') {
            setOpenDeleteModal(true);
        }
    };

    const handleClose = (status: boolean = false) => {
        setOpenDeleteModal(false);
        setOpenUserModal(false);
        setEditUser(null);
        // setCurrentPage(1)
    };

    const filteredData = useMemo(() => {
        return data
            .filter(user =>
                user?.first_name?.toLowerCase().includes(searchText?.toLowerCase()) ||
                user?.last_name?.toLowerCase().includes(searchText?.toLowerCase()) ||
                user?.email?.toLowerCase().includes(searchText?.toLowerCase())
            )
            .map((user) => ({
                ...user,
                key: user.id
            }));
    }, [data, searchText]);

    const debouncedSearch = useCallback(
        debounce((value: string) => setSearchText(value), 300),
        []
    );

    const handleDeleteUser = async () => {
        setLoader(true);
        const params = { id: editUser?.id };
        try {
            const response = await apiCalls('', {}, params);
            const trackActivity = [...userTrack,
            { id: Date.now(), action: `User Deleted with Id ${editUser?.id}` }];
            sessionStorage.setItem('trackActivity', JSON.stringify(trackActivity));
            dispatch(setDeleteData(params));
            showNotification.SUCCESS('User deleted successfully');
        } catch (error) {
            showNotification.ERROR('Something went wrong');
        } finally {
            handleClose(false);
            setLoader(false);
        }
    };

    const onDelete = (status: boolean) => {
        if (status) handleDeleteUser();
        else handleClose(false)
    }

    return (
        <div className="p-4 h-[50vh]">
            {fectchLoading && <Loader />}
            <div className="bg-white-btn rounded-lg shadow">
                <div className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <h1 className="text-xl font-semibold mr-2">Users</h1>
                    <CustomButton type='normal' onClick={() => navigate("/history")}>History</CustomButton>
                    <div className="flex flex-col sm:flex-row sm:gap-2 sm:ml-auto mt-3 sm:mt-0">
                        <Input
                            placeholder="Search..."
                            prefix={<SearchOutlined />}
                            onChange={(e) => debouncedSearch(e.target.value)}
                            className="w-full sm:w-64"
                        />
                        <CustomButton
                            type="normal"
                            onClick={() => handleUseAction('add', null)}
                            className="mt-3 sm:mt-0"
                        >
                            Create User
                        </CustomButton>
                    </div>
                </div>

                <div className="p-4">
                    <Button
                        type="text"
                        icon={<TableOutlined />}
                        className={clsx('border', {
                            'border-blue-500 text-blue-500': isTableSelected,
                            'border-gray-300': !isTableSelected,
                        })}
                        onClick={() => setIsTableSelected(true)}
                    >
                        Table
                    </Button>

                    <Button
                        type="text"
                        icon={<AppstoreOutlined />}
                        className={clsx('ml-2 border', {
                            'border-blue-500 text-blue-500': !isTableSelected,
                            'border-gray-300': isTableSelected,
                        })}
                        onClick={() => setIsTableSelected(false)}
                    >
                        Card
                    </Button>
                </div>

                {isTableSelected ? (
                    <VirtualScroll data={filteredData} handleUseAction={handleUseAction} />
                    // <TableView data={filteredData} handleUseAction={handleUseAction} />
                ) : (
                    <CardView data={filteredData} handleUseAction={handleUseAction} />
                )}
            </div>

            <div className="flex justify-end mt-4">
                <Pagination
                    current={currentPage}
                    total={total}
                    pageSize={per_page}
                    onChange={handlePageChange}
                />
            </div>
            {openUserModal && <UserModal open={openUserModal} handleClose={handleClose} editUser={editUser} />}
            {openDeleteModal && <DeleteModal open={openDeleteModal} onDelete={onDelete} />}
        </div>
    );
};

export default Dashboard;
