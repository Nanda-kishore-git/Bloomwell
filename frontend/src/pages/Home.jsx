import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Empower Your Wellness Journey</h1>
            <p className="text-xl mb-8">Discover natural solutions for a healthier you</p>
            <div className="space-x-4">
              <Link to="/consultation" className="bg-[#FFD6DC] hover:bg-[#FFB6C1] text-[#2B2B2B] font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300">
                Consult a Doctor
              </Link>
              <Link to="/shop" className="bg-[#FFB6C1] hover:bg-[#FFD6DC] text-[#2B2B2B] font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-[#2B2B2B] mb-2">Track your cycle</h3>
              <p className="text-gray-600">Monitor your menstrual cycle with ease</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-[#2B2B2B] mb-2">Talk to a doctor in 1 min</h3>
              <p className="text-gray-600">Get instant medical advice from experts</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-[#2B2B2B] mb-2">Order herbal wellness kits</h3>
              <p className="text-gray-600">Natural remedies delivered to your door</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FFD6DC] py-4 text-center">
        <p className="text-[#2B2B2B] font-semibold">Developed by 2(A) EME UNIT 💫</p>
      </footer>
    </div>
  );
};

export default Home;