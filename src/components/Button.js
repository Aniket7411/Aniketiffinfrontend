import React from 'react';

const Button = ({
    children,
    type = 'button',
    variant = 'primary',
    className = '',
    loading = false,
    disabled = false,
    icon: Icon,
    ...props
}) => {
    const variants = {
        primary: 'bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white shadow-lg hover:shadow-glow-orange',
        secondary: 'bg-gradient-to-r from-secondary-400 to-primary-400 hover:from-secondary-500 hover:to-primary-500 text-gray-800 shadow-lg hover:shadow-glow-yellow',
        outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50',
        ghost: 'text-primary-600 hover:bg-primary-50',
    };

    return (
        <button
            type={type}
            disabled={disabled || loading}
            className={`
        px-6 py-3 rounded-xl font-semibold
        transition-all duration-300 transform
        hover:scale-[1.02] active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        flex items-center justify-center gap-2
        ${variants[variant]}
        ${className}
      `}
            {...props}
        >
            {loading ? (
                <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Loading...
                </>
            ) : (
                <>
                    {Icon && <Icon className="w-5 h-5" />}
                    {children}
                </>
            )}
        </button>
    );
};

export default Button;

