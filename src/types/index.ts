export interface UserType {
    id?: string;
    avatar: string;
    email: string;
    first_name: string;
    last_name: string;
}

export interface LoginFormValues {
    email: string;
    password: string;
    rememberMe: boolean;
}