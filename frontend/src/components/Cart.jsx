import React from 'react';
import { convertUSDToINR } from '../utils/currency';

const Cart = ({ cartItems, onRemoveFromCart, onCheckout, onClose }) => {
  const total = cartItems.reduce((sum, item) => sum + convertUSDToINR(item.price), 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-2 mb-4">
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                <div>
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-600">₹{Math.round(convertUSDToINR(item.price))}</p>
                </div>
                <button
                  onClick={() => onRemoveFromCart(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total: ₹{Math.round(total)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-[#FFD6DC] hover:bg-[#FFB6C1] text-[#2B2B2B] py-2 px-4 rounded-md transition-colors duration-200"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
      </div>
    </div>
  );
};

export default Cart;