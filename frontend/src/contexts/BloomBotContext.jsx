import React, { createContext, useContext, useState, useEffect } from 'react';

const BloomBotContext = createContext();

export const BloomBotProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [trackerEvents, setTrackerEvents] = useState([]);

  // Function to send a message to BloomBot
  const sendMessage = (message, type = 'normal') => {
    const botMessage = {
      id: Date.now(),
      sender: 'bot',
      text: message,
      timestamp: new Date().toISOString(),
      type
    };
    setMessages(prev => [...prev, botMessage]);
  };

  // Function to add tracker event for context awareness
  const addTrackerEvent = (event) => {
    setTrackerEvents(prev => [...prev, { ...event, timestamp: new Date().toISOString() }]);
  };

  // Check for contextual responses based on tracker data
  const checkContextualResponse = (trackerData, logs) => {
    const mood = trackerData.mood;
    const energyLevel = trackerData.energyLevel;

    // Check for low mood or energy
    if ((mood === 'Sad 😢' || mood === 'Irritable 😠') || energyLevel < 4) {
      sendMessage("I see your mood has been low lately, Priya. Would you like some relaxation tips? 🧘‍♀️", 'contextual');
      return;
    }

    // Check for mood improvement
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const todayLog = logs[today];
    const yesterdayLog = logs[yesterday];

    if (todayLog && yesterdayLog) {
      const moodValues = { 'Happy 😊': 4, 'Normal 🙂': 3, 'Irritable 😠': 2, 'Sad 😢': 1 };
      const todayMoodValue = moodValues[todayLog.mood] || 3;
      const yesterdayMoodValue = moodValues[yesterdayLog.mood] || 3;

      if (todayMoodValue > yesterdayMoodValue) {
        sendMessage("Glad to see you're feeling better today, Priya 🌼 Keep it up!", 'contextual');
      }
    }
  };

  return (
    <BloomBotContext.Provider value={{
      messages,
      setMessages,
      sendMessage,
      trackerEvents,
      addTrackerEvent,
      checkContextualResponse
    }}>
      {children}
    </BloomBotContext.Provider>
  );
};

export const useBloomBot = () => {
  const context = useContext(BloomBotContext);
  if (!context) {
    throw new Error('useBloomBot must be used within a BloomBotProvider');
  }
  return context;
};