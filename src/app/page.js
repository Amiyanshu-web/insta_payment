'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Message from './component/message'
import CheckoutSteps from './component/checkoutsteps';
// import { addToCart, removeFromCart } from '../actions/cartActions';
// import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const router = useRouter();
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
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

  // const removeFromCartHandler = (id) => {
  //   dispatch(removeFromCart(id));
  // };

  const checkoutHandler = () => {
    router.push('/paymentmethod');
  };

  return (
    <>
    <CheckoutSteps step1 = {true} step2= {false} step3 = {false}/>
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-semibold my-8">My Cart</h1>
      {loading ? (
        <Message>Loading...</Message>
        ) : error ? (
          <Message variant= 'danger'>{error}</Message>
          ) : products.length === 0?<Message variant = 'warning'>Your Cart is Empty</Message>:(
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <ul>
              {products.map((item) => (
                <li key={item.id} className="border-b pb-4 mb-4">
                  <div className="flex items-center">
                    <div className="w-20 h-20 relative mr-4">
                      <Image src={item.image} alt={item.title} width={300} height={300} />
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
              <p className="mb-4">SUBTOTAL ({products.reduce((a, c) => a + c.quantity, 0)} ITEMS)</p>
              <p className="font-semibold">$ {products.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
              <hr />
              <button
                type='button'
                className={`mt-3 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" ${products.length === 0 && 'disabled'}`}
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