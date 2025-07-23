// src/services/chatbotService.js

const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = process.env.REACT_APP_API_KEY_CHATBOX; // hoặc process.env.REACT_APP_API_KEY_CHATBOX nếu dùng CRA

export async function sendChatMessage(message, model) {
  if (!message || !model) {
    console.error("Missing message or model in sendChatMessage");
    return "Missing message or model.";
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model, 
        messages: [
          { role: "user", content: message }
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.error?.message || "Unknown error from API");
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "(No response)";
  } catch (error) {
    console.error("Chatbot API error:", error.message);
    return " Error connecting to AI service.";
  }
}
