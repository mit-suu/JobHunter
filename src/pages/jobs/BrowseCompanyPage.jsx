import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { companyService } from "../../services/companyService";
import CompanyCard from "../../components/company/CompanyCard";
import CompanyFilterBar from "../../components/company/CompanyFilterBar";
import ComPagination from "../../components/common/ComPagination";

const COMPANIES_PER_PAGE = 12;

function BrowseCompanyPage() {
  const [allCompanies, setAllCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("most-jobs");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        setLoading(true);
        const data = await companyService.getCompanies();
        setAllCompanies(data);
      } catch (error) {
        console.error("Could not load companies", error);
      } finally {
        setLoading(false);
      }
    };
    loadCompanies();
  }, []);

  useEffect(() => {
    let result = [...allCompanies];

    if (searchTerm) {
      result = result.filter((company) =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOption === "most-jobs") {
      result.sort((a, b) => b.jobCount - a.jobCount);
    } else if (sortOption === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredCompanies(result);
    setCurrentPage(1);
  }, [searchTerm, sortOption, allCompanies]);

  const currentCompanies = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * COMPANIES_PER_PAGE;
    const lastPageIndex = firstPageIndex + COMPANIES_PER_PAGE;
    return filteredCompanies.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredCompanies]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="overflow-hidden bg-gradient-to-b from-purple-50 via-white to-blue-50 py-20 dark:from-gray-800/50 dark:via-gray-900 dark:to-blue-900/20">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover Great Companies
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Find your next workplace from our list of top-tier partners.
          </motion.p>
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <CompanyFilterBar
                onSearchChange={setSearchTerm}
                onSortChange={setSortOption}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {loading ? (
          <p className="mt-8 text-center text-gray-500 dark:text-gray-400">Loading companies...</p>
        ) : (
          <>
            <motion.div
              layout
              className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
            >
              <AnimatePresence>
                {currentCompanies.length > 0 ? (
                  currentCompanies.map((company) => (
                    <motion.div
                      key={company.name}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CompanyCard company={company} />
                    </motion.div>
                  ))
                ) : (
                  <p className="col-span-full mt-8 text-center text-gray-500 dark:text-gray-400">
                    No companies found.
                  </p>
                )}
              </AnimatePresence>
            </motion.div>

            <ComPagination
              currentPage={currentPage}
              totalCount={filteredCompanies.length}
              pageSize={COMPANIES_PER_PAGE}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default BrowseCompanyPage;