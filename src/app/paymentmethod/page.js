'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Message from '../component/message';
import CheckoutSteps from '../component/checkoutsteps';

export default function PaymentMethod() {
    const router = useRouter();
    const [selectedMethod, setSelectedMethod] = useState('');
    const [methods, setMethods] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMethods = async () => {
            try {
                const response = await fetch('https://groww-intern-assignment.vercel.app/v1/api/order-details');
                if (!response.ok) {
                    throw new Error('Failed to fetch payment methods');
                }
                const data = await response.json();
                setMethods(data.paymentMethods);
                console.log(data.paymentMethods);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchMethods();
        console.log(methods);
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        router.push('/orderdetails');
    }

    const getIconByTitle = (title) => {
        switch (title?.toLowerCase()) {
            case 'cards':
                return '💳';
            case 'upi':
                return '📱';
            case 'e-wallet':
                return '🔒';
            case 'cash on delivery':
                return '💵';
            default:
                return ''; // Empty string for unknown titles
        }
    };

    const getDescription = (title) => {
        switch (title?.toLowerCase()) {
            case 'cards':
                return '1234 **** ****';
            case 'cash on delivery':
                return 'Pay directly to the Driver';
            default:
                return ''; // Empty string for unknown titles
        }
    }

    return (
        <>
        <CheckoutSteps step1 = {true} step2={true} step3 = {false}/>
        <div className="p-4">
            {loading ? <Message>Loading...</Message> :
                <div>
                    <h2 className="text-lg font-bold mb-4">Choose Payment Method</h2>
                    <div className="p-4 rounded-md shadow-md">
                        {methods.map((method, id) => (
                            <PaymentOption
                            key={id}
                            icon={getIconByTitle(method)}
                            title={method}
                            description={getDescription(method)}
                            selected={selectedMethod === id}
                            onSelect={() => setSelectedMethod(id)}
                            />
                            ))}
                    </div>
                    <button className="mt-4 bg-purple-500 text-white p-2 rounded" onClick={submitHandler}>
                        Make a payment
                    </button>
                </div>
            }
        </div>
        </>
    );
}

function PaymentOption({ icon, title, description, selected, onSelect }) {
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
