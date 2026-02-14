/**
 * Inline error message component for forms
 */
export const InlineError = ({ error, className = "" }) => {
    if (!error) return null;

    return (
        <p className={`text-red-500 text-sm mt-1 ${className}`}>
            {error}
        </p>
    );
};

/**
 * Field error component with icon
 */
export const FieldError = ({ error, className = "" }) => {
    if (!error) return null;

    return (
        <div className={`flex items-center gap-1 text-red-500 text-sm mt-1 ${className}`}>
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
        </div>
    );
};

/**
 * Alert box for prominent errors
 */
export const ErrorAlert = ({ title, message, onClose, className = "" }) => {
    return (
        <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
            <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                    {title && <h4 className="font-semibold text-red-800 mb-1">{title}</h4>}
                    <p className="text-red-700 text-sm">{message}</p>
                </div>
                {onClose && (
                    <button onClick={onClose} className="text-red-400 hover:text-red-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

/**
 * Success alert box
 */
export const SuccessAlert = ({ title, message, onClose, className = "" }) => {
    return (
        <div className={`bg-green-50 border border-green-200 rounded-lg p-4 ${className}`}>
            <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                    {title && <h4 className="font-semibold text-green-800 mb-1">{title}</h4>}
                    <p className="text-green-700 text-sm">{message}</p>
                </div>
                {onClose && (
                    <button onClick={onClose} className="text-green-400 hover:text-green-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

/**
 * Warning alert box
 */
export const WarningAlert = ({ title, message, onClose, className = "" }) => {
    return (
        <div className={`bg-yellow-50 border border-yellow-200 rounded-lg p-4 ${className}`}>
            <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="flex-1">
                    {title && <h4 className="font-semibold text-yellow-800 mb-1">{title}</h4>}
                    <p className="text-yellow-700 text-sm">{message}</p>
                </div>
                {onClose && (
                    <button onClick={onClose} className="text-yellow-400 hover:text-yellow-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

/**
 * Info alert box
 */
export const InfoAlert = ({ title, message, onClose, className = "" }) => {
    return (
        <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 ${className}`}>
            <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                    {title && <h4 className="font-semibold text-blue-800 mb-1">{title}</h4>}
                    <p className="text-blue-700 text-sm">{message}</p>
                </div>
                {onClose && (
                    <button onClick={onClose} className="text-blue-400 hover:text-blue-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};
