import React, { useEffect, useRef } from "react";

const MoadalLayout = ({ children }) => {
  const targetRef = useRef(null);
  const scrollToTarget = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    scrollToTarget();
  }, []);
  return (
    <div
      ref={targetRef}
      className="w-screen h-full bg-black bg-opacity-50 overflow-hidden z-50 absolute bottom-0 flex items-center justify-center"
    >
      {children}
    </div>
  );
};

export default MoadalLayout;
