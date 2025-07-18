import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getApplicationsByJobId } from '../../services/applicationService';
import { getJobById } from '../../services/jobService';
import CvViewerModal from '../../components/company/CvViewerModal';
import { HiOutlineArrowLeft, HiOutlineEye } from 'react-icons/hi';

function ApplicantsPage() {
    const { jobId } = useParams();
    const [applications, setApplications] = useState([]);
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedCvUrl, setSelectedCvUrl] = useState(null); // State để quản lý modal

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [appsData, jobData] = await Promise.all([
                    getApplicationsByJobId(jobId),
                    getJobById(jobId)
                ]);
                setApplications(appsData);
                setJob(jobData);
            } catch (error) {
                console.error("Failed to fetch applicants data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [jobId]);

    if (loading) {
        return <div className="flex h-screen items-center justify-center bg-slate-100 dark:bg-slate-900">Loading applicants...</div>;
    }

    return (
        <>
            <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
                <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="mb-8">
                            <Link to="/company-dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                                <HiOutlineArrowLeft />
                                Back to Dashboard
                            </Link>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Applicants for <span className="text-blue-600 dark:text-blue-400">{job?.title}</span>
                        </h1>
                    </motion.div>

                    <div className="mt-8 flow-root">
                        <div className="inline-block min-w-full py-2 align-middle">
                            <div className="overflow-hidden rounded-lg bg-white shadow ring-1 ring-black ring-opacity-5 dark:bg-slate-800">
                                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                                    <thead className="bg-slate-50 dark:bg-slate-700">
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 dark:text-white sm:pl-6">Applicant ID</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-white">Applied Date</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-white">Status</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-white">Cover Letter</th>
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">CV</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-700 dark:bg-slate-800">
                                        {applications.length > 0 ? applications.map((app) => (
                                            <tr key={app.id}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-mono text-slate-500 sm:pl-6">{app.userId.substring(0, 8)}...</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-400">{new Date(app.appliedDate).toLocaleDateString()}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-400">
                                                    <span className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300">{app.status}</span>
                                                </td>
                                                <td className="max-w-xs truncate whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-400" title={app.coverLetter}>
                                                    {app.coverLetter || "-"}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-blue-600 dark:text-blue-400">
                                                    <button onClick={() => setSelectedCvUrl(app.cvUrl)} className="flex items-center gap-2 font-semibold hover:underline">
                                                        <HiOutlineEye /> View CV
                                                    </button>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="5" className="p-8 text-center text-gray-500">
                                                    No applicants yet for this position.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            
            <AnimatePresence>
                {selectedCvUrl && (
                    <CvViewerModal 
                        cvUrl={selectedCvUrl}
                        onClose={() => setSelectedCvUrl(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

export default ApplicantsPage;
