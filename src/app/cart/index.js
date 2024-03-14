'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Message from '../component/message'
import CheckoutSteps from '../component/checkoutsteps';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/redux/slices/productSlice';

export default function Cart() {
    const router = useRouter();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);
    // const [products, setProducts] = useState([]);
    const data = useSelector(state => state.products);
    const products = useSelector((state) => state.products.products);

    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.removeItem('paymentMethod');
            localStorage.removeItem('data');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        dispatch(fetchProducts());
        console.log(data);
    }, [dispatch]);

    const checkoutHandler = () => {
        localStorage.setItem('data', JSON.stringify(data));

        router.push('/paymentmethod');
    };

    return (
        <>
         <CheckoutSteps step1={true} step2={false} step3={false} />
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-semibold my-8">My Cart</h1>
                {loading ? (
                    <Message>Loading...</Message>
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : products?.length === 0 ? <Message variant='warning'>Your Cart is Empty</Message> : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <ul>
                                {products?.map((item) => (
                                    <li key={item.id} className="border-b pb-4 mb-4">
                                        <div className="flex items-center">
                                            <div className="w-20 h-15 relative mr-4">
                                                <Image src={item.image} alt={item.title} width={300} height={50} />
                                            </div>
                                            <div>
                                                <span className="text-lg font-semibold">{item.title}</span>
                                                <p>$ {item.price}</p>
                                                <p>Quantity: {item.quantity}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <div className="mb-2 border p-4">
                                <h2 className="text-xl font-semibold mb-4 ">Order Summary</h2>
                                <p className="mb-4">SUBTOTAL ({products?.reduce((a, c) => a + c.quantity, 0)} ITEMS)</p>
                                <p className="font-semibold">$ {products?.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
                                <hr />
                                <button
                                    type='button'
                                    className={`mt-3 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" ${products?.length === 0 && 'disabled'}`}
                                    onClick={checkoutHandler}
                                >
                                    PAYMENT
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div> 
        </>
    );
}