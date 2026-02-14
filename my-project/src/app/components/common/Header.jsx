import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Menu, X, Search, Bell, ShoppingCart, User,
  Heart, Settings, LogOut, Package, Gavel,
  ChevronDown, TrendingUp
} from "lucide-react";
import { Container, CustomNavLink } from "../../router";
import { menulists } from "../../utils/data";
import { ShowOnLogin, ShowOnLogout } from "../../utils/HiddenLink";
import { selectIsLoggedIn } from "@/app/redux/features/authSlice";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { user } = useSelector((state) => state.auth);

  const menuRef = useRef(null);
  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenuOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setShowUserMenu(false);
    }
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
      setShowNotifications(false);
    }
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 20);
  };

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

  // Mock notifications
  const notifications = [
    { id: 1, title: "New bid on your item", time: "2 min ago", unread: true },
    { id: 2, title: "Auction ending soon", time: "1 hour ago", unread: true },
    { id: 3, title: "You won an auction!", time: "3 hours ago", unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-white/95 backdrop-blur-lg shadow-lg"
        : "bg-white shadow-md"
        }`}
    >
      <Container>
        <nav className="flex justify-between items-center py-4 px-4 md:px-0">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
              <Gavel className="w-8 h-8 text-emerald-600" />
              <span className="text-2xl font-bold text-gray-900">
                AuctionHub
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {menulists.map((list, index) => (
              <CustomNavLink
                key={index}
                href={list.path}
                className="text-sm font-medium text-gray-700 transition-all duration-200 hover:text-emerald-600"
              >
                {list.link}
              </CustomNavLink>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Search Icon */}
            <button
              className="hidden md:flex p-2 rounded-lg text-gray-700 transition-all duration-200 hover:bg-emerald-50"
              onClick={() => navigate("/search")}
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <ShowOnLogin>
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-lg text-gray-700 transition-all duration-200 hover:bg-emerald-50"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-fadeIn">
                    <div className="p-4 border-b border-gray-100 bg-emerald-50">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                      <p className="text-xs text-gray-600 mt-1">{unreadCount} unread</p>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${notif.unread ? "bg-emerald-50/30" : ""
                            }`}
                        >
                          <div className="flex items-start gap-3">
                            {notif.unread && (
                              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                            )}
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{notif.title}</p>
                              <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-gray-50 text-center">
                      <button className="text-sm text-purple-600 font-medium hover:text-purple-700">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </ShowOnLogin>

            {/* Shopping Cart */}
            <ShowOnLogin>
              <button
                className={`relative p-2 rounded-lg transition-all duration-200 hover:bg-purple-50 ${isScrolled || !isHomePage ? "text-gray-700" : "text-white"
                  }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                  3
                </span>
              </button>
            </ShowOnLogin>

            {/* User Menu */}
            <ShowOnLogin>
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-emerald-50 transition-all duration-200"
                >
                  <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white font-semibold">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-700 transition-transform ${showUserMenu ? "rotate-180" : ""}`} />
                </button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-fadeIn">
                    <div className="p-4 bg-emerald-600 text-white">
                      <p className="font-semibold">{user?.name || "User"}</p>
                      <p className="text-xs opacity-90 mt-1">{user?.email}</p>
                      <div className="mt-2 inline-block px-2 py-1 bg-white/20 rounded-md text-xs font-medium">
                        {role || "Buyer"}
                      </div>
                    </div>
                    <div className="py-2">
                      <button
                        onClick={() => navigate("/dashboard")}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                      >
                        <User className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">My Profile</span>
                      </button>
                      <button
                        onClick={() => navigate("/dashboard")}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                      >
                        <Package className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">My Auctions</span>
                      </button>
                      <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left">
                        <Heart className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">Watchlist</span>
                      </button>
                      <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left">
                        <Settings className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">Settings</span>
                      </button>
                      <div className="border-t border-gray-100 my-2"></div>
                      <button
                        onClick={() => navigate("/login")}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-50 transition-colors text-left text-red-600"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </ShowOnLogin>

            {/* Login/Register Buttons */}
            <ShowOnLogout>
              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 rounded-lg font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="px-5 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Sign Up
                </button>
              </div>
            </ShowOnLogout>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-lg text-gray-700 transition-all duration-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            ref={menuRef}
            className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-2xl border-t border-gray-100 animate-slideDown"
          >
            <div className="p-6 space-y-4">
              {menulists.map((list, index) => (
                <CustomNavLink
                  key={index}
                  href={list.path}
                  className="block py-3 px-4 text-gray-700 font-medium hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {list.link}
                </CustomNavLink>
              ))}

              <ShowOnLogout>
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <button
                    onClick={() => {
                      navigate("/login");
                      setIsOpen(false);
                    }}
                    className="w-full py-3 px-4 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-all duration-200"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      navigate("/register");
                      setIsOpen(false);
                    }}
                    className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg"
                  >
                    Sign Up
                  </button>
                </div>
              </ShowOnLogout>
            </div>
          </div>
        )}
      </Container>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </header>
  );
};
