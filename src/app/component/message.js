const Message = ({ variant='info', children }) => {
    let bgColor;
    switch (variant) {
        case 'success':
            bgColor = 'bg-green-100 text-green-800';
            break;
        case 'error':
            bgColor = 'bg-red-300 text-red-800';
            break;
        case 'warning':
            bgColor = 'bg-yellow-100 text-yellow-800';
            break;
        default:
            bgColor = 'bg-blue-100 text-blue-800';
    }

    return (
        <div className={`p-4 ${bgColor} rounded-md border border-gray-300 mb-4`}>
            {children}
        </div>
    );
};

export default Message;