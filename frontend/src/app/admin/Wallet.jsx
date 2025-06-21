"use client"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIncome } from "@/app/redux/features/authSlice";
import { useRedirectLoggedOutUser } from "@/app/hooks/userRedirectLoggedOutUser";
import { useUserProfile } from "@/app/hooks/useUserProfile";
import WalletSection from "./WalletSection";

export const Wallet = () => {
  useRedirectLoggedOutUser("/login");
  const { income } = useSelector((state) => state.auth);
  const { role, name } = useUserProfile();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIncome());
  }, [dispatch]);

  return (
    <WalletSection 
      balance={income?.commissionBalance || 0}
      userName={name || "User"}
    />
  );
};
