import { useState ,useEffect} from "react";
import { sendChatMessage } from "../../services/chatbotService";
import { motion } from "framer-motion";
export default function ChatBox({ onClose ,isVisible }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [model, setModel] = useState("mistralai/mistral-7b-instruct");
  const [loading, setLoading] = useState(false);
  const [botTyping, setBotTyping] = useState("");
  const [typingDots, setTypingDots] = useState(".");
const getModelDisplayName = (modelId) => {
  switch (modelId) {
    case "mistralai/mistral-7b-instruct":
      return "Mistral 7B";
    case "openai/gpt-3.5-turbo":
      return "GPT-3.5 Turbo";
    default:
      return modelId;
  }
};
useEffect(() => {
  let dotInterval;

  if (loading && !botTyping) {
    dotInterval = setInterval(() => {
      setTypingDots((prev) =>
        prev.length >= 3 ? "." : prev + "."
      );
    }, 500); // mỗi 0.5 giây đổi dấu
  }

  return () => {
    clearInterval(dotInterval);
  };
}, [loading, botTyping]);
  const handleSend = async () => {
  if (!input.trim()) return;
  const userMessage = { role: "user", content: input };
  setMessages((prev) => [...prev, userMessage]);
  setInput("");
  setLoading(true);
  setBotTyping(""); // reset typing state

  const reply = await sendChatMessage(input, model);

  let currentText = "";
  let i = 0;

  const typeInterval = setInterval(() => {
    if (i < reply.length) {
      currentText += reply[i];
      setBotTyping(currentText);
      i++;
    } else {
      clearInterval(typeInterval);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      setLoading(false);
      setBotTyping(""); // reset typing
    }
  }, 20); // tốc độ đánh máy (ms/char)
};


  return (
     <motion.div
      className="fixed bottom-[83px] right-6 z-50 w-80 max-h-[70vh] flex flex-col overflow-hidden rounded-xl border border-gray-300 bg-white shadow-xl"
      initial={false}
      animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 30 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ pointerEvents: isVisible ? "auto" : "none" }} // không bị bấm khi ẩn
    >

    
    <div className="fixed bottom-[83px] font-poppins right-6 z-40 flex max-h-[70vh] w-80 flex-col overflow-hidden rounded-xl border border-gray-300 bg-white shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#26A4FF] px-4 py-2 text-white">
       <span className="flex font-semibold">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="mr-3 size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
    />
  </svg>
  I'm <span className="ml-1">{getModelDisplayName(model)}</span>
</span>

        <button
          onClick={onClose}
          className="text-3xl font-medium text-white"
        >
          ×
        </button>
      </div>

      {/* Model select */}
      <div className="border-b px-4 py-2 rounded-b-sm">
        <label className="mb-1 block text-sm font-medium text-gray-600">
          Select Model
        </label>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
        >
          <option value="mistralai/mistral-7b-instruct">
            Mistral 7B (Free)
          </option>
          <option value="openai/gpt-3.5-turbo">GPT-3.5 Turbo</option>
        </select>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 text-sm space-y-2">
  {messages.length === 0 ? (
    <p className="text-gray-500 text-center">How can I help you today? <br/>...</p>
  ) : (
    messages.map((msg, index) => (
      <div
        key={index}
        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
      >
        <div
          className={`max-w-[75%] ${
            msg.role === "user"
              ? "bg-blue-100 rounded-lg px-3 py-2"
              : "bg-transparent"
          }`}
        >
          <p className="text-[#333333] text-sm">
            <b>{msg.role === "user" ? "You" : "Bot"}:</b> {msg.content}
          </p>
        </div>
      </div>
    ))
  )}
  {loading && !botTyping && (
  <div className="flex justify-start">
    <div className="max-w-[75%] bg-transparent">
      <p className="text-[#333333] text-sm italic">Bot is thinking{typingDots}</p>
    </div>
  </div>
)}

  {botTyping && (
  <div className="flex justify-start">
    <div className="max-w-[75%] bg-transparent">
      <p className="text-[#333333] text-sm">
        <b>Bot:</b> {botTyping}
        <span className="animate-pulse"></span> {/* blinking cursor */}
      </p>
    </div>
  </div>
)}
</div>

      

      {/* Input */}
      <div className="flex border-t px-4 py-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          className="mr-2 flex-1 rounded border border-gray-300 px-2 py-1 text-sm"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="rounded-xl bg-[#26A4FF] text-sm text-white hover:bg-blue-700 disabled:opacity-50 px-4 py-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 font-bold">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
</svg>

        </button>
      </div>
    </div>
    </motion.div>
  );
}
