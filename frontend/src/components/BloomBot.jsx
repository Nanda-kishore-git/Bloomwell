import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useBloomBot } from '../contexts/BloomBotContext';

const BloomBot = () => {
  const { messages, setMessages, sendMessage: sendContextMessage } = useBloomBot();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentTypingMessage, setCurrentTypingMessage] = useState('');
  const [width, setWidth] = useState(320);
  const [height, setHeight] = useState(384);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeDirection, setResizeDirection] = useState('');
  const [corner, setCorner] = useState('bottom-right');
  const [layoutMode, setLayoutMode] = useState('expanded');
  const messagesEndRef = useRef(null);
  const chatWindowRef = useRef(null);

  // Responsive dimension handling and corner positioning
  useEffect(() => {
    const updateResponsiveDimensions = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      let newCorner = 'bottom-right';
      let newWidth = width;
      let newHeight = height;

      if (screenWidth < 768) { // Mobile - button and chat in bottom-right
        newCorner = 'bottom-right';
        newWidth = Math.max(280, screenWidth - 32);
        newHeight = Math.max(350, screenHeight - 200);
      } else if (screenWidth < 1024) { // Tablet - button and chat in bottom-right
        newCorner = 'bottom-right';
        newWidth = Math.min(400, screenWidth - 32);
        newHeight = Math.min(500, screenHeight - 200);
      } else { // Desktop - button and chat always in bottom-right
        newCorner = 'bottom-right';
        // Keep current width/height for desktop
      }

      if (!isFullScreen) {
        if (newWidth !== width) setWidth(newWidth);
        if (newHeight !== height) setHeight(newHeight);
      }
      setCorner(newCorner);
    };

    updateResponsiveDimensions();
    window.addEventListener('resize', updateResponsiveDimensions);
    return () => window.removeEventListener('resize', updateResponsiveDimensions);
  }, [isFullScreen, width, height, isOpen]);

  // Log screen size and layout metrics for debugging responsiveness
  useEffect(() => {
    const logLayoutMetrics = () => {
      console.log('BloomBot Layout Debug:', {
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        isMobile: window.innerWidth < 768,
        isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
        isDesktop: window.innerWidth >= 1024,
        chatWidth: isFullScreen ? window.innerWidth : width,
        chatHeight: isFullScreen ? window.innerHeight : height,
        chatFitsScreen: (isFullScreen ? window.innerWidth : width) <= window.innerWidth &&
                        (isFullScreen ? window.innerHeight : height) <= window.innerHeight,
        buttonPosition: { bottom: 24, right: 24 },
        chatWindowPosition: isFullScreen ? { bottom: 0, right: 0 } : { bottom: 80, right: 24 }
      });
    };

    logLayoutMetrics();
    window.addEventListener('resize', logLayoutMetrics);
    return () => window.removeEventListener('resize', logLayoutMetrics);
  }, [width, height, isFullScreen]);

  // Additional logging when chat opens/closes
  useEffect(() => {
    if (isOpen) {
      console.log('BloomBot opened - checking input area sizing');
      setTimeout(() => {
        if (chatWindowRef.current) {
          const inputArea = chatWindowRef.current.querySelector('textarea');
          const sendButton = chatWindowRef.current.querySelector('button');
          if (inputArea && sendButton) {
            console.log('Input sizing:', {
              textareaWidth: inputArea.offsetWidth,
              textareaHeight: inputArea.offsetHeight,
              buttonWidth: sendButton.offsetWidth,
              buttonHeight: sendButton.offsetHeight,
              containerWidth: inputArea.parentElement.offsetWidth
            });
          }
        }
      }, 100);
    }
  }, [isOpen]);

  // Fetch initial credits from backend and sync with localStorage on mount
  // useEffect(() => {
  //   const fetchCredits = async () => {
  //     try {
  //       console.log('BloomBot: Fetching credits from backend at http://localhost:3000/api/users/credits');
  //       const response = await axios.get('http://localhost:3000/api/users/credits');
  //       const backendCredits = response.data.credits;
  //       console.log('BloomBot: Backend credits response:', backendCredits);
  //       setRemainingCredits(backendCredits);
  //       localStorage.setItem('bloomBotCredits', backendCredits.toString());
  //       console.log('BloomBot: Successfully synced credits with backend');
  //     } catch (error) {
  //       console.error('BloomBot: Failed to fetch credits from backend:', error);
  //       console.error('BloomBot: Error details:', {
  //         message: error.message,
  //         status: error.response?.status,
  //         data: error.response?.data
  //       });
  //       // If backend fetch fails, rely on localStorage value set above
  //     }
  //   };

  //   fetchCredits();
  // }, []);

  // Clear chat history on page refresh/restart
  useEffect(() => {
    const clearChatOnUnload = () => {
      localStorage.removeItem('bloomBotMessages');
      sessionStorage.removeItem('bloomBotMessages');
    };

    const clearChatOnLoad = () => {
      // Clear any existing chat history immediately on page load
      localStorage.removeItem('bloomBotMessages');
      sessionStorage.removeItem('bloomBotMessages');
      setMessages([]); // Reset to empty state
    };

    // Clear chat history when page loads/refreshes
    clearChatOnLoad();

    // Also clear on beforeunload for redundancy
    window.addEventListener('beforeunload', clearChatOnUnload);

    return () => {
      window.removeEventListener('beforeunload', clearChatOnUnload);
    };
  }, []);

  // Load dimensions from localStorage on mount (keep UI state but not chat)
  useEffect(() => {
    const savedWidth = localStorage.getItem('bloomBotWidth');
    const savedHeight = localStorage.getItem('bloomBotHeight');
    const savedIsFullScreen = localStorage.getItem('bloomBotIsFullScreen');
    if (savedWidth) {
      const parsedWidth = parseInt(savedWidth, 10);
      if (!isNaN(parsedWidth)) setWidth(parsedWidth);
      else console.warn('BloomBot: Invalid width value in localStorage, using default');
    }
    if (savedHeight) {
      const parsedHeight = parseInt(savedHeight, 10);
      if (!isNaN(parsedHeight)) setHeight(parsedHeight);
      else console.warn('BloomBot: Invalid height value in localStorage, using default');
    }
    if (savedIsFullScreen) {
      try {
        setIsFullScreen(JSON.parse(savedIsFullScreen));
      } catch (fullscreenError) {
        console.error('BloomBot: Error parsing saved fullscreen state:', fullscreenError);
      }
    }
  }, []);

  // Do not save messages to localStorage - chat should reset on refresh
  // Only keep UI state like dimensions

  useEffect(() => {
    try {
      localStorage.setItem('bloomBotWidth', width.toString());
      console.log('BloomBot: Successfully saved width to localStorage');
    } catch (error) {
      console.error('BloomBot: Failed to save width to localStorage:', error);
    }
  }, [width]);

  useEffect(() => {
    try {
      localStorage.setItem('bloomBotHeight', height.toString());
      console.log('BloomBot: Successfully saved height to localStorage');
    } catch (error) {
      console.error('BloomBot: Failed to save height to localStorage:', error);
    }
  }, [height]);

  useEffect(() => {
    try {
      localStorage.setItem('bloomBotIsFullScreen', JSON.stringify(isFullScreen));
      console.log('BloomBot: Successfully saved fullscreen state to localStorage');
    } catch (error) {
      console.error('BloomBot: Failed to save fullscreen state to localStorage:', error);
    }
  }, [isFullScreen]);


  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputMessage,
      timestamp: new Date().toISOString(),
      type: 'normal'
    };

    // Ensure unique ID by incrementing if necessary
    const existingIds = messages.map(msg => msg.id);
    let messageId = userMessage.id;
    while (existingIds.includes(messageId)) {
      messageId++;
    }
    userMessage.id = messageId;

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsTyping(true);

    // Do not save messages to localStorage - chat should reset on refresh

    try {
      console.log('BloomBot: Sending message to backend:', inputMessage);
      const response = await axios.post('/api/chat', {
        message: inputMessage
      });
      console.log('BloomBot: Received response from backend:', response.data);

      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: '',
        timestamp: new Date().toISOString(),
        type: 'normal'
      };

      // Ensure unique ID for bot message
      const existingIds = messages.map(msg => msg.id);
      let botMessageId = botMessage.id;
      while (existingIds.includes(botMessageId)) {
        botMessageId++;
      }
      botMessage.id = botMessageId;

      const updatedMessagesWithBot = [...messages, userMessage, botMessage];
      setMessages(prev => [...prev, botMessage]);

      // Token-by-token rendering
      const replyText = response.data.reply;

      // Do not save messages to localStorage - chat should reset on refresh

      let currentText = '';
      try {
        for (let i = 0; i < replyText.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 20)); // Adjust speed as needed
          currentText += replyText[i];
          setMessages(prev => prev.map(msg =>
            msg.id === botMessage.id ? { ...msg, text: currentText } : msg
          ));
        }
      } catch (renderError) {
        console.error('Error during token-by-token rendering:', renderError);
        setMessages(prev => prev.map(msg =>
          msg.id === botMessage.id ? { ...msg, text: 'Sorry, an error occurred while displaying the message. Please try again.' } : msg
        ));
      }
    } catch (error) {
      // Log actual OpenRouter errors (network, API key issues) but not credit-related
      console.error('BloomBot: API call failed:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });

      const errorMessage = {
        id: Date.now() + Math.random(),
        sender: 'bot',
        text: 'BloomBot is thinking… please try again in a moment 💭',
        timestamp: new Date().toISOString(),
        type: 'normal' // Changed to normal so it doesn't show as error styling
      };
      const updatedMessagesWithError = [...messages, userMessage, errorMessage];
      setMessages(prev => [...prev, errorMessage]);

      // Do not save messages to localStorage - chat should reset on refresh
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    console.log('BloomBot toggleChat:', {
      isOpen: !isOpen,
      corner: 'bottom-right',
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight
    });
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleMouseDown = (e, direction) => {
    if (isFullScreen) return;
    e.preventDefault();
    setIsDragging(true);
    setResizeDirection(direction);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || isFullScreen) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    let newWidth = width;
    let newHeight = height;

    switch (resizeDirection) {
      case 'ne':
        newWidth = Math.max(200, width + deltaX);
        newHeight = Math.max(200, height - deltaY);
        break;
      case 'se':
        newWidth = Math.max(200, width + deltaX);
        newHeight = Math.max(200, height + deltaY);
        break;
      case 'sw':
        newWidth = Math.max(200, width - deltaX);
        newHeight = Math.max(200, height + deltaY);
        break;
      case 'nw':
        newWidth = Math.max(200, width - deltaX);
        newHeight = Math.max(200, height - deltaY);
        break;
    }

    setWidth(newWidth);
    setHeight(newHeight);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setResizeDirection('');
  };

  // Add global mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart, width, height, resizeDirection]);

  // Responsive layout adjustment
  useEffect(() => {
    const handleResize = () => adjustLayout();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const adjustLayout = () => {
    const newLayoutMode = window.innerHeight > 600 ? 'expanded' : 'minimized';
    setLayoutMode(newLayoutMode);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 bg-gradient-to-br from-[#FFB6C1] to-[#FFD6DC] hover:from-[#FFD6DC] hover:to-[#FFE6E8] text-[#2B2B2B] rounded-full p-4 shadow-xl border-2 border-white z-50"
        onClick={toggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 135 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{
          display: isFullScreen ? 'none' : 'block'
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {isOpen ? (
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z" fill="currentColor"/>
          ) : (
            <>
              <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z" fill="currentColor"/>
              <circle cx="9" cy="9" r="1.5" fill="currentColor"/>
              <circle cx="15" cy="9" r="1.5" fill="currentColor"/>
              <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
            </>
          )}
        </svg>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence mode="sync">
        {isOpen && (
          <motion.div
            key="chat-window"
            ref={chatWindowRef}
            className="fixed bg-white rounded-2xl shadow-2xl border border-gray-100 z-40 flex flex-col resize-none overflow-hidden"
            style={{
              width: isFullScreen ? '100vw' : `${width}px`,
              height: isFullScreen ? '100vh' : `${height}px`,
              bottom: isFullScreen ? '0' : '80px',
              right: isFullScreen ? '0' : '24px',
              borderRadius: isFullScreen ? '0' : '1rem'
            }}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#FFB6C1] to-[#FFD6DC] text-[#2B2B2B] p-5 flex items-center justify-between border-b border-white/20" style={{ borderTopLeftRadius: isFullScreen ? '0' : '1rem', borderTopRightRadius: isFullScreen ? '0' : '1rem' }}>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm">🌸</span>
                </div>
                <div>
                  <span className="text-lg font-bold">BloomBot</span>
                  <div className="text-xs opacity-80">Your Wellness Assistant</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleFullScreen}
                  className="text-[#2B2B2B] hover:bg-white/20 p-2 rounded-lg transition-all"
                  title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {isFullScreen ? (
                      <path d="M8 3V6H5V3H8ZM8 3H3V8H6V5H8V3ZM16 3V6H19V3H16ZM16 3H21V8H18V5H16V3ZM8 21V18H5V21H8ZM8 21V21H3V16H6V19H8V21ZM16 21V18H19V21H16ZM16 21H21V16H18V19H16V21Z" fill="currentColor"/>
                    ) : (
                      <path d="M7 14H5V19H10V17H7V14ZM5 10H7V7H10V5H5V10ZM17 17H14V19H19V14H17V17ZM14 5V7H17V10H19V5H14Z" fill="currentColor"/>
                    )}
                  </svg>
                </button>
                <button
                  onClick={toggleChat}
                  className="text-[#2B2B2B] hover:bg-white/20 p-2 rounded-lg transition-all"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: isFullScreen ? 'calc(100vh - 180px)' : `${Math.max(250, height - 180)}px`,
                    minHeight: '250px'
                  }}>
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FFB6C1] to-[#FFD6DC] rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">🌸</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Welcome to BloomBot</h3>
                  <p className="text-gray-500 text-sm max-w-xs">I'm here to help with your wellness journey. Ask me anything about health, fitness, or self-care!</p>
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <div
                        className={`max-w-sm px-4 py-3 rounded-2xl shadow-sm ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-br from-[#FFB6C1] to-[#FFD6DC] text-[#2B2B2B] rounded-br-md'
                            : message.type === 'error'
                            ? 'bg-red-50 text-red-800 border border-red-200 rounded-bl-md'
                            : message.type === 'contextual'
                            ? 'bg-gradient-to-br from-[#FFD6DC] to-[#FFE6E8] text-[#2B2B2B] border border-[#FFB6C1]/30 rounded-bl-md'
                            : 'bg-gradient-to-br from-green-50 to-green-100 text-gray-800 border border-green-200 rounded-bl-md'
                        }`}
                      >
                        {message.text}
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      className="flex justify-start"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                    >
                      <div className="bg-gradient-to-br from-green-50 to-green-100 px-4 py-3 rounded-2xl rounded-bl-md border border-green-200 shadow-sm">
                        <div className="flex space-x-1">
                          <motion.div
                            className="w-2 h-2 bg-gray-500 rounded-full"
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-gray-500 rounded-full"
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-gray-500 rounded-full"
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-5 border-t border-gray-100 bg-gray-50/50">
              <div className={`flex ${window.innerWidth < 768 ? 'flex-col space-y-3' : 'flex-row space-x-3'}`}>
                <div className="flex-1 relative">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about wellness..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFB6C1] focus:border-transparent resize-none overflow-hidden bg-white shadow-sm transition-all"
                    disabled={isTyping}
                    rows="1"
                    style={{ minHeight: '48px', maxHeight: '120px' }}
                  />
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className={`${
                    window.innerWidth < 768
                      ? 'w-full bg-gradient-to-r from-[#FFB6C1] to-[#FFD6DC] hover:from-[#FFD6DC] hover:to-[#FFE6E8] text-[#2B2B2B] px-6 py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md'
                      : 'bg-gradient-to-r from-[#FFB6C1] to-[#FFD6DC] hover:from-[#FFD6DC] hover:to-[#FFE6E8] text-[#2B2B2B] px-6 py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md'
                  }`}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Corner Drag Handles */}
        {!isFullScreen && (
          <>
            <div
              className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize hover:bg-gray-300 opacity-0 hover:opacity-100 transition-opacity"
              onMouseDown={(e) => handleMouseDown(e, 'ne')}
              style={{
                transform: 'translate(50%, -50%)',
                background: 'transparent',
                borderRight: '2px solid #ccc',
                borderBottom: '2px solid #ccc',
                borderRadius: '0 0 0 2px'
              }}
            />
            <div
              className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize hover:bg-gray-300 opacity-0 hover:opacity-100 transition-opacity"
              onMouseDown={(e) => handleMouseDown(e, 'se')}
              style={{
                transform: 'translate(50%, 50%)',
                background: 'transparent',
                borderRight: '2px solid #ccc',
                borderTop: '2px solid #ccc',
                borderRadius: '0 2px 0 0'
              }}
            />
            <div
              className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize hover:bg-gray-300 opacity-0 hover:opacity-100 transition-opacity"
              onMouseDown={(e) => handleMouseDown(e, 'sw')}
              style={{
                transform: 'translate(-50%, 50%)',
                background: 'transparent',
                borderLeft: '2px solid #ccc',
                borderTop: '2px solid #ccc',
                borderRadius: '2px 0 0 0'
              }}
            />
            <div
              className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize hover:bg-gray-300 opacity-0 hover:opacity-100 transition-opacity"
              onMouseDown={(e) => handleMouseDown(e, 'nw')}
              style={{
                transform: 'translate(-50%, -50%)',
                background: 'transparent',
                borderLeft: '2px solid #ccc',
                borderBottom: '2px solid #ccc',
                borderRadius: '0 0 2px 0'
              }}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default BloomBot;