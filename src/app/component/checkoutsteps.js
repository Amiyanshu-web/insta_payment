import Link from 'next/link';

const CheckoutSteps = ({ step1, step2, step3 }) => {
    return (
        <nav className="flex justify-center mb-4 mt-4">
            <NavItem enabled={step1} path="/">
                Cart
            </NavItem>
            <NavItem enabled={step2} path="/paymentmethod">
                Payment
            </NavItem>
            <NavItem enabled={step3} path="/orderdetails">
                Place Order
            </NavItem>
        </nav>
    );
};

const NavItem = ({ enabled, path, children }) => {
    return (
        <Link href={enabled ? path : ''} passHref>
            <span className={`px-4 py-2 rounded ${enabled ? 'text-green-500' : 'text-gray-400 cursor-not-allowed'}`}>
                {children}
            </span>
        </Link>
    );
};

export default CheckoutSteps;
