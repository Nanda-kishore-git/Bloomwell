import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Consultation from './pages/Consultation';
import Shop from './pages/Shop';
import Tracker from './pages/Tracker';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import BloomBot from './components/BloomBot';
import { BloomBotProvider } from './contexts/BloomBotContext';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <BloomBotProvider>
      <Router>
        <div className="App">
        {/* Navigation Bar */}
        <nav className="bg-[#FFD6DC] shadow-lg p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link to="/" className="text-[#2B2B2B] font-bold text-xl font-poppins">BloomWell</Link>
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="text-[#2B2B2B] hover:text-[#FFB6C1] font-medium font-poppins transition-colors duration-300">Home</Link>
              <Link to="/about" className="text-[#2B2B2B] hover:text-[#FFB6C1] font-medium font-poppins transition-colors duration-300">About</Link>
              <Link to="/consultation" className="text-[#2B2B2B] hover:text-[#FFB6C1] font-medium font-poppins transition-colors duration-300">Consultation</Link>
              <Link to="/shop" className="text-[#2B2B2B] hover:text-[#FFB6C1] font-medium font-poppins transition-colors duration-300">Shop</Link>
              <Link to="/tracker" className="text-[#2B2B2B] hover:text-[#FFB6C1] font-medium font-poppins transition-colors duration-300">Tracker</Link>
              <Link to="/blog" className="text-[#2B2B2B] hover:text-[#FFB6C1] font-medium font-poppins transition-colors duration-300">Blog</Link>
              <Link to="/contact" className="text-[#2B2B2B] hover:text-[#FFB6C1] font-medium font-poppins transition-colors duration-300">Contact</Link>
            </div>
            {/* Mobile menu button - simplified for now */}
            <div className="md:hidden">
              <span className="text-[#2B2B2B] font-medium">Menu</span>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        </div>
        <BloomBot />
      </Router>
    </BloomBotProvider>
  );
}

export default App;