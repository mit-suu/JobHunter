import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getJobById, updateJob } from '../../services/jobService';
import { submitApplication } from '../../services/applicationService';
import ApplicationModal from '../../components/jobs/ApplicationModal';

import { 
    HiOutlineBuildingOffice2, 
    HiOutlineMapPin, 
    HiOutlineCalendarDays, 
    HiOutlineCheckCircle,
    HiOutlineArrowLeft,
    HiOutlineBanknotes,
    HiOutlineBriefcase
} from 'react-icons/hi2';

const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

function JobDetailPage() {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applied, setApplied] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchJobDetails = async () => {
            setLoading(true);
            const jobData = await getJobById(jobId);
            setJob(jobData);

            // Kiểm tra xem user đã apply job này từ localStorage chưa
            const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
            if (appliedJobs.includes(jobId)) {
                setApplied(true);
            }
            setLoading(false);
        };

        fetchJobDetails();
    }, [jobId]);

    const handleApplyClick = () => {
        if (applied) return;
        setIsModalOpen(true);
    };

    const handleSubmitApplication = async ({ coverLetter, cvFile }) => {
        if (!job) return;

        const formData = new FormData();
        formData.append("file", cvFile);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        try {
             const uploadResponse = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                { method: "POST", body: formData }
            );
            
            const uploadData = await uploadResponse.json();
            
            if (!uploadData.secure_url) {
                console.error("Cloudinary upload error response:", uploadData);
                throw new Error('CV upload failed.');
            }
            const cvUrl = uploadData.secure_url;

            const applicationData = {
                jobId: job.id,
                userId: localStorage.getItem('userId'),
                companyName: job.company,
                coverLetter: coverLetter,
                cvUrl: cvUrl,
                status: 'Pending',
                appliedDate: new Date().toISOString(),
            };
            await submitApplication(applicationData);

            const updatedJob = await updateJob(job.id, { applied: job.applied + 1 });
            setJob(updatedJob);
            setApplied(true);

            const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
            localStorage.setItem('appliedJobs', JSON.stringify([...appliedJobs, jobId]));

            alert('Application submitted successfully!');
            setIsModalOpen(false);

        } catch (error) {
            console.error("Application submission failed:", error);
            alert('An error occurred, please try again.');
        }
    };

    if (loading) {
        return <div className="flex h-screen items-center justify-center bg-slate-100 dark:bg-slate-900">Loading...</div>;
    }

    if (!job) {
        return <div className="flex h-screen items-center justify-center bg-slate-100 dark:bg-slate-900">Job not found.</div>;
    }

    const DetailItem = ({ icon, label, value }) => (
        <div className="flex items-start gap-3">
            <div className="flex-shrink-0 text-blue-500 dark:text-sky-400">{icon}</div>
            <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
                <p className="font-semibold text-slate-800 dark:text-white">{value}</p>
            </div>
        </div>
    );

    return (
        <>
            <div className="bg-slate-100 dark:bg-slate-900">
                {/* Header của trang */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-r from-slate-900 to-slate-800"
                >
                    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-4">
                            <img src={job.logo} alt={`${job.company} logo`} className="h-20 w-20 rounded-xl bg-white p-2 shadow-md" />
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{job.title}</h1>
                                <p className="mt-1 text-lg text-slate-300">
                                    <Link to={`/companies/${job.company}`} className="font-medium hover:underline">{job.company}</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <main className="mx-auto -mt-8 max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
                        {/* Cột chính bên trái */}
                        <div className="grid grid-cols-1 gap-8 lg:col-span-2">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
                            >
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Job Overview</h2>
                                <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3">
                                    <DetailItem icon={<HiOutlineMapPin size={24} />} label="Location" value={job.location} />
                                    <DetailItem icon={<HiOutlineBriefcase size={24} />} label="Job Type" value={job.type} />
                                    <DetailItem icon={<HiOutlineBanknotes size={24} />} label="Salary" value={job.salaryRange} />
                                </div>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="space-y-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
                            >
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Job Description</h2>
                                    <p className="mt-4 whitespace-pre-line text-slate-600 dark:text-slate-300">{job.jobDescription}</p>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Requirements</h2>
                                    <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
                                        {job.requirements.split('\n').map((req, index) => req.trim() && <li key={index}>{req.replace('-', '').trim()}</li>)}
                                    </ul>
                                </div>
                                 <div>
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Benefits</h2>
                                    <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
                                        {job.benefits.split('\n').map((ben, index) => ben.trim() && <li key={index}>{ben.replace('-', '').trim()}</li>)}
                                    </ul>
                                </div>
                            </motion.div>
                        </div>

                        {/* Cột phụ bên phải (sticky) */}
                        <div className="lg:sticky lg:top-24">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
                            >
                                <button
                                    onClick={handleApplyClick}
                                    disabled={applied}
                                    className={`w-full rounded-lg px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 ${
                                        applied
                                            ? 'cursor-not-allowed bg-green-500'
                                            : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600'
                                    }`}
                                >
                                    {applied ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <HiOutlineCheckCircle className="h-6 w-6" /> Applied
                                        </span>
                                    ) : (
                                        'Apply Now'
                                    )}
                                </button>
                                <div className="mt-6 space-y-4 border-t border-slate-200 pt-6 dark:border-slate-700">
                                    <DetailItem icon={<HiOutlineCalendarDays />} label="Date Posted" value={new Date(job.postedDate).toLocaleDateString()} />      
                                    <DetailItem icon={<HiOutlineCalendarDays />} label="Deadline" value={new Date(job.deadline).toLocaleDateString()} />
                                    <DetailItem icon={<HiOutlineBuildingOffice2 />} label="Company" value={job.company} />
                                </div>
                                <Link to="/findjobs" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700">
                                    <HiOutlineArrowLeft />
                                    Back to all jobs
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Render Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <ApplicationModal 
                        job={job}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={handleSubmitApplication}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

export default JobDetailPage;
