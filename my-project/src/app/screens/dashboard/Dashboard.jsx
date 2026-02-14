import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRedirectLoggedOutUser } from "../../hooks/userRedirectLoggedOutUser";
import { useUserProfile } from "../../hooks/useUserProfile";
import { getAllUser, getUserIncome } from "@/app/redux/features/authSlice";
import { getAllProducts, getAllProductsOfUser, getAllWonedProductsOfUser } from "@/app/redux/features/productSlice";
import AdminDashboard from "../../components/dashboard-views/admin-dashboard";
import BuyerDashboard from "../../components/dashboard-views/buyer-dashboard";
import SellerDashboard from "../../components/dashboard-views/seller-dashboard";

export const Dashboard = () => {
  useRedirectLoggedOutUser("/login");
  const { role } = useUserProfile();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Only fetch data if user is authenticated
    if (user) {
      dispatch(getUserIncome());
      dispatch(getAllProducts());
      dispatch(getAllWonedProductsOfUser());
      dispatch(getAllProductsOfUser());

      // Only fetch all users if admin
      if (user.role === 'admin') {
        dispatch(getAllUser());
      }
    }
  }, [dispatch, user]);

  const renderDashboard = () => {
    switch (role) {
      case "admin":
        return <AdminDashboard />;
      case "buyer":
        return <BuyerDashboard />;
      case "seller":
        return <SellerDashboard />;
      default:
        return <BuyerDashboard />;
    }
  };

  return (
    <section>
      {renderDashboard()}
    </section>
  );
};
