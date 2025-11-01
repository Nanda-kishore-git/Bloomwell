import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Toast from '../components/Toast';
import { useBloomBot } from '../contexts/BloomBotContext';

function Tracker() {
  const { checkContextualResponse } = useBloomBot();
  const [profile, setProfile] = useState(null);
  const [logs, setLogs] = useState({});
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [modalStep, setModalStep] = useState('welcome');

  // Daily tracker form state
  const [trackerData, setTrackerData] = useState({
    cycleStartDate: '',
    cycleLength: '',
    periodDuration: '',
    mood: 'Happy 😊',
    painLevel: 0,
    energyLevel: 0,
    waterIntake: '',
    sleepHours: '',
    stepsWalked: ''
  });
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem('bloomwellProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      setShowOnboarding(true);
      setProfile({ name: 'Priya', age: 23, height: 160, weight: 55 });
    }

    const savedLogs = localStorage.getItem('bloomwellTrackerLogs');
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('bloomwellProfile', JSON.stringify(profile));
    setShowOnboarding(false);
  };

  // Handle tracker form input changes
  const handleTrackerChange = (field, value) => {
    setTrackerData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle saving tracker data
  const handleSaveTracker = () => {
    const existingLogs = JSON.parse(localStorage.getItem('bloomwellTrackerLogs') || '{}');
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    existingLogs[today] = trackerData;
    localStorage.setItem('bloomwellTrackerLogs', JSON.stringify(existingLogs));
    setLogs(existingLogs);
    setShowToast(true);

    // Check for contextual BloomBot response
    checkContextualResponse(trackerData, logs);
  };

  // Calculate BMI
  const calculateBMI = () => {
    if (!profile || !profile.height || !profile.weight) return null;
    const heightInMeters = profile.height / 100;
    return (profile.weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  // Calculate next period date
  const calculateNextPeriod = () => {
    const logEntries = Object.keys(logs).sort().reverse();
    if (!logEntries.length) return null;

    const latestLog = logs[logEntries[0]];
    if (!latestLog.cycleStartDate || !latestLog.cycleLength) return null;

    const cycleStart = new Date(latestLog.cycleStartDate);
    const cycleLength = parseInt(latestLog.cycleLength);

    if (isNaN(cycleLength) || cycleLength <= 0) return null;

    const nextPeriod = new Date(cycleStart);
    nextPeriod.setDate(cycleStart.getDate() + cycleLength);

    return nextPeriod.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Static calendar data for demo - a simple 7x6 grid representing a month
  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const dayNumber = (i - 5) % 31 + 1; // Start from day 1, adjust for month start
    return dayNumber > 0 && dayNumber <= 31 ? dayNumber : null;
  });

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Generate mock data for last 7 days
  const generateMockAnalytics = () => {
    const moodOptions = ['Happy 😊', 'Normal 🙂', 'Irritable 😠', 'Sad 😢'];
    const moodValues = { 'Happy 😊': 4, 'Normal 🙂': 3, 'Irritable 😠': 2, 'Sad 😢': 1 };
    const today = new Date();
    const moodData = [];
    const waterData = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      // Check for actual log data
      const logData = logs[dateStr];
      let mood = moodOptions[Math.floor(Math.random() * moodOptions.length)];
      let water = (Math.random() * 2.5 + 0.5).toFixed(1); // 0.5-3.0L

      if (logData) {
        mood = logData.mood || mood;
        water = logData.waterIntake || water;
      }

      const dayLabel = date.toLocaleDateString('en-US', { weekday: 'short' });
      moodData.push({
        day: dayLabel,
        mood: moodValues[mood],
        emoji: mood.split(' ')[1]
      });
      waterData.push({
        day: dayLabel,
        water: parseFloat(water)
      });
    }

    return { moodData, waterData };
  };

  const { moodData, waterData } = generateMockAnalytics();

  return (
    <div className="h-screen bg-[#FFD6DC] relative flex flex-col">
      {/* Onboarding Modal */}
      {showOnboarding && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl"
          >
            {modalStep === 'welcome' && (
              <div className="text-center">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-16 h-16 bg-gradient-to-br from-pink-200 to-peach-200 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <span className="text-3xl">🌸</span>
                </motion.div>
                <motion.h2
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl font-bold text-gray-800 mb-2"
                >
                  Welcome to BloomWell Tracker
                </motion.h2>
                <motion.p
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-gray-600 mb-6"
                >
                  Let's get started with your wellness journey!
                </motion.p>
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  onClick={() => setModalStep('profile')}
                  className="bg-gradient-to-r from-pink-300 to-peach-300 text-white px-8 py-3 rounded-full font-semibold hover:from-pink-400 hover:to-peach-400 transition-all duration-300 shadow-lg"
                >
                  Get Started
                </motion.button>
              </div>
            )}

            {modalStep === 'profile' && (
              <div>
                <motion.h2
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-2xl font-bold text-gray-800 mb-6 text-center"
                >
                  Tell Us About Yourself
                </motion.h2>
                <motion.form
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input
                      type="number"
                      value={profile.age}
                      onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                    <input
                      type="number"
                      value={profile.height}
                      onChange={(e) => setProfile({ ...profile, height: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      value={profile.weight}
                      onChange={(e) => setProfile({ ...profile, weight: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                      required
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-green-300 to-teal-300 text-white py-3 rounded-lg font-semibold hover:from-green-400 hover:to-teal-400 transition-all duration-300 shadow-lg"
                  >
                    Start Tracking
                  </motion.button>
                </motion.form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
        }}
      ></div>

      <div className="relative z-10 flex-1 p-8 flex flex-col">
        {/* Profile Summary Card */}
        {profile && (
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-pink-50 rounded-2xl shadow-md p-6 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-200 to-peach-200 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🌸</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Hello {profile.name} 👋</h2>
                  <p className="text-gray-600">
                    BMI: {calculateBMI()} • Your next period is expected around {calculateNextPeriod() || 'N/A'} 🌸
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 font-medium">BloomWell</div>
                <div className="w-12 h-12 bg-gradient-to-br from-pink-300 to-peach-300 rounded-full flex items-center justify-center mt-1">
                  <span className="text-lg font-bold text-white">B</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        <h1 className="text-5xl font-bold text-[#2B2B2B] mb-8 text-center">Wellness Tracker</h1>

        {/* Compact Dashboard Grid */}
        <div className="flex-1 mb-8 grid grid-cols-1 lg:grid-cols-3 gap-8" style={{ gridTemplateColumns: '0.33fr 0.42fr 0.25fr', alignItems: 'start' }}>
          {/* Left Column: Wellness Tracker Calendar */}
          <div className="space-y-8">
            <div className="bg-white bg-opacity-90 rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-4 text-center">Wellness Tracker Calendar</h2>
              <div className="text-center text-sm text-gray-600 mb-4">October 2024</div>

              {/* Day Names */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((day) => (
                  <div key={day} className="text-center font-medium text-[#2B2B2B] py-1 text-xs">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`aspect-square rounded-lg border flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                      day
                        ? 'bg-[#FFD6DC] border-[#FFB6C1] text-[#2B2B2B] hover:bg-[#FFB6C1] cursor-pointer'
                        : 'border-transparent'
                    }`}
                    style={{ transform: 'scale(1.12)' }}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column: Daily Wellness Log + Charts */}
          <div className="space-y-6">
            {/* Daily Wellness Log */}
            <div className="bg-white bg-opacity-90 rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-4 text-center">Daily Wellness Log</h2>

              {/* Compact Stats Display */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl mb-1">{trackerData.waterIntake || '0'}</div>
                  <div className="text-xs text-gray-600">Water (L)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">{trackerData.sleepHours || '0'}</div>
                  <div className="text-xs text-gray-600">Sleep (hrs)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">{trackerData.stepsWalked || '0'}</div>
                  <div className="text-xs text-gray-600">Steps</div>
                </div>
              </div>

              {/* Hours of Sleep Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Hours of Sleep</label>
                <div className="flex items-center">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="24"
                    value={trackerData.sleepHours}
                    onChange={(e) => handleTrackerChange('sleepHours', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 bg-white text-sm"
                    placeholder="7.5"
                  />
                  <span className="ml-2 text-gray-600">🛏️</span>
                </div>
              </div>

              {/* Quick Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mood</label>
                  <select
                    value={trackerData.mood}
                    onChange={(e) => handleTrackerChange('mood', e.target.value)}
                    className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 bg-white text-sm"
                  >
                    <option value="Happy 😊">Happy 😊</option>
                    <option value="Normal 🙂">Normal 🙂</option>
                    <option value="Irritable 😠">Irritable 😠</option>
                    <option value="Sad 😢">Sad 😢</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pain Level</label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={trackerData.painLevel}
                      onChange={(e) => handleTrackerChange('painLevel', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-pink"
                    />
                    <div className="text-center text-sm mt-1">{trackerData.painLevel}/10</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Energy Level</label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={trackerData.energyLevel}
                      onChange={(e) => handleTrackerChange('energyLevel', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-green"
                    />
                    <div className="text-center text-sm mt-1">{trackerData.energyLevel}/10</div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="text-center mt-6">
                  <motion.button
                    onClick={handleSaveTracker}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-pink-300 to-peach-300 text-white px-6 py-2 rounded-full text-sm font-semibold hover:from-pink-400 hover:to-peach-400 transition-all duration-300 shadow-lg"
                  >
                    Save Today's Log
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Mini Analytics Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Mood Trend Chart */}
              <div className="bg-white bg-opacity-90 rounded-2xl shadow-md p-4">
                <h3 className="text-sm font-semibold text-[#2B2B2B] mb-2 text-center flex items-center justify-center">
                  <span className="text-lg mr-1">😊</span>
                  Mood Trend
                </h3>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={moodData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="day"
                        stroke="#666"
                        fontSize={10}
                        tick={{ fill: '#666' }}
                      />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: '1px solid #e1e5e9',
                          borderRadius: '4px',
                          fontSize: '10px'
                        }}
                        formatter={(value, name, props) => [
                          `${props.payload.emoji} ${['Sad', 'Irritable', 'Normal', 'Happy'][value - 1]}`,
                          'Mood'
                        ]}
                      />
                      <Bar
                        dataKey="mood"
                        fill="#f8bbd9"
                        stroke="#f48fb1"
                        strokeWidth={1}
                        radius={[2, 2, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Water Intake Chart */}
              <div className="bg-white bg-opacity-90 rounded-2xl shadow-md p-4">
                <h3 className="text-sm font-semibold text-[#2B2B2B] mb-2 text-center flex items-center justify-center">
                  <span className="text-lg mr-1">💧</span>
                  Water Intake
                </h3>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={waterData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="day"
                        stroke="#666"
                        fontSize={10}
                        tick={{ fill: '#666' }}
                      />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: '1px solid #e1e5e9',
                          borderRadius: '4px',
                          fontSize: '10px'
                        }}
                        formatter={(value) => [`${value}L`, 'Water Intake']}
                      />
                      <Line
                        type="monotone"
                        dataKey="water"
                        stroke="#c8e6c9"
                        strokeWidth={2}
                        dot={{ fill: '#81c784', strokeWidth: 1, r: 2 }}
                        activeDot={{ r: 3, fill: '#4caf50' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Today's Wellness Notes */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-4 text-center">Today's Wellness Notes</h2>
              <div className="space-y-4">
                {/* Note Card 1 */}
                <div className="bg-white bg-opacity-90 rounded-2xl shadow-md p-4 flex flex-col items-center">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-[#FFD6DC] rounded-full flex items-center justify-center mr-3">
                      <span className="text-lg">💧</span>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#2B2B2B]">Hydration Reminder</h3>
                      <p className="text-xs text-gray-600">Daily Goal</p>
                    </div>
                  </div>
                  <div className="relative w-24 h-24 mb-3">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="10"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="#FFD6DC"
                        strokeWidth="10"
                        strokeDasharray={`${Math.PI * 100 * 0.75} ${Math.PI * 100}`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-[#2B2B2B]">75%</span>
                    </div>
                  </div>
                  <p className="text-[#2B2B2B] font-medium text-sm text-center">Drink more water today.</p>
                </div>

                {/* Note Card 2 */}
                <div className="bg-white bg-opacity-90 rounded-2xl shadow-md p-4 flex flex-col items-center">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-[#FFD6DC] rounded-full flex items-center justify-center mr-3">
                      <span className="text-lg">🧘‍♀️</span>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#2B2B2B]">Wellness Activity</h3>
                      <p className="text-xs text-gray-600">Hormone Balance</p>
                    </div>
                  </div>
                  <div className="relative w-24 h-24 mb-3">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="10"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="#FFD6DC"
                        strokeWidth="10"
                        strokeDasharray={`${Math.PI * 100 * 0.5} ${Math.PI * 100}`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-[#2B2B2B]">50%</span>
                    </div>
                  </div>
                  <p className="text-[#2B2B2B] font-medium text-sm text-center">Do 15 min yoga for hormone balance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        <Toast
          message="✨ Your wellness log has been updated for today, Priya!"
          isVisible={showToast}
          onClose={() => setShowToast(false)}
        />

        <style jsx>{`
          .slider-pink::-webkit-slider-thumb {
            appearance: none;
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #f8bbd9;
            cursor: pointer;
            border: 2px solid #f48fb1;
          }
          .slider-green::-webkit-slider-thumb {
            appearance: none;
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #c8e6c9;
            cursor: pointer;
            border: 2px solid #81c784;
          }
        `}</style>
      </div>
    </div>
  );
}

export default Tracker;