import Select from "react-select";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "./Loader";
import { getAllCategories } from "@/app/redux/features/categorySlice";

export const CategoryDropDown = (props) => {
  const dispatch = useDispatch();
  const { categorys, isLoading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  

  const allCategory = categorys?.map((category) => {
    return {
      label: category?.title,
      value: category?._id,
    };
  });

  

  const handlechange = selectedOption => {
    props.onChange(selectedOption)
    };
  return (
    <>
      {isLoading ? <Loader />  : <Select id="category" onChange={handlechange} options={allCategory} value={props.value} />}
    </>
  );
};
