'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Message from '../component/message';
import { default as NumberFormat } from 'react-number-format';
import CheckoutSteps from '../component/checkoutsteps';

export default function OrderDetails() {
    // const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [isDelivered, setIsDelivered] = useState(false);
    const [isPaid, setIsPaid] = useState(true);
    // const cart = useSelector((state) => state.cart);
    // const { cartItems } = cart;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://groww-intern-assignment.vercel.app/v1/api/order-details');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data.products);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

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
                                {isDelivered ?
                                    <Message variant='success'>Delivered on 15th March, 2023</Message> :
                                    <Message variant='error'>Not Delivered</Message>
                                }
                            </div>

                            <div className="border-b border-gray-200 mb-4">
                                <h2 className="text-lg font-bold mb-2">Payment Method</h2>
                                {/* Make it dynamic */}
                                <p><strong>Method: </strong>UPI</p>
                                {isPaid ?
                                    <Message variant='success'>Paid on 14th March, 2023</Message> :
                                    <Message variant='error'>Not Paid</Message>
                                }
                            </div>

                            <div className="border-b border-gray-200 mb-4">
                                <h2 className="text-lg font-bold mb-2">Order Items</h2>
                                {products.length === 0 ?
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
                                                {products.map(item => (
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
                                                value={9999}
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
                                                value={0}
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
                                                value={99}
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
                                                value={99999.9999}
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