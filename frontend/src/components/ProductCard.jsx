import React from 'react';
import { convertUSDToINR } from '../utils/currency';
import SafeImage from './SafeImage';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <SafeImage
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
        <ul className="text-sm text-gray-600 mb-3">
          {product.benefits.map((benefit, index) => (
            <li key={index} className="mb-1">• {benefit}</li>
          ))}
        </ul>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-green-600">₹{Math.round(convertUSDToINR(product.price))}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-[#FFB6C1] hover:bg-[#FFD6DC] text-[#2B2B2B] px-4 py-2 rounded-md transition-colors duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;