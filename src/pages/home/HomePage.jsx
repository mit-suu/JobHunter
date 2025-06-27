import Hero from '../../components/layout/Hero';
import CategoryList from '../../components/home/CategoryList'
import CTA from '../../components/home/CTA';
import FeaturedJobsList from '../../components/home/FeaturedJobsList';
import LatestJobsList from '../../components/home/LatestJobsList';
function HomePage() {

  return (
    <>
      <Hero/>
 <CategoryList/>
 <CTA/>
 <FeaturedJobsList/>
< LatestJobsList/>
    </>
  );
}

export default HomePage;
