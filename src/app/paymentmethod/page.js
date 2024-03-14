'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Message from '../component/message';
import CheckoutSteps from '../component/checkoutsteps';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/redux/slices/productSlice';
import { setSelectedPaymentMethod } from '@/redux/slices/paymentSlice';
export default function PaymentMethod() {
    const router = useRouter();
    const [selectedMethod, setSelectedMethod] = useState('');
    const [selectedMethodId, setSelectedMethodId] = useState('');
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);
    // const methods = useSelector((state) => state.products.methods);
    const [methods, setMethods] = useState(['UPI', "CARDS"]);
    const products = useSelector((state) => state.products);

    // useEffect(() => {
    //     dispatch(fetchProducts());
    //     // Fetch products from API
    //     console.log(methods);
    // }, [dispatch]);

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(selectedMethod);
        localStorage.setItem('paymentMethod', selectedMethod);
        dispatch(setSelectedPaymentMethod(selectedMethod)); // Dispatch action to store selectedMethod in Redux store
        if (selectedMethod !== '') router.push('/orderdetails');
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
    const selectHandler = (id, method) => {
        setSelectedMethodId(id);
        setSelectedMethod(method);
    }
    return (
        <>
            <CheckoutSteps step1={true} step2={true} step3={false} />
            <div className="p-4">
                {loading ? <Message>Loading...</Message> : methods?.length === 0 ? <Message variant='warning'>No Payment Method</Message> :
                    <div>
                        <h2 className="text-lg font-bold mb-4">Choose Payment Method</h2>
                        <div className="p-4 rounded-md shadow-md">
                            {methods?.map((method, id) => (
                                <PaymentOption
                                    key={id}
                                    icon={getIconByTitle(method)}
                                    title={method}
                                    description={getDescription(method)}
                                    selected={selectedMethodId === id}
                                    onSelect={() => selectHandler(id, method)}
                                />
                                ))}
                        </div>
                        <button className={`mt-4 bg-purple-500 text-white p-2 rounded ${selectedMethod === '' ? 'disabled opacity-50 cursor-not-allowed' : ''}`} onClick={submitHandler}>
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
