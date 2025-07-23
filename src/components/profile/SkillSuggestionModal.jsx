import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiXMark, HiOutlineSparkles } from 'react-icons/hi2';

function SkillSuggestionModal({ currentSkills, suggestedSkills, onClose, onAddSkills }) {
    const newSkills = suggestedSkills.filter(skill => !currentSkills.includes(skill));
    const [selectedSkills, setSelectedSkills] = useState(newSkills);

    const handleToggleSkill = (skill) => {
        setSelectedSkills(prev => 
            prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
        );
    };

    const handleConfirm = () => {
        onAddSkills(selectedSkills);
        onClose();
    };

    if (newSkills.length === 0) {
        // Tự động đóng nếu không có skill mới
        setTimeout(onClose, 500);
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <p className="rounded-lg bg-green-100 p-4 text-green-800">No new skills found. Your profile is up-to-date!</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="relative w-full max-w-lg rounded-xl bg-white p-8 shadow-2xl dark:bg-slate-800"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                    <HiXMark className="h-6 w-6" />
                </button>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    <HiOutlineSparkles className="mr-2 inline-block text-blue-500"/>
                    AI Skill Suggestions
                </h2>
                <p className="mt-2 text-slate-600 dark:text-slate-400">We found some new skills in your CV. Select the ones you'd like to add to your profile.</p>

                <div className="mt-6 max-h-60 space-y-2 overflow-y-auto">
                    {newSkills.map(skill => (
                        <div key={skill} className="flex items-center rounded-md bg-slate-100 p-3 dark:bg-slate-700">
                            <input
                                id={`skill-${skill}`}
                                type="checkbox"
                                checked={selectedSkills.includes(skill)}
                                onChange={() => handleToggleSkill(skill)}
                                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor={`skill-${skill}`} className="ml-3 text-slate-800 dark:text-slate-200">{skill}</label>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex justify-end gap-4">
                    <button onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700">
                        Skip
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                        Add Selected Skills ({selectedSkills.length})
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default SkillSuggestionModal;
