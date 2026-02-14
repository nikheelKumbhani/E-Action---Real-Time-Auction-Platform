import { Search, X } from "lucide-react";
import { useState } from "react";

/**
 * SearchBar component for text search
 */
export const SearchBar = ({
    value = '',
    onChange,
    onClear,
    placeholder = "Search products...",
    className = ""
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleClear = () => {
        if (onClear) {
            onClear();
        } else {
            onChange('');
        }
    };

    return (
        <div className={`relative ${className}`}>
            <div className={`flex items-center border rounded-lg transition-all ${isFocused ? 'border-green ring-2 ring-green/20' : 'border-gray-300'
                }`}>
                <Search className="w-5 h-5 text-gray-400 ml-3" />
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    className="flex-1 px-3 py-2 outline-none bg-transparent"
                />
                {value && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="p-2 hover:bg-gray-100 rounded-full mr-2 transition-colors"
                        aria-label="Clear search"
                    >
                        <X className="w-4 h-4 text-gray-500" />
                    </button>
                )}
            </div>
        </div>
    );
};
