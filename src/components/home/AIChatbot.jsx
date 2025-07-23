// src/components/home/AIChatbot.jsx (Mới)

import { useState } from 'react';

function AIChatbot({ chatHistory, onSubmit }) {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        onSubmit(message);
        setMessage('');
    };

    return (
        <div className="sticky top-24 flex h-[60vh] flex-col rounded-xl border bg-white p-4 shadow-lg dark:border-slate-700 dark:bg-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">AI Job Assistant</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                Tell me what you're looking for. e.g., "Find remote React jobs".
            </p>
            <div className="flex-1 space-y-2 overflow-y-auto pr-2">
                {/* Render chat history here if you want */}
            </div>
            <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                />
                <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                    Send
                </button>
            </form>
        </div>
    );
}

export default AIChatbot;