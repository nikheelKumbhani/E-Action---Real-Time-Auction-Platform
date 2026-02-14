export const ProfileSkeleton = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6 animate-pulse">
            {/* Profile header skeleton */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-6">
                    {/* Avatar */}
                    <div className="w-24 h-24 bg-gray-200 rounded-full"></div>

                    {/* User info */}
                    <div className="flex-1 space-y-3">
                        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="flex gap-2">
                            <div className="h-6 bg-gray-200 rounded w-20"></div>
                            <div className="h-6 bg-gray-200 rounded w-24"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile details skeleton */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>

                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                ))}
            </div>

            {/* Activity skeleton */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="h-16 bg-gray-200 rounded"></div>
                    ))}
                </div>
            </div>
        </div>
    );
};
