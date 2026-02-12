import { Container, ProfileCard, Title } from "./Design";
import { FiPhoneOutgoing } from "react-icons/fi";
import { MdOutlineAttachEmail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin, CiTwitter } from "react-icons/ci";
import { AiOutlineYoutube } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { IoArrowUp } from "react-icons/io5";
import { Link } from "react-router-dom";
import NewsletterForm from "./NewsletterForm";

export const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative bg-[#101828] text-[#e0e0e0] py-16 mt-16">
      {isHomePage && <div className="bg-white w-full py-20 -mt-10 rounded-b-[40px] z-10 absolute top-0"></div>}

      <Container className={`${isHomePage ? "mt-32" : "mt-0"}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <Title level={5} className="text-white font-normal mb-4">About Us</Title>
            <img src="../images/common/header-logo.png" alt="AuctionHub" className="mb-4" />
            <p className="text-gray-300">
              We are a trusted online auction marketplace where buyers and sellers connect through secure, transparent
              bidding. From rare collectibles to everyday items — bid, win, and enjoy.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <Title level={5} className="text-white font-normal">Quick Links</Title>
            <ul className="flex flex-col gap-5 mt-8 text-gray-200">
              <Link to="/" className="hover:text-[#00bcd4] transition-colors">Home</Link>
              <Link to="/featured-auctions" className="hover:text-[#00bcd4] transition-colors">Featured Auctions</Link>
              <Link to="/categories" className="hover:text-[#00bcd4] transition-colors">Categories</Link>
              <Link to="/how-it-works" className="hover:text-[#00bcd4] transition-colors">How It Works</Link>
              <Link to="/contact" className="hover:text-[#00bcd4] transition-colors">Contact Us</Link>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <Title level={5} className="text-white font-normal">Legal</Title>
            <ul className="flex flex-col gap-5 mt-8 text-gray-200">
              <Link to="/terms" className="hover:text-[#00bcd4] transition-colors">Terms of Service</Link>
              <Link to="/privacy" className="hover:text-[#00bcd4] transition-colors">Privacy Policy</Link>
              <Link to="/cookies" className="hover:text-[#00bcd4] transition-colors">Cookie Policy</Link>
              <Link to="/help" className="hover:text-[#00bcd4] transition-colors">Help Center</Link>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <Title level={5} className="text-white font-normal">Contact Us</Title>
            <ul className="flex flex-col gap-5 mt-8 text-gray-200">
              <div className="flex items-center gap-2">
                <FiPhoneOutgoing size={19} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MdOutlineAttachEmail size={22} />
                <span>support@auctionhub.com</span>
              </div>
              <div className="flex items-center gap-2">
                <IoLocationOutline size={22} />
                <span>123 Auction Street, City</span>
              </div>
            </ul>

            {/* Social Media Icons */}
            <div className="flex items-center mt-5 gap-4">
              <ProfileCard className="bg-white hover:bg-[#00bcd4] transition-colors">
                <AiOutlineYoutube size={22} />
              </ProfileCard>
              <ProfileCard className="bg-white hover:bg-[#00bcd4] transition-colors">
                <FaInstagram size={22} />
              </ProfileCard>
              <ProfileCard className="bg-white hover:bg-[#00bcd4] transition-colors">
                <CiTwitter size={22} />
              </ProfileCard>
              <ProfileCard className="bg-white hover:bg-[#00bcd4] transition-colors">
                <CiLinkedin size={22} />
              </ProfileCard>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <div className="max-w-md">
            <Title className="font-normal text-gray-100">Get The Latest Updates</Title>
            <NewsletterForm />
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-300">© {new Date().getFullYear()} AuctionHub. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <select className="bg-transparent border border-gray-700 rounded px-2 py-1">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>
      </Container>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-[#00bcd4] text-white p-3 rounded-full shadow-lg hover:bg-[#0097a7] transition-colors"
        aria-label="Scroll to top"
      >
        <IoArrowUp size={20} />
      </button>
    </footer>
  );
};
