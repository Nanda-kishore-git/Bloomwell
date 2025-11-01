import React from 'react';
import { motion } from 'framer-motion';
import SafeImage from './SafeImage';

const ShopCard = ({ product, onAddToCart }) => {
  return (
    <motion.div
      className="bg-gradient-to-br from-[#FFF5F7] to-[#FFF0F3] rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.95 }}
    >
      <SafeImage
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-[#2D3748] mb-2">{product.name}</h3>
        <ul className="text-sm text-[#6B7280] mb-3">
          {product.description && product.description.map((benefit, index) => (
            <li key={index} className="mb-1">• {benefit}</li>
          ))}
        </ul>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-[#8B5CF6]">{product.price}</span>
          <motion.button
            onClick={() => onAddToCart(product)}
            className="bg-gradient-to-r from-[#FBB6CE] to-[#FFD6DC] hover:from-[#FBB6CE] hover:to-[#FFB6C1] text-[#2B2B2B] px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ShopCard;