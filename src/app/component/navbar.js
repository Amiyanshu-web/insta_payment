'use client'
import { useState, useEffect } from "react";

export default function Navbar() {
    const [name, setName] = useState("Demo");
    const [image, setImage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://groww-intern-assignment.vercel.app/v1/api/merchant-metadata");
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                setName(data.merchantName);
                setImage(data.merchantLogo);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (typeof window !== "undefined") {
            // Fetch data only on the client-side
            fetchData();
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
                                <a href="#" className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Login</a>
                            </div>
                        </div>
                    </nav>
                </main>
    );
}
