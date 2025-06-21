import { Container } from "./Design";
import { MdGavel, MdMail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaInstagram, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MdGavel className="h-8 w-8 text-black" />
              <span className="text-xl font-bold text-black">AuctionHub</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              We are a trusted online auction marketplace where buyers and sellers
              connect through secure, transparent bidding. From rare collectibles
              to everyday items — bid, win, and enjoy.
            </p>
            <div className="flex space-x-4">
              <FaFacebook className="h-5 w-5 text-gray-400 hover:text-black cursor-pointer transition-colors" />
              <FaTwitter className="h-5 w-5 text-gray-400 hover:text-black cursor-pointer transition-colors" />
              <FaInstagram className="h-5 w-5 text-gray-400 hover:text-black cursor-pointer transition-colors" />
              <FaLinkedin className="h-5 w-5 text-gray-400 hover:text-black cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-black mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-black transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/featured-auctions"
                  className="text-gray-600 hover:text-black transition-colors text-sm"
                >
                  Featured Auctions
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="text-gray-600 hover:text-black transition-colors text-sm"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="text-gray-600 hover:text-black transition-colors text-sm"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-black transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-black mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/help"
                  className="text-gray-600 hover:text-black transition-colors text-sm"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-black transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-black transition-colors text-sm"
                >
                  Live Chat
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-black transition-colors text-sm"
                >
                  Community Forum
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-black transition-colors text-sm"
                >
                  Report an Issue
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-black mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MdMail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 text-sm">
                  support@auctionhub.com
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MdPhone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MdLocationOn className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 text-sm">
                  123 Auction Street, City
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} AuctionHub. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              to="/privacy"
              className="text-gray-500 hover:text-black transition-colors text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-500 hover:text-black transition-colors text-sm"
            >
              Terms of Service
            </Link>
            <Link
              to="/cookies"
              className="text-gray-500 hover:text-black transition-colors text-sm"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
