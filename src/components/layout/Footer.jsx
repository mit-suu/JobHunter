import { useTranslation } from "react-i18next";
import Logo from "../common/Logo";
import {
  aboutLinks,
  resourceLinks,
  socialLinks,
} from "../../contants/footerLink";
import {
  FaFacebookF,
  FaInstagram,
  FaDribbble,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const iconComponents = {
  FaFacebookF,
  FaInstagram,
  FaDribbble,
  FaLinkedinIn,
  FaTwitter,
};

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#202430] py-12 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-4">
        {/* Column 1 - Logo + intro */}
        <div>
          <Logo active={false} />
          <p className="mt-4 text-sm leading-6 text-gray-400">
            {t("footer.intro")}
          </p>
        </div>

        {/* Column 2 - About */}
        <div>
          <h4 className="mb-4 font-semibold text-white">{t("footer.about")}</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            {aboutLinks.map((item, index) => (
              <li key={index}>
                <a href="/home" className="hover:text-white">
                  {t(`footer.about_links.${index}`)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 - Resources */}
        <div>
          <h4 className="mb-4 font-semibold text-white">{t("footer.resources")}</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            {resourceLinks.map((item, index) => (
              <li key={index}>
                <a href="/home" className="hover:text-white">
                  {t(`footer.resource_links.${index}`)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 - Subscribe */}
        <div>
          <h4 className="mb-4 font-semibold text-white">
            {t("footer.subscribe_title")}
          </h4>
          <p className="mb-4 text-sm text-gray-400">
            {t("footer.subscribe_desc")}
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder={t("footer.placeholder_email")}
              className="flex-1 rounded-l-md px-4 py-2 text-black focus:outline-none"
            />
            <button className="rounded-r-md bg-[#4640DE] px-4 py-2 font-semibold text-white">
              {t("footer.subscribe_button")}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between border-t border-gray-700 pt-6 text-base text-gray-400 md:flex-row">
        <p>{t("footer.copyright")}</p>

        <div className="mt-4 flex space-x-4 md:mt-0">
          {socialLinks.map((item, index) => {
            const Icon = iconComponents[item.icon];
            return (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
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
