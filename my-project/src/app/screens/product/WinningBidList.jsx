import React from "react";
import { Title } from "../../router";
import { useEffect } from "react";
import { useRedirectLoggedOutUser } from "@/app/hooks/userRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { getAllWonedProductsOfUser } from "@/app/redux/features/productSlice";
import { Table } from "@/app/components/Table";

export const WinningBidList = () => {
  useRedirectLoggedOutUser("/login")
  const dispatch = useDispatch();
  const { wonedproduct } = useSelector((state) => state.product)

  useEffect(() => {
    dispatch(getAllWonedProductsOfUser())
  }, [dispatch]);

  console.log(wonedproduct); // Fixed: changed wonedproducts to wonedproduct

  return (
    <>
      <section className="shadow-s1 p-8 rounded-lg">
        <div className="flex justify-between">
          <Title level={5} className=" font-normal">
            Winning Product Lists
          </Title>
        </div>
        <br />
        {wonedproduct && (wonedproduct.length > 0) ? (
          <Table products={wonedproduct} isWon={true} />
        ) : (
          <div className="text-center py-5">
            <p className="text-gray-500">No products found. Start by creating a new product!</p>
          </div>
        )}
      </section>
    </>
  );
}