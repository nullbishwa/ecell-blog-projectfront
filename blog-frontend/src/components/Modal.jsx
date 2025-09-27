import React from "react";

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-1/2 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-red-500">
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
