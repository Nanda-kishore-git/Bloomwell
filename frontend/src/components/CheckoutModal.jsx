import React from 'react';

const CheckoutModal = ({ isOpen, onClose, total }) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    alert('Order confirmed! Thank you for your purchase.');
    onClose();
    window.location.reload(); // Simple way to reset cart
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Checkout</h2>
        <div className="mb-4">
          <p className="text-gray-600">Total Amount: <span className="font-semibold text-gray-800">₹{Math.round(total)}</span></p>
          <p className="text-sm text-gray-500 mt-2">Mock payment processing - no real payment will be made.</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleConfirm}
            className="flex-1 bg-[#FFD6DC] hover:bg-[#FFB6C1] text-[#2B2B2B] py-2 px-4 rounded-md transition-colors duration-200"
          >
            Confirm Order
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;