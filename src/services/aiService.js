// src/services/aiService.js

// Get environment variables once at the top of the file
const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

/**
 * [HELPER] A centralized function to call the Gemini API.
 * It handles the API call, error handling, and cleans the response.
 * @param {string} prompt - The prompt to send to the AI.
 * @returns {Promise<string>} - A promise that resolves to the cleaned text content from the AI.
 */
const callGeminiAPI = async (prompt) => {
    // --- Log để kiểm tra (an toàn cho debug) ---
    console.log("[AI Service] Checking Environment Variables...");
    console.log("GEMINI_API_KEY loaded:", !!GEMINI_API_KEY); 

    if (GEMINI_API_KEY) {
        console.log("GEMINI_API_KEY ends with:", `...${GEMINI_API_KEY.slice(-4)}`);
    }
    console.log("[AI Service] Sending prompt to Gemini:", prompt);
    // --- Kết thúc Log ---

    if (!GEMINI_API_KEY) {
        console.error("[AI Service] Gemini API key is not configured in .env file or is not accessible.");
        throw new Error("Gemini API key is not configured in .env file.");
    }

    // ✨ UPDATED: Using the gemini-2.0-flash model.
    const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const payload = {
        contents: [{
            parts: [{ text: prompt }]
        }],
        // Enforce JSON output for more reliable parsing
        generationConfig: {
            responseMimeType: "application/json",
        }
    };

    const geminiRes = await fetch(geminiApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!geminiRes.ok) {
        const errorBody = await geminiRes.text();
        console.error("[AI Service] Gemini API request failed:", geminiRes.status, errorBody);
        throw new Error("Failed to get a response from the AI.");
    }

    const geminiData = await geminiRes.json();
    
    if (!geminiData.candidates?.[0]?.content?.parts?.[0]?.text) {
        console.error("[AI Service] Invalid response structure from Gemini:", geminiData);
        throw new Error("AI returned an unexpected response structure.");
    }
    
    // Fallback cleaning for JSON markdown fences, just in case.
    const resultText = geminiData.candidates[0].content.parts[0].text;
    const cleanedText = resultText.replace(/```json\n|```/g, "").trim();

    return cleanedText;
};

/**
 * Uploads a CV file, sends it to the AI for analysis, and returns structured profile data.
 * @param {File} cvFile - The CV file uploaded by the user.
 * @returns {Promise<object>} A promise that resolves to an object containing extracted data and the cvUrl.
 */
export const syncProfileWithCV = async (cvFile) => {
    if (!cvFile) throw new Error("No CV file provided.");
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
        throw new Error("Cloudinary environment variables are not configured.");
    }

    // 1. Upload CV to Cloudinary
    const formData = new FormData();
    formData.append("file", cvFile);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("resource_type", "raw");

    const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`, {
        method: "POST",
        body: formData
    });
    const uploadData = await uploadRes.json();
    if (!uploadData.secure_url) {
        console.error("Cloudinary upload error:", uploadData);
        throw new Error("CV upload to Cloudinary failed.");
    }
    const cvUrl = uploadData.secure_url;

    const prompt = `You are an expert HR recruitment assistant. Analyze the CV from this URL: ${cvUrl}.
    Extract the following information:
    1.  "skills": An array of key technical and soft skills (e.g., ["JavaScript", "React", "Teamwork"]).
    2.  "bio": A concise professional summary or bio, 2-3 sentences long.
    3.  "experienceLevel": The candidate's experience level. Choose ONE from: 'Internship', 'Entry Level', 'Mid Level', 'Senior', 'Lead', 'Manager'.

    Return ONLY a single, valid JSON object with these keys.`;
    
    try {
        const cleanedResultText = await callGeminiAPI(prompt);
        const aiResponseJson = JSON.parse(cleanedResultText);
        return { ...aiResponseJson, cvUrl };
    } catch (e) {
        console.error("Failed to process AI response for CV sync:", e);
        throw new Error("AI returned an invalid format or failed processing.");
    }
};

/**
 * Extracts job search criteria from a user's chat message based on a full job schema.
 * @param {string} userMessage - The user's input message from the chatbot.
 * @returns {Promise<object>} A promise that resolves to an object containing search criteria.
 */
export const getJobCriteriaFromChat = async (userMessage) => {
    if (!userMessage || userMessage.trim() === '') {
        throw new Error("User message cannot be empty.");
    }

    // 🤖 UPDATED: Prompt đã được cập nhật với quy tắc rõ ràng hơn để xử lý các truy vấn chung.
    const prompt = `You are an intelligent job search assistant. Your task is to analyze the user's request and convert it into a JSON object for filtering jobs.
    The user's request is: "${userMessage}"

    The available fields to search against are:
    - title (string)
    - company (string)
    - location (string)
    - type (string, e.g., "Full-Time", "Part-Time", "Contract")
    - categories (array of strings, e.g., ["Engineering", "Design"])
    - level (string, e.g., "Entry Level", "Mid Level", "Senior")
    - isRemote (boolean)
    - tags (array of strings, like specific skills or technologies, e.g., ["React", "AWS", "Figma"])

    Your goal:
    1.  Analyze the user's message and map their intent to the fields above.
    
    // --- ✨ QUY TẮC MỚI: Thay vì "linh hoạt", chúng tôi ra lệnh rõ ràng hơn ---
    2.  For general roles or skills (e.g., "design", "developer", "react"), you MUST populate both the 'categories' and 'tags' fields to ensure a comprehensive search. The category name should be capitalized. For instance, a search for "design" should result in 'categories': ["Design"] and 'tags': ["design"].

    3.  For "remote", set "isRemote": true.
    4.  Return ONLY a single, valid JSON object containing the extracted criteria.
    5.  If a criterion is not mentioned, OMIT the key from the JSON object.
    6.  If the message is too vague or irrelevant to a job search, return an empty JSON object {}.

    Examples:
    - "find design jobs" -> {"tags": ["design"], "categories": ["Design"]}
    - "remote react jobs in danang" -> {"tags": ["React"], "isRemote": true, "location": "danang", "categories": ["Engineering"]}
    - "senior java developer" -> {"title": "java developer", "level": "Senior", "tags": ["Java"], "categories": ["Engineering"]}
    - "full-time jobs at Google" -> {"type": "Full-Time", "company": "Google"}
    `;
    
    try {
        const cleanedResultText = await callGeminiAPI(prompt);
        // Log the raw JSON response from AI for debugging
        console.log("[AI Service] Received raw JSON from AI:", cleanedResultText);
        return JSON.parse(cleanedResultText);
    } catch (e) {
        console.error("Failed to process AI response for chat criteria:", e);
        throw new Error("AI returned an invalid format or failed processing.");
    }
};
