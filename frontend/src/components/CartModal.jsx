import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { parseINR, formatINR } from '../utils/currency';
import SafeImage from './SafeImage';

const CartModal = ({ cartItems, onRemoveFromCart, onCheckoutSuccess, onClose, isOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const total = cartItems.reduce((sum, item) => sum + parseINR(item.price), 0);

  const handleCheckout = async () => {
    if (isLoading || cartItems.length === 0) return;
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random success/failure
          Math.random() > 0.1 ? resolve() : reject(new Error('Payment failed'));
        }, 2000);
      });
      onCheckoutSuccess();
    } catch (error) {
      console.error('Checkout failed:', error);
      // You could show an error message here
      alert('Checkout failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const drawerVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'tween',
        duration: 0.3
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.3
      }
    }
  };

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-gradient-to-b from-[#FFF5F7] to-[#FFF0F3] shadow-2xl z-50 overflow-y-auto"
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#8B5CF6]">Your Cart</h2>
                <button
                  onClick={onClose}
                  className="text-[#A78BFA] hover:text-[#8B5CF6] text-3xl font-bold transition-colors duration-200"
                >
                  ×
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-[#A78BFA] text-6xl mb-4">🛒</div>
                  <p className="text-[#6B7280] text-lg">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={index}
                        className="bg-white rounded-xl shadow-md p-4 flex items-center space-x-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2, delay: index * 0.1 }}
                      >
                        <SafeImage
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg shadow-sm"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#2D3748] text-lg">{item.name}</h3>
                          <p className="text-[#8B5CF6] font-bold text-lg">{item.price}</p>
                        </div>
                        <button
                          onClick={() => onRemoveFromCart(index)}
                          className="bg-[#FED7E2] hover:bg-[#FBB6CE] text-[#E53E3E] px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200"
                        >
                          Remove
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-semibold text-[#2D3748]">Total:</span>
                      <span className="text-2xl font-bold text-[#8B5CF6]">{formatINR(total)}</span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-[#FBB6CE] to-[#FFD6DC] hover:from-[#FBB6CE] hover:to-[#FFB6C1] text-[#2B2B2B] py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Processing...' : 'Proceed to Checkout'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartModal;