import { CategorySection, Hero, Process, Trust, WhyChooseUs } from "../../router";
import { ProductList } from "../../components/hero/ProductList.jsx";
import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  getAllProducts } from "@/app/redux/features/productSlice";


export const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product)

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch]);

  return (
    <>
      <Hero />
      <CategorySection />
      <WhyChooseUs />
      <Process />
      {/* <Trust /> */}

    </>
  );
};