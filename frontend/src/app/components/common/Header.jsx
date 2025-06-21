import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// Corrected icon imports from react-icons/md
import { MdGavel, MdPerson, MdMenu } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { Container, CustomNavLink, CustomNavLinkList, ProfileCard } from "../../router";
import { menulists } from "../../utils/data";
import { ShowOnLogin, ShowOnLogout } from "../../utils/HiddenLink"
import { selectIsLoggedIn } from "@/app/redux/features/authSlice";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const { user } = useSelector((state) => state.auth);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenuOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  const handleScroll = () => setIsScrolled(window.scrollY > 0);

  useEffect(() => {
    document.addEventListener("mousedown", closeMenuOutside);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("mousedown", closeMenuOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isHomePage = location.pathname === "/";
  const role = user?.role;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <MdGavel className="h-8 w-8 text-black" />
            <span className="text-xl font-bold text-black">AuctionHub</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menulists.map((list) => (
              <CustomNavLinkList
                key={list.id}
                href={list.path}
                isActive={location.pathname === list.path}
                className="text-gray-900 hover:text-black transition-colors font-medium"
              >
                {list.link}
              </CustomNavLinkList>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <ShowOnLogout>
              <CustomNavLink href="/login" className="hidden md:flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
                <MdPerson className="h-4 w-4" />
                <span>Sign In</span>
              </CustomNavLink>
              <CustomNavLink href="/register" className="hidden md:flex items-center space-x-2 bg-white text-black border border-black px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
                <span>Sign Up</span>
              </CustomNavLink>
            </ShowOnLogout>
            <ShowOnLogin>
              <CustomNavLink href="/dashboard">
                <ProfileCard>
                  <img src={user?.photo} alt="" className="w-full h-full object-cover" />
                </ProfileCard>
              </CustomNavLink>
              {role === "buyer" && (
                <CustomNavLink href="/seller/login" className="ml-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                  Become Seller
                </CustomNavLink>
              )}
            </ShowOnLogin>
            <MdMenu onClick={toggleMenu} className="h-6 w-6 text-gray-600 md:hidden cursor-pointer" />
          </div>
        </div>
      </div>
      {/* Responsive Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 translate-x-0"
        >
          <button onClick={toggleMenu} className="absolute top-4 right-4">
            <AiOutlineClose size={24} />
          </button>
          <nav className="flex flex-col mt-16 space-y-4 px-6">
            {menulists.map((list) => (
              <CustomNavLinkList
                key={list.id}
                href={list.path}
                isActive={location.pathname === list.path}
                className="text-gray-900 hover:text-black transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                {list.link}
              </CustomNavLinkList>
            ))}
            <ShowOnLogout>
              <CustomNavLink href="/login" className="text-gray-900 hover:text-black transition-colors font-medium" onClick={() => setIsOpen(false)}>
                Sign in
              </CustomNavLink>
              <CustomNavLink href="/register" className="bg-green px-8 py-2 rounded-full text-primary shadow-md mt-2" onClick={() => setIsOpen(false)}>
                Join
              </CustomNavLink>
            </ShowOnLogout>
            <ShowOnLogin>
              <CustomNavLink href="/dashboard" onClick={() => setIsOpen(false)}>
                <ProfileCard>
                  <img src={user?.photo} alt="" className="w-8 h-8 rounded-full object-cover" />
                </ProfileCard>
              </CustomNavLink>
              {role === "buyer" && (
                <CustomNavLink href="/seller/login" className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors" onClick={() => setIsOpen(false)}>
                  Become Seller
                </CustomNavLink>
              )}
            </ShowOnLogin>
          </nav>
        </div>
      )}
    </header>
  );
};
