import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

import { getJobs } from "../../services/jobService";
import FeaturedJobsItem from "../../components/home/FeaturedJobsItem";
import { HiArrowLeft, HiMapPin } from "react-icons/hi2";


function CompanyJobsList() {
    const { companyName } = useParams();
    const [companyJobs, setCompanyJobs] = useState([]);
    const [companyInfo, setCompanyInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        const fetchCompanyJobs = async () => {
            try {
                const allJobs = await getJobs();
                const filteredJobs = allJobs.filter(
                    (job) => job.company === companyName
                );

                setCompanyJobs(filteredJobs);

                if (filteredJobs.length > 0) {
                    setCompanyInfo({
                        name: filteredJobs[0].company,
                        logo: filteredJobs[0].logo,
                        location: filteredJobs[0].location,
                    });
                } else {
                    setCompanyInfo({ name: companyName, logo: '', location: 'N/A' });
                }

            } catch (error) {
                console.error("Failed to fetch jobs for company:", error);
            } finally {
                setLoading(false);
            }
        };

        if (companyName) {
            fetchCompanyJobs();
        }
    }, [companyName]);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">


                {loading ? (
                    <p className="text-center text-gray-500">Loading company details...</p>
                ) : companyInfo && (
                    <>
                        <motion.section
                            className="flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-purple-50 via-white to-blue-50 p-8 text-center dark:from-gray-800 dark:via-gray-800/80 dark:to-blue-900/30"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="mb-4 rounded-full bg-white p-4 shadow-md">
                                <img src={companyInfo.logo} alt={`${companyInfo.name} logo`} className="h-20 w-20 object-contain" />
                            </div>
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{companyInfo.name}</h1>
                            <div className="mt-2 flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                <HiMapPin />
                                <span>{companyInfo.location}</span>
                            </div>
                        </motion.section>


                        <section className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Open Positions</h2>
                            {companyJobs.length > 0 ? (
                                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {companyJobs.map((job, index) => (
                                        <motion.div
                                            key={job.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                        >
                                            <FeaturedJobsItem job={job} />
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="mt-6 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center dark:border-gray-700">
                                    <p className="text-gray-500 dark:text-gray-400">
                                        There are currently no open positions at this company.
                                    </p>
                                </div>
                            )}
                        </section>
                        <div className="mb-8 mt-8">
                            <Link
                                to="/companies"
                                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                            >
                                <HiArrowLeft className="h-4 w-4" />
                                Back to all companies
                            </Link>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}

export default CompanyJobsList;