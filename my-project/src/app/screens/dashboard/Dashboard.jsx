import React from "react";
import { Title } from "../../router";
import { MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRedirectLoggedOutUser } from "../../hooks/userRedirectLoggedOutUser"
import { useUserProfile } from "../../hooks/useUserProfile"
import { getAllUser, getUserIncome, getuserProfile } from "@/app/redux/features/authSlice";
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
    <>
      <section>
        {renderDashboard()}
      </section>
    </>
  );
};

export const UserProduct = () => {
  return (
    <>
      <div className="shadow-s1 p-8 rounded-lg">
        <Title level={5} className=" font-normal">
          Purchasing
        </Title>
        <hr className="my-5" />
        <div className="relative overflow-x-auto rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-5">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Bidding ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Bid Amount(USD)
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">Auction Title 01</td>
                <td className="px-6 py-4">Bidding_HvO253gT</td>
                <td className="px-6 py-4">1222.8955</td>
                <td className="px-6 py-4">
                  <img className="w-10 h-10" src="https://bidout-react.vercel.app/images/bg/order1.png" alt="Jeseimage" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green me-2"></div> Success
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <NavLink to="#" type="button" className="font-medium text-green">
                    <MdDashboard size={25} />
                  </NavLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
