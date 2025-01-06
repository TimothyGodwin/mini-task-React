import React from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const Card = ({ user, handleUseAction }) => {
    return (
        <div
            className="group relative bg-white-btn rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
        >
            <div className="flex flex-col items-center">
                <div className="text-center">
                    <img
                        src={user.avatar}
                        alt="User"
                        className="w-14 h-14 rounded-full mx-auto mb-3"
                    />
                    <h3 className="text-base font-medium text-gray-900 mb-1">
                        {user.first_name} {user.last_name}
                    </h3>
                    <p className="text-sm text-gray-500">
                        {user.email}
                    </p>
                </div>
                <div className="absolute inset-0 bg-gray-600/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                        className="w-10 h-10 rounded-full bg-blue-btn flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
                        onClick={() => handleUseAction('edit', user)}
                    >
                        <EditOutlined />
                    </button>
                    <button
                        className="w-10 h-10 rounded-full bg-red-btn flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                        onClick={() => handleUseAction('delete', user)}
                    >
                        <DeleteOutlined />
                    </button>
                </div>
            </div>
        </div>
    );
};


export default Card
