import React from 'react';

function About() {
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#2B2B2B] mb-4">About BloomWell</h1>
        </div>

        {/* PCOS/PCOD Info Section */}
        <div className="bg-gray-50 rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-4">Understanding PCOS/PCOD</h2>
          <p className="text-gray-700 leading-relaxed">
            Polycystic Ovary Syndrome (PCOS) or Polycystic Ovary Disease (PCOD) is a hormonal disorder common among women of reproductive age. It affects the ovaries, leading to irregular periods, excess male hormone (androgen) levels, and polycystic ovaries. Symptoms may include irregular menstruation, excess hair growth, acne, weight gain, and infertility. Our platform provides comprehensive support and natural solutions to help manage and alleviate these symptoms effectively.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-[#FFD6DC] rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-4">Our Mission</h2>
          <p className="text-[#2B2B2B] leading-relaxed text-lg">
            BloomWell is dedicated to empowering women with PCOS/PCOD through natural, holistic wellness solutions that promote hormonal balance and overall well-being.
          </p>
        </div>

        {/* Infographic Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-8 text-center">Our Holistic Approach</h2>
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Wellness Journey Infographic: Awareness → Consultation → Herbal Care → Tracking → Balance"
              className="w-full max-w-4xl mx-auto rounded-xl shadow-md"
            />
            <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
              <div className="bg-[#FFB6C1] rounded-lg p-4 shadow-md">
                <h3 className="font-semibold text-[#2B2B2B]">Awareness</h3>
                <p className="text-sm text-gray-700">Educate and inform</p>
              </div>
              <div className="bg-[#FFD6DC] rounded-lg p-4 shadow-md">
                <h3 className="font-semibold text-[#2B2B2B]">Consultation</h3>
                <p className="text-sm text-gray-700">Expert guidance</p>
              </div>
              <div className="bg-[#FFB6C1] rounded-lg p-4 shadow-md">
                <h3 className="font-semibold text-[#2B2B2B]">Herbal Care</h3>
                <p className="text-sm text-gray-700">Natural remedies</p>
              </div>
              <div className="bg-[#FFD6DC] rounded-lg p-4 shadow-md">
                <h3 className="font-semibold text-[#2B2B2B]">Tracking</h3>
                <p className="text-sm text-gray-700">Monitor progress</p>
              </div>
              <div className="bg-[#FFB6C1] rounded-lg p-4 shadow-md">
                <h3 className="font-semibold text-[#2B2B2B]">Balance</h3>
                <p className="text-sm text-gray-700">Achieve harmony</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;