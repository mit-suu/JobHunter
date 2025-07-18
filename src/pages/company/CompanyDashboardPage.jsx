import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getJobs } from '../../services/jobService'; 

// Import Icons
import { 
    HiOutlineBriefcase, 
    HiOutlineUsers, 
    HiOutlineClock,
    HiOutlinePlus,
    HiArrowUpRight
} from 'react-icons/hi2';

// --- Reusable Bento Box Component ---
const BentoCard = ({ children, className = "", ...props }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-slate-700/50 dark:bg-slate-800/50 dark:shadow-slate-900/50 ${className}`}
        {...props}
    >
        {children}
    </motion.div>
);

// --- Stat Card Component ---
const StatCard = ({ icon, title, value, gradient }) => (
    <BentoCard className={`flex flex-col justify-between text-white ${gradient}`}>
        <div className="flex items-start justify-between">
            <h3 className="font-semibold text-white/90">{title}</h3>
            <div className="text-2xl text-white/70">{icon}</div>
        </div>
        <p className="text-4xl font-bold tracking-tight">{value}</p>
    </BentoCard>
);

// --- Main Dashboard Page Component ---
function CompanyDashboardPage() {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const [companyJobs, setCompanyJobs] = useState([]);
    const [stats, setStats] = useState({ totalJobs: 0, totalApplicants: 0, averageTimeToFill: 32 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const name = localStorage.getItem('username');
        if (name) {
            setCompanyName(name);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        if (!companyName) return;

        const fetchCompanyJobs = async () => {
            setLoading(true);
            try {
                const allJobs = await getJobs();
                const jobs = allJobs.filter(job => job.company === companyName);
                setCompanyJobs(jobs);

                const totalApplicants = jobs.reduce((sum, job) => sum + (job.applied || 0), 0);
                setStats(prev => ({ ...prev, totalJobs: jobs.length, totalApplicants }));

            } catch (error) {
                console.error("Failed to fetch company jobs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanyJobs();
    }, [companyName]);

    if (loading) {
        return <div className="flex h-screen items-center justify-center bg-slate-100 dark:bg-slate-900">Loading Dashboard...</div>;
    }

    return (
        <div className="min-h-screen bg-slate-100 p-4 dark:bg-slate-900 sm:p-6 lg:p-8">
            <main className="mx-auto max-w-7xl">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Dashboard
                    </h1>
                    <p className="mt-1 text-slate-500 dark:text-slate-400">
                        Welcome back, {companyName}!
                    </p>
                </motion.div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:grid-rows-3">
                    {/* Post a New Job Card (Lớn nhất) */}
                    <BentoCard className="group lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-blue-600 to-slate-900 text-white flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">Ready to find your next star?</h2>
                            <p className="mt-2 text-white/80">Create a new job posting and reach thousands of qualified candidates.</p>
                        </div>
                        <button 
                            onClick={() => alert('Chức năng đăng tin mới!')}
                            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-blue-600 shadow-lg transition-transform duration-300 group-hover:scale-105"
                        >
                            <HiOutlinePlus className="h-6 w-6" />
                            Post a New Job
                        </button>
                    </BentoCard>

                    {/* Stat Cards */}
                    <StatCard icon={<HiOutlineBriefcase />} title="Total Jobs" value={stats.totalJobs} gradient="bg-gradient-to-br from-sky-500 to-blue-600" />
                    <StatCard icon={<HiOutlineUsers />} title="Applicants" value={stats.totalApplicants} gradient="bg-gradient-to-br from-slate-800 to-slate-900" />
                    <StatCard icon={<HiOutlineClock />} title="Avg. Time to Fill" value={`${stats.averageTimeToFill} days`} gradient="bg-gradient-to-br from-blue-400 to-sky-600" />
                    
                    {/* View Profile Card */}
                    <BentoCard className="group flex items-center justify-between !bg-white dark:!bg-slate-800">
                        <div>
                            <h3 className="font-semibold text-slate-800 dark:text-white">Company Profile</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">View or edit your public profile</p>
                        </div>
                        <button onClick={() => navigate(`/profile/${localStorage.getItem('userId')}`)} className="rounded-full bg-slate-100 p-3 text-slate-600 transition-colors group-hover:bg-blue-100 group-hover:text-blue-600 dark:bg-slate-700 dark:text-slate-300 dark:group-hover:bg-blue-600/50 dark:group-hover:text-white">
                            <HiArrowUpRight className="h-5 w-5" />
                        </button>
                    </BentoCard>

                    {/* Job Postings Table (chiếm phần còn lại) */}
                    <BentoCard className="lg:col-span-4 lg:row-span-2 !p-0">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Active Job Postings</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead className="border-b border-slate-200/80 bg-slate-50 text-left text-slate-500 dark:border-slate-700/80 dark:bg-slate-800/50 dark:text-slate-400">
                                    <tr>
                                        <th className="p-4 font-medium">Job Title</th>
                                        <th className="p-4 font-medium">Applicants</th>
                                        <th className="p-4 font-medium">Status</th>
                                        <th className="p-4 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                    {companyJobs.length > 0 ? companyJobs.map((job) => (
                                        <tr key={job.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50">
                                            <td className="p-4 font-semibold text-slate-900 dark:text-white">{job.title}</td>
                                            <td className="p-4 text-slate-600 dark:text-slate-300">{job.applied} / {job.capacity}</td>
                                            <td className="p-4">
                                                <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800 dark:bg-green-900/50 dark:text-green-300">Active</span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <button 
                                                    onClick={() => navigate(`/company-dashboard/job/${job.id}/applicants`)} 
                                                    className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                                                >
                                                    View Applicants
                                                </button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="4" className="p-8 text-center text-slate-500">No active jobs found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </BentoCard>
                </div>
            </main>
        </div>
    );
}

export default CompanyDashboardPage;
