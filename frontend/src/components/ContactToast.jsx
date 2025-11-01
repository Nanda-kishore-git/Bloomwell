import React, { useEffect } from 'react';

function ContactToast({ message, isVisible, onClose }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-[#FFB6C1] text-white px-6 py-4 text-lg min-w-[320px] rounded-lg shadow-xl z-50 transition-opacity duration-300">
      {message}
    </div>
  );
}

export default ContactToast;