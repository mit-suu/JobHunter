import { useState, useEffect } from 'react';
import RecommendedJobs from './RecommendedJobs';
import AIChatbot from './AIChatbot';
import { getJobs } from '../../services/jobService';
import { getJobCriteriaFromChat } from '../../services/aiService';

function AIRecommendationSection() {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchCriteria, setSearchCriteria] = useState({});
    const [searchInitiated, setSearchInitiated] = useState(false);

    useEffect(() => {
        if (!searchInitiated) {
            return; 
        }

        const fetchJobsByCriteria = async () => {
            setIsLoading(true);
            try {
                const jobResults = await getJobs(searchCriteria);
                setJobs(jobResults.slice(0, 6)); 
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
                setJobs([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobsByCriteria();
    }, [searchCriteria, searchInitiated]);

    const handleNewChatMessage = async (userMessage) => {
        setSearchInitiated(true);
        setIsLoading(true); 

        try {
            const criteriaFromAI = await getJobCriteriaFromChat(userMessage);
            setSearchCriteria(criteriaFromAI);
        } catch (error) {
            console.error("AI processing failed:", error);
            setIsLoading(false); 
        }
    };

    return (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            {/* ✨ UPDATED: Thêm container với style Bento box ✨ */}
            <div className="rounded-3xl bg-slate-50 p-8 shadow-sm ring-1 ring-slate-200/50 dark:bg-slate-800/50 dark:ring-slate-700/50 md:p-12">
                <div className="mb-8 text-center">
                    <h2 className="font-poppins text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
                        AI <span className="text-[#26A4FF]">Recommendations</span>
                    </h2>
                    <p className="mt-2 text-slate-500 dark:text-slate-400">Jobs suggested by AI based on your needs.</p>
                </div>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-10">
                    <div className="lg:col-span-7">
                        <RecommendedJobs jobs={jobs} isLoading={isLoading} searchInitiated={searchInitiated} />
                    </div>
                    <div className="lg:col-span-3">
                        <AIChatbot onSubmit={handleNewChatMessage} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AIRecommendationSection;
