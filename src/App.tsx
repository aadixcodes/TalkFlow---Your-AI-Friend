// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { MessageSquare, Send, Bot } from 'lucide-react';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import ReactMarkdown from 'react-markdown';

// interface Message {
//   id: string;
//   content: string;
//   isBot: boolean;
// }

// function App() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [showLanding, setShowLanding] = useState(true);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const chatContainerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);
//   }, []);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       content: input,
//       isBot: false,
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setInput('');
//     setIsTyping(true);

//     setTimeout(() => {
//       let response = "I'm a simulated response. Replace this with actual Gemini API integration!";
      
//       const founderQuestions = [
//         "who built you",
//         "who created you",
//         "who is the founder",
//         "who made you",
//         "tell me about founder",
//         "founder of talkflow",
//         "who is aditya patel",
//         "tell me about aditya patel",
//         "aditya patel"
//       ];
      
//       if (founderQuestions.some(q => input.toLowerCase().includes(q))) {
//         response = "TalkFlow was created by Aditya Patel, who is currently a second-year student at Vaishnav Vidyapeeth Vishwavidyalaya in Indore. He developed TalkFlow as part of his passion for creating innovative AI solutions.";
//       }

//       const botMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         content: response,
//         isBot: true,
//       };
//       setMessages(prev => [...prev, botMessage]);
//       setIsTyping(false);
//     }, 1500);
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-[#14191F] flex items-center justify-center">
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 0.5 }}
//           className="text-white text-center"
//         >
//           <Bot className="w-16 h-16 mb-4 mx-auto text-[#8F2BC3]" />
//           <motion.div
//             initial={{ width: 0 }}
//             animate={{ width: 200 }}
//             transition={{ duration: 1.5, ease: "easeInOut" }}
//             className="h-1 bg-gradient-to-r from-[#8F2BC3] to-[#895DCA] mx-auto rounded-full"
//           />
//         </motion.div>
//       </div>
//     );
//   }

//   if (showLanding) {
//     return (
//       <div className="min-h-screen bg-[#14191F] flex items-center justify-center">
//         <motion.div
//           initial={{ y: -100, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           className="text-center"
//         >
//           <Bot className="w-20 h-20 text-[#8F2BC3] mx-auto mb-6" />
//           <h1 className="text-4xl font-bold text-white mb-2">TalkFlow</h1>
//           <p className="text-gray-400 mb-8">Your Temporary Friend</p>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setShowLanding(false)}
//             className="px-8 py-3 bg-gradient-to-r from-[#8F2BC3] to-[#895DCA] rounded-full text-white font-semibold"
//           >
//             Start Chatting
//           </motion.button>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col h-screen bg-[#14191F]">
//       <header className="bg-[#1A2027] p-4 flex items-center border-b border-gray-800 fixed top-0 left-0 right-0 z-50">
//         <Bot className="w-8 h-8 text-[#8F2BC3] mr-3" />
//         <div>
//           <h1 className="text-white font-bold">TalkFlow</h1>
//           <p className="text-gray-400 text-sm">Your Temporary Friend</p>
//         </div>
//       </header>

//       <div 
//         ref={chatContainerRef}
//         className="flex-1 overflow-y-auto scrollbar-hide pt-20 pb-24"
//       >
//         <div className="max-w-4xl mx-auto px-4 space-y-4">
//           {messages.map((message) => (
//             <motion.div
//               key={message.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
//             >
//               <div
//                 className={`max-w-[80%] md:max-w-[60%] p-3 ${
//                   message.isBot
//                     ? 'bg-[#1A2027] text-white rounded-2xl rounded-bl-none'
//                     : 'bg-gradient-to-r from-[#8F2BC3] to-[#895DCA] text-white rounded-2xl rounded-br-none'
//                 }`}
//               >
//                 <ReactMarkdown className="prose prose-invert">
//                   {message.content}
//                 </ReactMarkdown>
//               </div>
//             </motion.div>
//           ))}
//           {isTyping && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="flex justify-start"
//             >
//               <div className="bg-[#1A2027] p-4 rounded-2xl rounded-bl-none flex space-x-2">
//                 <motion.div
//                   animate={{ scale: [1, 1.2, 1] }}
//                   transition={{ repeat: Infinity, duration: 1 }}
//                   className="w-2 h-2 bg-[#8F2BC3] rounded-full"
//                 />
//                 <motion.div
//                   animate={{ scale: [1, 1.2, 1] }}
//                   transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
//                   className="w-2 h-2 bg-[#8F2BC3] rounded-full"
//                 />
//                 <motion.div
//                   animate={{ scale: [1, 1.2, 1] }}
//                   transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
//                   className="w-2 h-2 bg-[#8F2BC3] rounded-full"
//                 />
//               </div>
//             </motion.div>
//           )}
//           <div ref={messagesEndRef} />
//         </div>
//       </div>

//       <div className="p-4 bg-[#1A2027] border-t border-gray-800 fixed bottom-0 left-0 right-0">
//         <div className="max-w-4xl mx-auto flex items-center gap-2">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//             placeholder="Type your message..."
//             className="flex-1 bg-[#14191F] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8F2BC3]"
//           />
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={handleSend}
//             className="bg-gradient-to-r from-[#8F2BC3] to-[#895DCA] p-2 rounded-lg text-white"
//           >
//             <Send className="w-5 h-5" />
//           </motion.button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;


// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { MessageSquare, Send, Bot } from 'lucide-react';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import ReactMarkdown from 'react-markdown';

// // Initialize Gemini AI
// const genAI = new GoogleGenerativeAI("AIzaSyDMW5j1yq6XX8rIZ_evNyInus35AXWR1VM");
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// interface Message {
//   id: string;
//   content: string;
//   isBot: boolean;
// }

// function App() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [showLanding, setShowLanding] = useState(true);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const chatContainerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);
//   }, []);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       content: input,
//       isBot: false,
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setInput('');
//     setIsTyping(true);

//     try {
//       // Handle founder-specific questions
//       const founderQuestions = [
//         "who built you",
//         "who created you",
//         "who is the founder",
//         "who made you",
//         "tell me about founder",
//         "founder of talkflow",
//         "who is aditya patel",
//         "tell me about aditya patel",
//         "aditya patel"
//       ];
      
//       let response;
//       if (founderQuestions.some(q => input.toLowerCase().includes(q))) {
//         response = "TalkFlow was created by Aditya Patel, who is currently a second-year student at Vaishnav Vidyapeeth Vishwavidyalaya in Indore. He developed TalkFlow as part of his passion for creating innovative AI solutions.";
//       } else {
//         // Get response from Gemini AI
//         const result = await model.generateContent(input);
//         response = result.response.text();
//       }

//       const botMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         content: response,
//         isBot: true,
//       };
      
//       setMessages(prev => [...prev, botMessage]);
//     } catch (error) {
//       const errorMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         content: "I apologize, but I encountered an error processing your request. Please try again.",
//         isBot: true,
//       };
//       setMessages(prev => [...prev, errorMessage]);
//     } finally {
//       setIsTyping(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-[#14191F] flex items-center justify-center">
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 0.5 }}
//           className="text-white text-center"
//         >
//           <Bot className="w-16 h-16 mb-4 mx-auto text-[#8F2BC3]" />
//           <motion.div
//             initial={{ width: 0 }}
//             animate={{ width: 200 }}
//             transition={{ duration: 1.5, ease: "easeInOut" }}
//             className="h-1 bg-gradient-to-r from-[#8F2BC3] to-[#895DCA] mx-auto rounded-full"
//           />
//         </motion.div>
//       </div>
//     );
//   }

//   if (showLanding) {
//     return (
//       <div className="min-h-screen bg-[#14191F] flex items-center justify-center">
//         <motion.div
//           initial={{ y: -100, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           className="text-center"
//         >
//           <Bot className="w-20 h-20 text-[#8F2BC3] mx-auto mb-6" />
//           <h1 className="text-4xl font-bold text-white mb-2">TalkFlow</h1>
//           <p className="text-gray-400 mb-8">Your AI Friend</p>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setShowLanding(false)}
//             className="px-8 py-3 bg-gradient-to-r from-[#8F2BC3] to-[#895DCA] rounded-full text-white font-semibold"
//           >
//             Start Chatting
//           </motion.button>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col h-screen bg-[#14191F]">
//       <header className="bg-[#1A2027] p-4 flex items-center border-b border-gray-800 fixed top-0 left-0 right-0 z-50">
//         <Bot className="w-8 h-8 text-[#8F2BC3] mr-3" />
//         <div>
//           <h1 className="text-white font-bold">TalkFlow</h1>
//           <p className="text-gray-400 text-sm">Your AI Friend</p>
//         </div>
//       </header>

//       <div 
//         ref={chatContainerRef}
//         className="flex-1 overflow-y-auto scrollbar-hide pt-20 pb-24"
//       >
//         <div className="max-w-4xl mx-auto px-4 space-y-4">
//           {messages.map((message) => (
//             <motion.div
//               key={message.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
//             >
//               <div
//                 className={`max-w-[80%] md:max-w-[60%] p-3 ${
//                   message.isBot
//                     ? 'bg-[#1A2027] text-white rounded-2xl rounded-bl-none'
//                     : 'bg-gradient-to-r from-[#8F2BC3] to-[#895DCA] text-white rounded-2xl rounded-br-none'
//                 }`}
//               >
//                 <ReactMarkdown className="prose prose-invert">
//                   {message.content}
//                 </ReactMarkdown>
//               </div>
//             </motion.div>
//           ))}
//           {isTyping && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="flex justify-start"
//             >
//               <div className="bg-[#1A2027] p-4 rounded-2xl rounded-bl-none flex space-x-2">
//                 <motion.div
//                   animate={{ scale: [1, 1.2, 1] }}
//                   transition={{ repeat: Infinity, duration: 1 }}
//                   className="w-2 h-2 bg-[#8F2BC3] rounded-full"
//                 />
//                 <motion.div
//                   animate={{ scale: [1, 1.2, 1] }}
//                   transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
//                   className="w-2 h-2 bg-[#8F2BC3] rounded-full"
//                 />
//                 <motion.div
//                   animate={{ scale: [1, 1.2, 1] }}
//                   transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
//                   className="w-2 h-2 bg-[#8F2BC3] rounded-full"
//                 />
//               </div>
//             </motion.div>
//           )}
//           <div ref={messagesEndRef} />
//         </div>
//       </div>

//       <div className="p-4 bg-[#1A2027] border-t border-gray-800 fixed bottom-0 left-0 right-0">
//         <div className="max-w-4xl mx-auto flex items-center gap-2">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//             placeholder="Type your message..."
//             className="flex-1 bg-[#14191F] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8F2BC3]"
//           />
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={handleSend}
//             className="bg-gradient-to-r from-[#8F2BC3] to-[#895DCA] p-2 rounded-lg text-white"
//           >
//             <Send className="w-5 h-5" />
//           </motion.button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;



import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Bot } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI("AIzaSyDMW5j1yq6XX8rIZ_evNyInus35AXWR1VM");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

interface Message {
  id: string;
  content: string;
  isBot: boolean;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showLanding, setShowLanding] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isBot: false,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Handle specific queries
      const query = input.toLowerCase();
      let response;

      // Check for Aditya Patel related queries
      if (query.includes('aditya patel') || query.includes('who is founder')) {
        response = "Aditya Patel is the founder of TalkFlow and he is the youngest entrepreneur. He lives in Indore currently he is a 2nd year BTech CS student in Vaishnav Vidyapeeth Vishwavidyalaya Indore.";
      }
      // Check for Shivani Rathore related queries
      else if (query.includes('shivani rathore')) {
        response = "Shivani Rathore is the most beautiful girl in the world, residing in Biyabani, Indore. She is incredibly intelligent and an expert in graphic design and UI/UX design. She is also the wife of Aditya Patel.";
      }
      // For all other queries, use Gemini AI
      else {
        const result = await model.generateContent(input);
        response = result.response.text();
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isBot: true,
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I encountered an error processing your request. Please try again.",
        isBot: true,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#14191F] flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-white text-center"
        >
          <Bot className="w-16 h-16 mb-4 mx-auto text-[#8F2BC3]" />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 200 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-1 bg-gradient-to-r from-[#8F2BC3] to-[#895DCA] mx-auto rounded-full"
          />
        </motion.div>
      </div>
    );
  }

  if (showLanding) {
    return (
      <div className="min-h-screen bg-[#14191F] flex items-center justify-center">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Bot className="w-20 h-20 text-[#8F2BC3] mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white mb-2">TalkFlow</h1>
          <p className="text-gray-400 mb-8">Your AI Friend</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLanding(false)}
            className="px-8 py-3 bg-gradient-to-r from-[#8F2BC3] to-[#895DCA] rounded-full text-white font-semibold"
          >
            Start Chatting
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#14191F]">
      <header className="bg-[#1A2027] p-4 flex items-center border-b border-gray-800 fixed top-0 left-0 right-0 z-50">
        <Bot className="w-8 h-8 text-[#8F2BC3] mr-3" />
        <div>
          <h1 className="text-white font-bold">TalkFlow</h1>
          <p className="text-gray-400 text-sm">Your AI Friend</p>
        </div>
      </header>

      <div 
        ref={chatContainerRef}
        className="flex-1 mb-4 overflow-y-auto scrollbar-hide pt-20 pb-24"
      >
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] md:max-w-[60%] p-3 ${
                  message.isBot
                    ? 'bg-[#1A2027] text-white rounded-2xl rounded-bl-none'
                    : 'bg-gradient-to-r from-[#8F2BC3] to-[#895DCA] text-white rounded-2xl rounded-br-none'
                }`}
              >
                <ReactMarkdown className="prose prose-invert">
                  {message.content}
                </ReactMarkdown>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-[#1A2027] p-4 rounded-2xl rounded-bl-none flex space-x-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-2 h-2 bg-[#8F2BC3] rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                  className="w-2 h-2 bg-[#8F2BC3] rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                  className="w-2 h-2 bg-[#8F2BC3] rounded-full"
                />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 bg-[#1A2027] border-t border-gray-800 fixed bottom-0 left-0 right-0">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-[#14191F] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8F2BC3]"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            className="bg-gradient-to-r from-[#8F2BC3] to-[#895DCA] p-2 rounded-lg text-white"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
        <p className='text-center mt-4 text-gray-400'>Designed and developed by Aditya Patel</p>
      </div>
    </div>
  );
}

export default App;