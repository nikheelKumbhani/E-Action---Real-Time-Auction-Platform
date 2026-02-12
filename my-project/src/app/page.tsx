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

} from "./router/index.js"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import { useDispatch, useSelector } from "react-redux";
import { getLogInStatus } from "./redux/features/authSlice.js";
import { useEffect } from "react";
import axios from "axios";
import { AppDispatch } from "./redux/store"; // Add this import

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch<AppDispatch>() // Fix dispatch typing

  useEffect(() =>{
    dispatch(getLogInStatus());

  },[dispatch]);
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <ScrollToTop />
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
              <PrivateRoute>
                <Layout>
                  <LoginAsSeller />
                </Layout>
              </PrivateRoute>
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
            path="/add"
            element={
              <PrivateRoute>
                <Layout>
                  <DashboardLayout>
                    <AddProduct />
                  </DashboardLayout>
                </Layout>
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
            path="/userlist"
            element={
              <PrivateRoute>
                <Layout>
                  <DashboardLayout>
                    <UserList />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/winning-products"
            element={
              <PrivateRoute>
                <Layout>
                  <DashboardLayout>
                    <WinningBidList />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Layout>
                  <DashboardLayout>
                    <UserProfile />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/category"
            element={
              <PrivateRoute>
                <Layout>
                  <DashboardLayout>
                    <Catgeorylist />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/category/create"
            element={
              <PrivateRoute>
                <Layout>
                  <DashboardLayout>
                    <CreateCategory />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/category/update/:id"
            element={
              <PrivateRoute>
                <Layout>
                  <DashboardLayout>
                    <UpdateCategory />
                  </DashboardLayout>
                </Layout>
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
            path="/*"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;


