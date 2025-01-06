import React from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = {
    type: 'normal' | 'delete' | 'cancel'
    size?: 'full' | undefined,
    typeMethod?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
};

const Button: React.FC<ButtonProps> = ({ type = 'normal', size, typeMethod, onClick, children, className }) => {
    const buttonStyles = {
        normal: 'bg-blue-btn text-white-btn hover:bg-blue-700 font-semi-bold text-lg',
        delete: 'bg-red-btn text-white-btn hover:bg-red-700 font-semi-bold text-lg',
        cancel: 'bg-white-btn text-black-btn border border-grey-btn hover:bg-gray-300 font-semi-bold text-lg',
    };
    const btnSize = {
        full: 'w-full',
    }

    const mergedClasses = twMerge(
        'py-1 px-4 rounded-lg text-center font-medium focus:outline-none',
        buttonStyles[type], btnSize[size || ''], className
    );

    return (
        <button type={typeMethod} className={mergedClasses} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
