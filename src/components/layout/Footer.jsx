import Logo from '../common/Logo';
import { aboutLinks, resourceLinks, socialLinks } from '../../contants/footerLink';
import { FaFacebookF, FaInstagram, FaDribbble, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const iconComponents = {
  FaFacebookF,
  FaInstagram,
  FaDribbble,
  FaLinkedinIn,
  FaTwitter,
};

function Footer() {
  return (
    <footer className="bg-[#1D1E25] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Column 1 - Logo + intro */}
        <div>
          <Logo active={false} />
          <p className="mt-4 text-gray-400 text-sm leading-6">
            Great platform for the job seeker that passionate about startups. Find your dream job easier.
          </p>
        </div>

        {/* Column 2 - About */}
        <div>
          <h4 className="text-white font-semibold mb-4">About</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            {aboutLinks.map((item, index) => (
              <li key={index}>
                <a href="/home" className="hover:text-white">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 - Resources */}
        <div>
          <h4 className="text-white font-semibold mb-4">Resources</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            {resourceLinks.map((item, index) => (
              <li key={index}>
                <a href="/home" className="hover:text-white">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 - Subscribe */}
        <div>
          <h4 className="text-white font-semibold mb-4">Get job notifications</h4>
          <p className="text-gray-400 text-sm mb-4">
            The latest job news, articles, sent to your inbox weekly.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 px-4 py-2 rounded-l-md text-black focus:outline-none"
            />
            <button className="px-4 py-2 bg-[#4640DE] text-white font-semibold rounded-r-md">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between text-base text-gray-400">
        <p>2025 @Tran Tuan Hiep. All rights reserved.</p>

        <div className="flex space-x-4 mt-4 md:mt-0">
          {socialLinks.map((item, index) => {
            const Icon = iconComponents[item.icon];
            return (
              <a key={index} href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <Icon size={25} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
