import { Header } from "../Header";
import { Footer } from "../Footer";
import { Breadcrumb } from "../Breadcrumb";
import PropTypes from "prop-types"

import { useLocation } from "react-router-dom";

export const Layout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <Header />
      {!isHomePage && (
        <div className="container mx-auto px-4 py-4 mt-20">
          <Breadcrumb className="mb-4" />
        </div>
      )}
      <main>{children}</main>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
};
