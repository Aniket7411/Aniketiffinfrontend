import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Input = ({
    label,
    type = 'text',
    placeholder,
    icon: Icon,
    register,
    error,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <Icon className="w-5 h-5" />
                    </div>
                )}
                <input
                    type={inputType}
                    placeholder={placeholder}
                    className={`
            w-full px-4 py-3 ${Icon ? 'pl-12' : ''} ${isPassword ? 'pr-12' : ''}
            border-2 rounded-xl outline-none transition-all duration-300
            ${error
                            ? 'border-red-400 focus:border-red-500'
                            : 'border-gray-200 focus:border-primary-500'
                        }
            focus:shadow-lg bg-white text-gray-800
            placeholder:text-gray-400
          `}
                    {...register}
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        {showPassword ? (
                            <AiOutlineEyeInvisible className="w-5 h-5" />
                        ) : (
                            <AiOutlineEye className="w-5 h-5" />
                        )}
                    </button>
                )}
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-500 font-medium">{error}</p>
            )}
        </div>
    );
};

export default Input;

