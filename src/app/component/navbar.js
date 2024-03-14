'use client'
import { fetchMerchant } from "@/redux/slices/merchantSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
    const dispatch = useDispatch();
    // const [name, setName] = useState("Demo");
    // const [image, setImage] = useState("");

    const name = useSelector(state => state.merchant.merchantName);
    const image = useSelector(state => state.merchant.merchantLogo);

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Fetch data only on the client-side
            dispatch(fetchMerchant());
        }
    }, []);

    return (
        <main>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={image} className="h-8" alt="Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{name}</span>
                    </a>
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                        <a href="tel:5541251234" className="text-sm  text-gray-500 dark:text-white hover:underline">Cart</a>
                        <button className="text-lg  text-blue-600 dark:text-blue-500 hover:underline ">☼</button>
                    </div>
                </div>
            </nav>
        </main>
    );
}
