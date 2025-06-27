import { useEffect } from 'react';
import JobsPage from '../../components/jobs/JobsPage';
import Hero from '../../components/layout/Hero';

function FindJobsPages() {
  return (
    <>  
      <Hero />
      <div id="job-list">
        <JobsPage />
      </div>
    </>
  );
}

export default FindJobsPages;
