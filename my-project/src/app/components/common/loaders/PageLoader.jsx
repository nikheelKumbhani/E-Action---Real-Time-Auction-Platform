export const PageLoader = ({ message = "Loading..." }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
            {/* Spinner */}
            <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-green rounded-full animate-spin"></div>
            </div>

            {/* Message */}
            <p className="text-gray-600 text-lg font-medium">{message}</p>
        </div>
    );
};

export const FullPageLoader = ({ message = "Loading..." }) => {
    return (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
            <div className="text-center space-y-4">
                {/* Spinner */}
                <div className="relative mx-auto w-20 h-20">
                    <div className="w-20 h-20 border-4 border-gray-200 border-t-green rounded-full animate-spin"></div>
                </div>

                {/* Message */}
                <p className="text-gray-700 text-xl font-medium">{message}</p>
            </div>
        </div>
    );
};

export const ButtonLoader = () => {
    return (
        <div className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    );
};
