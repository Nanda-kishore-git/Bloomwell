import React, { useState } from 'react';
import ShopCard from '../components/ShopCard';
import CartModal from '../components/CartModal';
import SuccessModal from '../components/SuccessModal';
import Toast from '../components/Toast';

function Shop() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const products = [
    {
      id: 1,
      name: "Natural Face Cream",
      description: ["Hydrates skin deeply", "Reduces wrinkles", "Organic ingredients"],
      price: "₹1,999",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y5ZmFmYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZmlsbD0iIzZiNzI4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0Ij5OYXR1cmFsIEZhY2UgQ3JlYW08L3RleHQ+PC9zdmc+"
    },
    {
      id: 2,
      name: "Herbal Hair Oil",
      description: ["Strengthens hair roots", "Reduces hair fall", "Promotes growth"],
      price: "₹1,499",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y5ZmFmYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZmlsbD0iIzZiNzI4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0Ij5IZXJiYWwgSGFpciBPaWw8L3RleHQ+PC9zdmc+"
    },
    {
      id: 3,
      name: "Vitamin C Serum",
      description: ["Brightens skin tone", "Fights free radicals", "Reduces dark spots"],
      price: "₹2,799",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y5ZmFmYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZmlsbD0iIzZiNzI4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0Ij5WaXRhbWluIEMgU2VydW08L3RleHQ+PC9zdmc+"
    },
    {
      id: 4,
      name: "Aloe Vera Gel",
      description: ["Soothes irritated skin", "Moisturizes effectively", "Natural healing"],
      price: "₹999",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y5ZmFmYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZmlsbD0iIzZiNzI4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0Ij5BbG9lIFZlcmEgR2VsPC90ZXh0Pjwvc3ZnPg=="
    },
    {
      id: 5,
      name: "Green Tea Mask",
      description: ["Detoxifies skin", "Tightens pores", "Anti-aging properties"],
      price: "₹799",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y5ZmFmYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZmlsbD0iIzZiNzI4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0Ij5HcmVlbiBUZWEgTWFzazwvdGV4dD48L3N2Zz4="
    },
    {
      id: 6,
      name: "Lavender Essential Oil",
      description: ["Relieves stress", "Improves sleep", "Promotes relaxation"],
      price: "₹1,899",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y5ZmFmYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZmlsbD0iIzZiNzI4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0Ij5MYXZlbmRlciBFc3NlbnRpYWwgT2lsPC90ZXh0Pjwvc3ZnPg=="
    }
  ];

  const handleAddToCart = (product) => {
    setCartItems(prev => [...prev, product]);
    setToastMessage('Added to cart 🛍️');
    setIsToastVisible(true);
  };

  const handleRemoveFromCart = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleCheckoutSuccess = () => {
    setIsCartOpen(false);
    setIsSuccessOpen(true);
  };

  const handleSuccessConfirm = () => {
    setCartItems([]); // Clear cart
    setIsSuccessOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed top-4 right-4 bg-[#FFB6C1] hover:bg-[#FFD6DC] text-[#2B2B2B] px-4 py-2 rounded-md font-semibold z-10"
      >
        View Cart ({cartItems.length})
      </button>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shop</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {products.map(product => (
          <ShopCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
      <CartModal
        isOpen={isCartOpen}
        cartItems={cartItems}
        onRemoveFromCart={handleRemoveFromCart}
        onCheckoutSuccess={handleCheckoutSuccess}
        onClose={() => setIsCartOpen(false)}
      />
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        onConfirm={handleSuccessConfirm}
      />
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />
    </div>
  );
}

export default Shop;