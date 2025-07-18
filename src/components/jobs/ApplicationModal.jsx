import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiXMark } from 'react-icons/hi2';

function ApplicationModal({ job, onClose, onSubmit }) {
    const [coverLetter, setCoverLetter] = useState('');
    const [cvFile, setCvFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setCvFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!cvFile) {
            alert('Please select your CV file.');
            return;
        }
        setIsSubmitting(true);
        await onSubmit({ coverLetter, cvFile });
        setIsSubmitting(false);
    };

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

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Apply for Position</h2>
                <p className="mt-1 text-blue-600 dark:text-blue-400">{job.title}</p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                    <div>
                        <label htmlFor="cv-upload" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Upload your CV (PDF)
                        </label>
                        <div className="mt-2 flex items-center justify-center rounded-lg border-2 border-dashed border-slate-300 px-6 py-10 dark:border-slate-600">
                            <div className="text-center">
                                <input id="cv-upload" name="cv-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf" />
                                <label htmlFor="cv-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500 dark:bg-slate-800 dark:text-blue-400">
                                    <span>{cvFile ? cvFile.name : 'Choose a file'}</span>
                                </label>
                                <p className="pl-1 text-xs text-slate-500">{!cvFile && 'or drag and drop'}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="cover-letter" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Cover Letter
                        </label>
                        <textarea
                            id="cover-letter"
                            rows={4}
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            className="mt-2 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                            placeholder="Write a few lines about yourself and why you are a good fit for this position..."
                        ></textarea>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-blue-400"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}

export default ApplicationModal;
