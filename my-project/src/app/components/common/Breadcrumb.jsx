import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";

/**
 * Breadcrumb component for navigation tracking
 */
export const Breadcrumb = ({ className = "" }) => {
    const location = useLocation();

    // Route name mapping for better display
    const routeNameMap = {
        '': 'Home',
        'dashboard': 'Dashboard',
        'products': 'Products',
        'product': 'Product',
        'add-product': 'Add Product',
        'edit': 'Edit',
        'profile': 'Profile',
        'wallet': 'Wallet',
        'login': 'Login',
        'register': 'Register',
        'seller': 'Seller',
        'forgot-password': 'Forgot Password',
        'reset-password': 'Reset Password',
        'verify-email': 'Verify Email',
        'admin': 'Admin',
        'users': 'Users',
        'categories': 'Categories',
        'winning-bids': 'Winning Bids',
        'terms': 'Terms & Conditions',
        'privacy': 'Privacy Policy'
    };

    // Generate breadcrumb items from current path
    const breadcrumbs = useMemo(() => {
        const pathnames = location.pathname.split('/').filter(x => x);

        const items = [
            { name: 'Home', path: '/' }
        ];

        let currentPath = '';
        pathnames.forEach((segment, index) => {
            currentPath += `/${segment}`;

            // Get display name from map or format the segment
            const name = routeNameMap[segment] ||
                segment.split('-').map(word =>
                    word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ');

            items.push({
                name,
                path: currentPath,
                isLast: index === pathnames.length - 1
            });
        });

        return items;
    }, [location.pathname]);

    // Don't show breadcrumbs on home page or if only one item
    if (breadcrumbs.length <= 1) {
        return null;
    }

    return (
        <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
                {breadcrumbs.map((crumb, index) => (
                    <li key={crumb.path} className="flex items-center">
                        {index > 0 && (
                            <svg
                                className="w-4 h-4 text-gray-400 mx-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        )}
                        {crumb.isLast ? (
                            <span className="text-gray-600 font-medium" aria-current="page">
                                {crumb.name}
                            </span>
                        ) : (
                            <Link
                                to={crumb.path}
                                className="text-green hover:text-green-600 hover:underline transition-colors"
                            >
                                {crumb.name}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

/**
 * Breadcrumb with custom items (for complex routes)
 */
export const CustomBreadcrumb = ({ items, className = "" }) => {
    if (!items || items.length <= 1) {
        return null;
    }

    return (
        <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
                {items.map((item, index) => (
                    <li key={item.path || index} className="flex items-center">
                        {index > 0 && (
                            <svg
                                className="w-4 h-4 text-gray-400 mx-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        )}
                        {item.isLast || index === items.length - 1 ? (
                            <span className="text-gray-600 font-medium" aria-current="page">
                                {item.name}
                            </span>
                        ) : (
                            <Link
                                to={item.path}
                                className="text-green hover:text-green-600 hover:underline transition-colors"
                            >
                                {item.name}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};
