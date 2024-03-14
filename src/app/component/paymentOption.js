export default function PaymentOption({ icon, title, description, selected, onSelect }) {
    return (
        <div
            onClick={onSelect}
            className={`flex items-center justify-between py-2 ${selected ? 'bg-blue-300 cursor-pointer hover:bg-blue-400' : 'cursor-pointer hover:bg-blue-200'
                }`}
        >
            <div className="flex items-center">
                {icon && <span className="mr-2">{icon}</span>}
                <span className='text-white-500'>{title}</span>
                {description && (
                    <span className="ml-2 text-gray-500">{description}</span>
                )}
            </div>
        </div>
    );
}