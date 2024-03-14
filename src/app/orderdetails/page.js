'use client'
import { useEffect, useState } from 'react';
import Message from '../component/message';
import { default as NumberFormat } from 'react-number-format';
import CheckoutSteps from '../component/checkoutsteps';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/redux/slices/productSlice';


export default function OrderDetails() {
    // const router = useRouter();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);
    const products = useSelector((state) => state.products.products);
    const method = useSelector((state) => state.paymentMethod)
    const [isPaid, setIsPaid] = useState(Math.floor(Math.random() * 3));

    const itemsPrice = products?.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    const shippingPrice = (itemsPrice > 50 ? 0 : 100).toFixed(2);
    const taxPrice = Number((0.27 * itemsPrice).toFixed(2))
    const totalPrice = (
        Number(itemsPrice) +
        Number(shippingPrice) +
        Number(taxPrice)
    ).toFixed(2);

    useEffect(() => {
        dispatch(fetchProducts());
        // dispatch(setSelectedPaymentMethod());
    }, [dispatch])

    console.log(method);
    return (
        <>
            <CheckoutSteps step1={true} step2={true} step3={true} />
            <div className='p-3'>
                {loading ? <Message >Loading...</Message> : error ? <Message variant='danger'>{error}</Message> :
                    <>
                        <h1>Order Details</h1>
                        <hr></hr>
                        <div className="flex flex-col md:flex-row md:space-x-4">
                            <div className="md:w-2/3">
                                <div className="border-b border-gray-200 mb-4">
                                    <h2 className="text-lg font-bold mb-2">Shipping</h2>
                                    <p><strong>Name:</strong> Test</p>
                                    <p><strong>Email:</strong> test@example.com </p>
                                    <p>
                                        <strong>Address: </strong>
                                        Dr. Sammy Bergstrom, South Aritown, 73124, Pennsylvania
                                    </p>
                                    {isPaid === 2 ?
                                        <Message variant='success'>Delivered on 15th March, 2023</Message> :
                                        <Message variant='error'>Not Delivered</Message>
                                    }
                                </div>

                                <div className="border-b border-gray-200 mb-4">
                                    <h2 className="text-lg font-bold mb-2">Payment Method</h2>
                                    <p><strong>Method: </strong>{method?.selectedMethod}</p>
                                    {isPaid === 2 ?
                                        <Message variant='success'>Paid on 14th March, 2023</Message> : isPaid === 1 ? <Message variant='warning'>In Progress</Message> :
                                            <Message variant='error'>Not Paid</Message>
                                    }
                                </div>

                                <div className="border-b border-gray-200 mb-4">
                                    <h2 className="text-lg font-bold mb-2">Order Items</h2>
                                    {products?.length === 0 ?
                                        <Message variant='danger'>Order is empty</Message> :
                                        <div className="overflow-x-auto">
                                            <table className="w-full border-collapse">
                                                <thead>
                                                    <tr className="border-b">
                                                        <th className="p-2">Product</th>
                                                        <th className="p-2">Price</th>
                                                        <th className="p-2">Quantity</th>
                                                        <th className="p-2">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {products?.map(item => (
                                                        <tr key={item.id} className="border-b">
                                                            <td className="p-2">
                                                                <div className="flex items-center">
                                                                    <img src={item.image} alt={item.title} className="h-16 w-16 object-contain mr-4" />
                                                                    <span>{item.title}</span>
                                                                </div>
                                                            </td>
                                                            <td className="p-2">
                                                                <NumberFormat
                                                                    thousandsGroupStyle="thousand"
                                                                    value={item.price}
                                                                    prefix="$"
                                                                    decimalSeparator="."
                                                                    displayType='text'
                                                                    thousandSeparator={true}
                                                                    allowNegative={false}
                                                                />
                                                            </td>
                                                            <td className="p-2">{item.quantity}</td>
                                                            <td className="p-2">
                                                                <NumberFormat
                                                                    thousandsGroupStyle="thousand"
                                                                    value={item.price * item.quantity}
                                                                    prefix="$"
                                                                    decimalSeparator="."
                                                                    displayType='text'
                                                                    thousandSeparator={true}
                                                                    allowNegative={false}
                                                                />
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className="mt-2 md:w-1/3">
                                <div className="border rounded-md shadow-md p-4">
                                    <h1 className="font-bold text-xl mb-4">Order Summary</h1>
                                    <ul className="divide-y divide-gray-300">
                                        <li className="py-2 flex justify-between">
                                            <span>Items</span>
                                            <span>
                                                <NumberFormat
                                                    thousandsGroupStyle="thousand"
                                                    value={itemsPrice}
                                                    prefix="$"
                                                    decimalSeparator="."
                                                    displayType='text'
                                                    thousandSeparator={true}
                                                    allowNegative={false}
                                                    decimalScale={2}
                                                />
                                            </span>
                                        </li>
                                        <li className="py-2 flex justify-between">
                                            <span>Shipping</span>
                                            <span>
                                                <NumberFormat
                                                    thousandsGroupStyle="thousand"
                                                    value={shippingPrice}
                                                    prefix="$"
                                                    decimalSeparator="."
                                                    displayType='text'
                                                    thousandSeparator={true}
                                                    allowNegative={false}
                                                    decimalScale={2}
                                                />
                                            </span>
                                        </li>
                                        <li className="py-2 flex justify-between">
                                            <span>Tax</span>
                                            <span>
                                                <NumberFormat
                                                    thousandsGroupStyle="thousand"
                                                    value={taxPrice}
                                                    prefix="$"
                                                    decimalSeparator="."
                                                    displayType='text'
                                                    thousandSeparator={true}
                                                    allowNegative={false}
                                                    decimalScale={2}
                                                />
                                            </span>
                                        </li>
                                        <li className="py-2 flex justify-between">
                                            <span>Total</span>
                                            <span>
                                                <NumberFormat
                                                    thousandsGroupStyle="thousand"
                                                    value={totalPrice}
                                                    prefix="$"
                                                    decimalSeparator="."
                                                    displayType='text'
                                                    thousandSeparator={true}
                                                    allowNegative={false}
                                                    decimalScale={2}
                                                />
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    );
};