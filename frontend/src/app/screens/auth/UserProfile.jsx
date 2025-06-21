import React from "react";
import { useEffect } from "react"; 
import { Caption, Title } from "../../router";
import { commonClassNameOfInput, PrimaryButton } from "../../components/common/Design";
import { useDispatch, useSelector } from "react-redux";
import { getuserProfile } from "@/app/redux/features/authSlice";
import {useRedirectLoggedOutUser} from "../../hooks/userRedirectLoggedOutUser"

export const UserProfile = () => {
  useRedirectLoggedOutUser("/login");

const { user } = useSelector((state) => state.auth);
const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(getuserProfile());
  },[dispatch]);

// console.log("=============================");
// console.log(user);
// console.log("=============================");


  return (
    <>
      <section className="shadow-s1 p-8 rounded-lg">
        <div className="profile flex items-center gap-8">
          <img src={user?.photo} alt="" className="w-24 h-24 rounded-full object-cover" />
          <div>
            <Title level={5} className="capitalize">
              {user?.name}
            </Title>
            <Caption>{user?.email}</Caption>
          </div>
        </div>
        <form>
          <div className="flex items-center gap-5 mt-10">
            <div className="w-full">
              <Caption className="mb-2">Full Name </Caption>
              <input type="search" className={`capitalize ${commonClassNameOfInput}`} placeholder={user?.name} readOnly />
            </div>
          </div>
          <div className="flex items-center gap-5 mt-10">
            <div className="w-1/2">
              <Caption className="mb-2">Contact Number</Caption>
              <input type="search" className={commonClassNameOfInput} placeholder="Contact Number" />
            </div>
            <div className="w-1/2">
              <Caption className="mb-2">Email</Caption>
              <input type="search" className={commonClassNameOfInput} placeholder={user?.email} disabled />
            </div>
          </div>
          <div className="my-8">
            <Caption className="mb-2">Role</Caption>
            <input type="search" className={commonClassNameOfInput} placeholder={user?.role} required />
          </div>
          <div className="my-8">
            <Caption className="mb-2">Profile Picture</Caption>
            <input type="search" className={commonClassNameOfInput} placeholder="Working" required />
          </div>
          <PrimaryButton>Update Profile</PrimaryButton>
        </form>
      </section>
    </>
  );
};
