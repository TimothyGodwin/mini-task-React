import React, { useEffect, useState } from "react";
import { Modal, Input } from "antd";
import { Formik, ErrorMessage, Form } from "formik";
import { UserType } from "../../types";
import Button from "../button/Button";
import { schemaUser } from "../../utils/formHelpers";
import useApiRequests from "../../api/useApiRequests";
import Loader from "../loader/Loader";
import showNotification from "../notification/Notification";
import { useDispatch } from "react-redux";
import { setData } from "../../globalStore/slices/IdSlices";
import { getData } from "../../pages/dashboard/helper";

interface UserModalProps {
    open: boolean;
    handleClose: () => void;
    editUser: UserType | null;
}

const UserModal: React.FC<UserModalProps> = ({ open, handleClose, editUser }: any) => {
    const userTrack = getData();
    const dispatch: any = useDispatch();
    const { apiCalls: createUsers } = useApiRequests('crudUsers', 'post');
    const { apiCalls: updateUsers } = useApiRequests('crudUsers', 'put');
    const [initialValues, setInitialValues] = useState<UserType | null>(editUser);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if (editUser === null) {
            setInitialValues({
                first_name: "",
                last_name: "",
                email: "",
                avatar: "",
            });
        }
    }, [open, editUser]);

    const addOrUpdateUser = async (payload: any, apicall: any, id: any) => {
        setLoader(true);
        try {
            const response = await apicall(payload, {}, { id });
            if (response?.id) {
                showNotification.SUCCESS(`User ${id ? 'Updated' : 'Added'} successfully`);
                const trackActivity = [...userTrack,
                { id: Date.now(), action: `User ${id ? 'Edited' : 'Created'} with Id ${response?.id}` }];
                sessionStorage.setItem('trackActivity', JSON.stringify(trackActivity));
                handleClose(response);
                dispatch(setData(response));
            }
        } catch (error) {
            showNotification.ERROR('Something went wrong');
        } finally {
            setLoader(false);
        }
    };


    const handleFormSubmit = (values: typeof initialValues) => {
        addOrUpdateUser(values, values?.id ? updateUsers : createUsers, values?.id)
    };

    return (
        <Modal
            centered
            open={open}
            title={editUser ? "Edit User" : "Add User"}
            onCancel={() => handleClose(false)}
            footer={null}
            width={400}
        >
            {loader && <Loader />}
            {initialValues !== null &&
                <Formik
                    initialValues={initialValues}
                    validationSchema={schemaUser}
                    onSubmit={handleFormSubmit}
                >
                    {({ values, handleChange, handleBlur, handleSubmit }) => {
                        return (
                            <Form onSubmit={handleSubmit} className="space-y-5">
                                <div className="form-group relative">
                                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                        <span className="text-red-500">*</span> First Name
                                    </label>
                                    <Input
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        placeholder="Enter first name"
                                        value={values.first_name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="ant-input"
                                    />
                                    <ErrorMessage name="first_name">
                                        {(msg) => (
                                            <div className="absolute text-red-500 text-xs top-12 left-0 mt-1">{msg}</div>
                                        )}
                                    </ErrorMessage>
                                </div>

                                <div className="form-group relative">
                                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                                        <span className="text-red-500">*</span> Last Name
                                    </label>
                                    <Input
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        placeholder="Enter last name"
                                        value={values.last_name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="ant-input"
                                    />
                                    <ErrorMessage name="last_name">
                                        {(msg) => (
                                            <div className="absolute text-red-500 text-xs top-12 left-0 mt-1">{msg}</div>
                                        )}
                                    </ErrorMessage>
                                </div>

                                <div className="form-group relative">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        <span className="text-red-500">*</span> Email
                                    </label>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="ant-input"
                                    />
                                    <ErrorMessage name="email">
                                        {(msg) => (
                                            <div className="absolute text-red-500 text-xs top-12 left-0 mt-1">{msg}</div>
                                        )}
                                    </ErrorMessage>
                                </div>

                                <div className="form-group relative">
                                    <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                                        <span className="text-red-500">*</span> Profile Image Link
                                    </label>
                                    <Input
                                        type="text"
                                        id="avatar"
                                        name="avatar"
                                        placeholder="Enter profile image link"
                                        value={values.avatar}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="ant-input"
                                    />
                                    <ErrorMessage name="avatar">
                                        {(msg) => (
                                            <div className="absolute text-red-500 text-xs top-12 left-0 mt-1">{msg}</div>
                                        )}
                                    </ErrorMessage>
                                </div>

                                <div className="flex justify-end space-x-4 pt-3">
                                    <Button onClick={() => handleClose(false)} type="cancel">
                                        Cancel
                                    </Button>
                                    <Button type="normal" typeMethod="submit">
                                        {editUser?.id ? 'Update' : 'Submit'}
                                    </Button>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            }
        </Modal>
    );
};

export default UserModal;
