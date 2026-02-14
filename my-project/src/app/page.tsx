"use client";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Layout,
  Login,
  PrivateRoute,
  LoginAsSeller,
  Register,
  AddProduct,
  ProductPage,
  DashboardLayout,
  ProductEdit,
  Dashboard,
  ProductList,
  AdminProductList,
  ProductVerificationPage,
  UserList,
  WinningBidList,
  UserProfile,
  Catgeorylist,
  CreateCategory,
  UpdateCategory,
  NotFound,
  ScrollToTop,
  ProductsDetailsPage,
  Wallet,
  ForgotPassword,
  ResetPassword,
  VerifyEmail,
  TermsAndConditions,
  PrivacyPolicy,
  Blog,
  About,
  Services,
  Contact,
  NavigationProgress,
  ErrorBoundary,
  SessionManager,
  SessionSetup,
  Search,

} from "./router/index.js"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import { useDispatch } from "react-redux";
import { getLogInStatus } from "./redux/features/authSlice.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { AppDispatch } from "./redux/store";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    dispatch(getLogInStatus());
  }, [dispatch]);

  // Don't render anything until client-side hydration is complete
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <BrowserRouter>
        <SessionSetup>
          <NavigationProgress />
          <ToastContainer />
          <ScrollToTop />
          <ErrorBoundary>
            <SessionManager>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Layout>
                      <Home />
                    </Layout>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <Layout>
                      <Login />
                    </Layout>
                  }
                />
                <Route
                  path="/seller/login"
                  element={
                    <Layout>
                      <LoginAsSeller />
                    </Layout>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <Layout>
                      <Register />
                    </Layout>
                  }
                />
                <Route
                  path="/forgot-password"
                  element={
                    <Layout>
                      <ForgotPassword />
                    </Layout>
                  }
                />
                <Route
                  path="/reset-password"
                  element={
                    <Layout>
                      <ResetPassword />
                    </Layout>
                  }
                />
                <Route
                  path="/verify-email"
                  element={
                    <Layout>
                      <VerifyEmail />
                    </Layout>
                  }
                />
                <Route
                  path="/search"
                  element={
                    <Layout>
                      <Search />
                    </Layout>
                  }
                />
                <Route
                  path="/add"
                  element={
                    <PrivateRoute>
                      <DashboardLayout>
                        <AddProduct />
                      </DashboardLayout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/product"
                  element={
                    <PrivateRoute>
                      <Layout>
                        <ProductPage />
                      </Layout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/product/update/:id"
                  element={
                    <PrivateRoute>
                      <DashboardLayout>
                        <ProductEdit />
                      </DashboardLayout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/details/:id"
                  element={
                    <Layout>
                      <ProductsDetailsPage />
                    </Layout>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <DashboardLayout>
                        <Dashboard />
                      </DashboardLayout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/dashboard/my-products"
                  element={
                    <PrivateRoute>
                      <DashboardLayout>
                        <ProductList />
                      </DashboardLayout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/dashboard/products"
                  element={
                    <PrivateRoute>
                      <DashboardLayout>
                        <AdminProductList />
                      </DashboardLayout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/dashboard/create-product"
                  element={
                    <PrivateRoute>
                      <DashboardLayout>
                        <AddProduct />
                      </DashboardLayout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/dashboard/users"
                  element={
                    <PrivateRoute>
                      <DashboardLayout>
                        <UserList />
                      </DashboardLayout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/dashboard/winning-bids"
                  element={
                    <PrivateRoute>
                      <DashboardLayout>
                        <WinningBidList />
                      </DashboardLayout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/dashboard/profile"
                  element={
                    <PrivateRoute>
                      <DashboardLayout>
                        <UserProfile />
                      </DashboardLayout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/dashboard/categories"
                  element={
                    <PrivateRoute>
                      <DashboardLayout>
                        <Catgeorylist />
                      </DashboardLayout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/product/admin/update/:id"
                  element={
                    <PrivateRoute>
                      <DashboardLayout>
                        <ProductVerificationPage />
                      </DashboardLayout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/category/create"
                  element={
                    <PrivateRoute>
                      <DashboardLayout>
                        <CreateCategory />
                      </DashboardLayout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/category/update/:id"
                  element={
                    <PrivateRoute>
                      <DashboardLayout>
                        <UpdateCategory />
                      </DashboardLayout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/dashboard/wallet"
                  element={
                    <PrivateRoute>
                      <DashboardLayout>
                        <Wallet />
                      </DashboardLayout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/terms"
                  element={
                    <Layout>
                      <TermsAndConditions />
                    </Layout>
                  }
                />
                <Route
                  path="/privacy"
                  element={
                    <Layout>
                      <PrivacyPolicy />
                    </Layout>
                  }
                />
                <Route
                  path="/blog"
                  element={
                    <Layout>
                      <Blog />
                    </Layout>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <Layout>
                      <About />
                    </Layout>
                  }
                />
                <Route
                  path="/services"
                  element={
                    <Layout>
                      <Services />
                    </Layout>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <Layout>
                      <Contact />
                    </Layout>
                  }
                />
                <Route
                  path="/*"
                  element={
                    <Layout>
                      <NotFound />
                    </Layout>
                  }
                />
              </Routes>
            </SessionManager>
          </ErrorBoundary>
        </SessionSetup>
      </BrowserRouter>
    </>
  );
}

export default App;
