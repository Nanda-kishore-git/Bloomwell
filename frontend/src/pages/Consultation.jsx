import React, { useState } from 'react';

function Consultation() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    symptoms: ''
  });
  const [showJitsi, setShowJitsi] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleStartConsultation = () => {
    setShowJitsi(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#2B2B2B] mb-8 text-center">Consultation</h1>

        {!showJitsi ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-6">Patient Information</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD6DC] focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD6DC] focus:border-transparent"
                  placeholder="Enter your age"
                />
              </div>
              <div>
                <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-2">Symptoms</label>
                <textarea
                  id="symptoms"
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD6DC] focus:border-transparent"
                  placeholder="Describe your symptoms"
                />
              </div>
              <button
                type="button"
                onClick={handleStartConsultation}
                className="w-full bg-[#FFD6DC] hover:bg-[#FFB6C1] text-[#2B2B2B] font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
              >
                Start 1-Min Consultation
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-6">Video Consultation</h2>
            <div className="aspect-video bg-gray-200 rounded-lg mb-6">
              <iframe
                src="https://meet.jit.si/consultation-room"
                allow="camera; microphone; fullscreen; display-capture"
                className="w-full h-full rounded-lg"
                title="Jitsi Meet"
              ></iframe>
            </div>
            <div className="flex space-x-4">
              <button
                className="bg-[#FFD6DC] hover:bg-[#FFB6C1] text-[#2B2B2B] font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
              >
                Upload Prescription
              </button>
              <button
                className="bg-[#FFB6C1] hover:bg-[#FFD6DC] text-[#2B2B2B] font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
              >
                Order Recommended Products
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Consultation;