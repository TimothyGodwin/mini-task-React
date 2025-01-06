import { notification } from 'antd';

const showNotification: any = {
    SUCCESS: (description: string) => {
        notification.success({
            message: '',
            description: description,
            duration: 2,
        });
    },
    ERROR: (description: string) => {
        notification.error({
            message: '',
            description: description,
            duration: 2,
        });
    },
};

export default showNotification;
