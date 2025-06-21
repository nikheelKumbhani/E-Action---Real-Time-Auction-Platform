import { PrimaryButton } from "../../router";
import { Caption, commonClassNameOfInput, Title } from "../../components/common/Design";
import { useState, useEffect } from "react";
import { updateCategory, getAllCategories } from "@/app/redux/features/categorySlice";
import { useRedirectLoggedOutUser } from "@/app/hooks/userRedirectLoggedOutUser";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";  // ✅ Fix import
import { toast } from "react-toastify";

export const UpdateCategory = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { isSuccess, categorys } = useSelector((state) => state.category); // ✅ Select category state
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title: title,
    };
    
    await dispatch(updateCategory({ formData, id  })); // ✅ Fix: Send id separately
    await dispatch(getAllCategories()); // ✅ Refresh category list

    
    if (isSuccess) {

      navigate("/category");
    }
  };




  return (
    <>
      <section className="bg-white shadow-s1 p-8 rounded-xl">
        <Title level={5} className="font-normal mb-5">Update Category</Title>

        <form onSubmit={handleSubmit}>
          <div className="w-full my-8">
            <Caption className="mb-2">Title *</Caption>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              className={`${commonClassNameOfInput}`}
            />
          </div>

          <PrimaryButton type="submit" className="rounded-none my-5">
            Update
          </PrimaryButton>
        </form>
      </section>
    </>
  );
};
