import { Caption, PrimaryButton, Title } from "../../router";
import { commonClassNameOfInput } from "../../components/common/Design";
import { useState } from "react";
import { createCategory } from "@/app/redux/features/categorySlice";
import { useRedirectLoggedOutUser } from "@/app/hooks/userRedirectLoggedOutUser";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


export const CreateCategory = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [error, setError] = useState("")

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setError("");

      await dispatch(createCategory({ title })).unwrap();
      // await dispatch(); // get all categories

      navigate("/category");
    } catch (error) {
      setError("Failed to create category. Please try again");
    }

  };

  return (
    <>
      <section className="bg-white shadow-s1 p-8 rounded-xl">
        <Title level={5} className=" font-normal mb-5">
          Create Category
        </Title>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="w-full my-8">
            <Caption className="mb-2">Title *</Caption>
            <input value={title} onChange={handleInputChange} type="text" className={`${commonClassNameOfInput}`} placeholder="Title" required />
          </div>

          <PrimaryButton type="submit" className="rounded-none my-5">
            CREATE
          </PrimaryButton>
        </form>
      </section>
    </>
  );
};
