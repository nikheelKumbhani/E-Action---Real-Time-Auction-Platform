import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export const Loader = () => {
  const [loaderRoot, setLoaderRoot] = useState(null);

  useEffect(() => {
    setLoaderRoot(document.getElementById("loader"));
  }, []);

  if (!loaderRoot) return null; // ✅ Prevents crash if `#loader` is missing

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-full bg-gray-950/80 z-[200]">
      <div className="fixed top-1/2 left-[45%] transform -translate-x-1/2 -translate-y-1/2">
        <div className="custom-loader z-50">H</div>
      </div>
    </div>,
    loaderRoot
  );
};
