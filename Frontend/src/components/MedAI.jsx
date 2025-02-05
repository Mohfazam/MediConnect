import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Trash2,
  Loader,
  Bot,
  User,
  Paperclip,
  Smile,
  Volume2,
  VolumeX,
  HelpCircle,
} from "lucide-react";
import { GoogleGenerativeAI  } from "@google/generative-ai";
import {Navbar} from "./Navbar"; 

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const popularEmojis = [
  "😊",
  "😂",
  "❤️",
  "😍",
  "🥰",
  "😭",
  "😘",
  "🥺",
  "✨",
  "😅",
  "🙏",
  "🔥",
  "😊",
  "💕",
  "😌",
  "💜",
  "😩",
  "😤",
  "🥳",
  "💪",
];

export const MedAI = ({ darkMode }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const customString = `
      Latest Prescription Analysis:
      - Medication: Ibuprofen
      - Dosage: 200mg
      - Frequency: Twice a day
      - Duration: 7 days
      - Notes: Take with food to avoid stomach upset.

      Instructions: You are Med-AI, an AI designed to provide medical information and support. Respond like a professional doctor, providing detailed and accurate information.
    `;
    const combinedInput = `${customString}\n\nUser Input: ${input}`;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setIsTyping(true);

    try {
      const result = await model.generateContent(combinedInput);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: result.response.text() },
      ]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't generate a response. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const speakMessage = (text) => {
    if ("speechSynthesis" in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const addEmoji = (emoji) => {
    setInput((prev) => prev + emoji);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: `Uploaded file: ${file.name}` },
      ]);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Navbar /> {/* Include the Navbar component */}
      <div className="container mx-auto p-4 max-w-4xl">
      <motion.h1
            className="text-4xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            MED-AI: AI-Powered Medical Assistance
          </motion.h1>
        <div
          className={`bg-gradient-to-r ${
            darkMode ? "from-blue-600 to-purple-600" : "from-blue-400 to-purple-500"
          } rounded-lg shadow-xl p-6 mb-6`}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Med-AI Chatbot</h2>
            <div className="flex space-x-3">
              <button onClick={clearChat} className="p-2 text-white" aria-label="Clear chat">
                <Trash2 size={20} />
              </button>
              <button
                onClick={() =>
                  alert("Help: This is an AI chatbot designed to provide medical information and support.")
                }
                className="p-2 text-white"
                aria-label="Help"
              >
                <HelpCircle size={20} />
              </button>
            </div>
          </div>
          <p className="text-gray-100 mt-2">
            I'm your AI assistant for medication information. Ask me about side effects, dosage, interactions, or
            precautions.
          </p>
        </div>
        <div
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 h-[60vh] overflow-y-auto mb-6 ${
            darkMode ? "scrollbar-dark" : "scrollbar-light"
          }`}
        >
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}
              >
                {message.role === "assistant" && (
                  <div className="shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white mr-2">
                    <Bot size={24} />
                  </div>
                )}
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-blue-500 text-white"
                      : darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p>{message.content}</p>
                  {message.role === "assistant" && (
                    <div className="flex mt-2 space-x-2">
                      <button
                        onClick={() => (isSpeaking ? stopSpeaking() : speakMessage(message.content))}
                        className="flex items-center space-x-1 px-2 py-1 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white text-sm"
                      >
                        {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        <span>{isSpeaking ? "Stop" : "Read"}</span>
                      </button>
                    </div>
                  )}
                </div>
                {message.role === "user" && (
                  <div className="shrink-0 w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white ml-2">
                    <User size={24} />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <Loader className="animate-spin mr-2" size={16} />
              <span>Med-AI is typing...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className={`p-4 ${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-xl`}>
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className={`flex-grow p-3 rounded-lg ${
                darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <input type="file" id="file-upload" className="hidden" onChange={handleFileUpload} />
            <label
              htmlFor="file-upload"
              className="p-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200 cursor-pointer"
            >
              <Paperclip size={20} />
            </label>
            <button
              type="button"
              onClick={toggleEmojiPicker}
              className="p-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200"
            >
              <Smile size={20} />
            </button>
            <button
              type="submit"
              className="p-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200"
            >
              <Send size={20} />
            </button>
          </form>
          {showEmojiPicker && (
            <div className={`mt-2 p-2 ${darkMode ? "bg-gray-700" : "bg-gray-200"} rounded-lg`}>
              <div className="grid grid-cols-5 gap-2">
                {popularEmojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => addEmoji(emoji)}
                    className="text-2xl hover:bg-blue-500 hover:text-white rounded transition-colors duration-200 p-1"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};