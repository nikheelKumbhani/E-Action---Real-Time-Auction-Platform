import { Header } from "../Header";
import { Footer } from "../Footer";
import PropTypes from "prop-types"

export const Layout = ({ children }) => {
    return (
      <>
        <Header />
        <main>{children}</main>
        <Footer />
      </>
    );
  };

Layout.prototype ={
    children: PropTypes.any,
};