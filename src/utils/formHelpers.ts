import * as Yup from "yup";

export const schemaUser = Yup.object({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    avatar: Yup.string().url("Invalid URL format").required("Profile Image Link is required"),
});

export const SchemaLogin = Yup.object().shape({
    email: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    rememberMe: Yup.boolean(),
});