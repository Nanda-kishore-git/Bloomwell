import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SuccessModal = ({ isOpen, onClose, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm(); // Clear cart
    onClose();
  };

  const modalVariants = {
    closed: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2
      }
    }
  };

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.2
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
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            variants={modalVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="bg-gradient-to-br from-[#FFF5F7] to-[#FFF0F3] rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 text-center">
              <motion.div
                className="text-6xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 200 }}
              >
                💖
              </motion.div>
              <motion.h2
                className="text-2xl font-bold text-[#8B5CF6] mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Demo Payment Successful
              </motion.h2>
              <motion.p
                className="text-[#6B7280] text-lg mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Your BloomWell order has been placed successfully!
              </motion.p>
              <motion.button
                onClick={handleConfirm}
                className="bg-gradient-to-r from-[#FBB6CE] to-[#FFD6DC] hover:from-[#FBB6CE] hover:to-[#FFB6C1] text-[#2B2B2B] py-3 px-8 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue Shopping
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;