import React from "react";
import { Modal } from "antd";
import Button from './../button/Button';

const DeleteModal: React.FC<any> = ({ open, onDelete }) => {

    const handleCloseDelete = (status: boolean) => {
        onDelete(status);
    }

    return (
        <Modal
            centered
            open={open}
            title="Delete User"
            onCancel={() => handleCloseDelete(false)}
            footer={null}
            width={400}
        >
            <p>Are you sure you want to delete this user?</p>
            <div className="flex justify-end gap-2 mt-4">
                <Button onClick={() => handleCloseDelete(false)} type="cancel">
                    Cancel
                </Button>
                <Button type="delete" onClick={() => handleCloseDelete(true)}>
                    Delete
                </Button>
            </div>
        </Modal>
    );
};

export default DeleteModal;
