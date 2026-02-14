import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const NavigationProgress = () => {
    const [isNavigating, setIsNavigating] = useState(false);
    const [progress, setProgress] = useState(0);
    const location = useLocation();

    useEffect(() => {
        // Start progress on route change
        setIsNavigating(true);
        setProgress(0);

        // Simulate progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 90) {
                    clearInterval(interval);
                    return 90;
                }
                return prev + 10;
            });
        }, 100);

        // Complete progress after a short delay
        const timeout = setTimeout(() => {
            setProgress(100);
            setTimeout(() => {
                setIsNavigating(false);
                setProgress(0);
            }, 200);
        }, 500);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [location.pathname]);

    if (!isNavigating) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-50">
            <div
                className="h-1 bg-green transition-all duration-200 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};
