import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import ContactToast from '../components/ContactToast';

function Contact() {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setToastMessage('Thank you 💌 Your message has been recorded for demo purposes.');
    setToastVisible(true);
    formRef.current.reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-[#2B2B2B] mb-12">Contact Us</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-6">Send us a Message</h2>
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB6C1]"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB6C1]"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB6C1]"
                />
              </div>
              <motion.button
                type="submit"
                className="w-full bg-[#FFD6DC] text-[#2B2B2B] font-semibold py-3 px-6 rounded-lg shadow-md"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: '#FFB6C1',
                  transition: { duration: 0.3 }
                }}
              >
                Send Message
              </motion.button>
            </form>
          </div>

          {/* Info Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-6">Get in Touch</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-[#2B2B2B] mb-1">Email</h3>
                <p className="text-gray-600">info@bloomwell.in</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-[#2B2B2B] mb-1">Social Media</h3>
                <div className="flex space-x-4">
                  <a href="https://instagram.com/bloomwell" target="_blank" rel="noopener noreferrer" className="text-[#FFB6C1] hover:text-[#FFD6DC] font-medium">Instagram</a>
                  <a href="https://youtube.com/bloomwell" target="_blank" rel="noopener noreferrer" className="text-[#FFB6C1] hover:text-[#FFD6DC] font-medium">YouTube</a>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-[#2B2B2B] mb-1">Address</h3>
                <p className="text-gray-600">Bloomwell Wellness Center<br />123 Natural Health Street<br />Wellness City, WC 12345</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContactToast
        message={toastMessage}
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}

export default Contact;