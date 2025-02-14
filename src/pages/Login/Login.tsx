import React, { useState } from "react";
import { Input, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import useApiRequests from "../../api/useApiRequests";
import { LoginFormValues } from "../../types";
import { SchemaLogin } from "../../utils/formHelpers";
import showNotification from './../../components/notification/Notification';
import { useDispatch } from "react-redux";
import { setToken } from "../../globalStore/slices/IdSlices";
import Loader from './../../components/loader/Loader';
import { getData, saveData } from "../dashboard/helper";

const Login = () => {
    const userTrack = getData();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { apiCalls: loginAPI }: any = useApiRequests('login', 'post');
    const [loader, setLoader] = useState(false);

    const initialValues: LoginFormValues = {
        email: '',
        password: '',
        rememberMe: false,
    };

    const handleSubmit = async (values: LoginFormValues) => {

        setLoader(true);
        try {
            const response = await loginAPI(values);
            console.log("response : ", response)
            if (response?.token) {
                console.log("userTrack : ", userTrack)
                showNotification.SUCCESS('Login Successful');
                dispatch(setToken(response?.token));
                let trackActivity = [{ id: Date.now(), action: 'User Login' }];
                if (Array.isArray(userTrack)) {
                    trackActivity = [...userTrack, ...trackActivity];
                }
                saveData(trackActivity)
                // sessionStorage.setItem('trackActivity', JSON.stringify(trackActivity));
                navigate("/dashboard");
            }
        } catch (error) {
            showNotification.ERROR(error?.response?.data?.error);
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            {loader && <Loader />}
            <div className="bg-white-btn p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md">
                <Formik
                    initialValues={initialValues}
                    validationSchema={SchemaLogin}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div className="mb-4">
                                <Field
                                    name="email"
                                    as={Input}
                                    prefix={<UserOutlined />}
                                    placeholder="email"
                                    size="large"
                                    className="rounded-md"
                                />
                                {errors.email && touched.email && (
                                    <div className="text-red-500 text-sm">{errors.email}</div>
                                )}
                            </div>

                            <div className="mb-4">
                                <Field
                                    name="password"
                                    as={Input.Password}
                                    prefix={<LockOutlined />}
                                    placeholder="Password"
                                    size="large"
                                    className="rounded-md"
                                />
                                {errors.password && touched.password && (
                                    <div className="text-red-500 text-sm">{errors.password}</div>
                                )}
                            </div>

                            <div className="mb-4 flex items-center">
                                <Field name="rememberMe" type="checkbox" as={Checkbox} className="mr-2 font-semi-bold text-xxs">
                                    Remember me
                                </Field>
                            </div>

                            <Button type="normal" size="full" typeMethod="submit">
                                Log in
                            </Button>
                        </Form>
                    )}

                </Formik>
            </div>
        </div>
    );
};

export default Login;
