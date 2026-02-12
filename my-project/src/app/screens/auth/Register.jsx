import { useEffect, useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Caption, Container, CustomNavLink, Loader, PrimaryButton, Title } from "../../router";
import { commonClassNameOfInput } from "../../components/common/Design";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, RESET } from "../../redux/features/authSlice"; // ✅ Import RESET
import { toast } from "react-toastify";


const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, confirmPassword } = formData;

  // States for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Error state
  const [errors, setErrors] = useState({});

  // Get authentication state from Redux
  const { isLoading, isLoggedIn, isSuccess, user, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {

    // if (isSuccess && user) {
    //   navigate("/login"); // Redirect after successful registration
    // }

    if (isError) {
      toast.error(message || "Registration failed");
    }

    return () => {
      dispatch(RESET());
    };
  }, [isLoggedIn, isError, navigate]);

  const validateForm = () => {
    let newErrors = {};

    // Name Validation (no leading spaces, max 50 chars)
    if (!name.trim()) {
      newErrors.name = "Name cannot start with a space";
    } else if (name.length > 50) {
      newErrors.name = "Name cannot exceed 50 characters";
    }

    // Email Validation (must be correct format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    // Password Validation (must contain letters, numbers, and symbols)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      newErrors.password = "Password must have at least 8 characters, one letter, one number, and one symbol";
    }

    // Confirm Password Validation (must match password)
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing
    setErrors({ ...errors, [name]: "" });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Dispatch registration request to backend
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
      navigate("/login"); // Redirect after successful registration
    }
  };


  return (
    <>
    {typeof window !== "undefined" && isLoading && <Loader />}
      <section className="regsiter pt-16 relative">
        <div className="bg-green w-96 h-96 rounded-full opacity-20 blur-3xl absolute top-2/3"></div>
        <div className="bg-[#241C37] pt-8 h-[40vh] relative content">
          <Container>
            <div>
              <Title level={3} className="text-white">Sign Up</Title>
              <div className="flex items-center gap-3">
                <Title level={5} className="text-green font-normal text-xl">Home</Title>
                <Title level={5} className="text-white font-normal text-xl">/</Title>
                <Title level={5} className="text-white font-normal text-xl">Sign Up</Title>
              </div>
            </div>
          </Container>
        </div>

        <form onSubmit={handleRegister} className="bg-white shadow-s3 w-1/3 m-auto my-16 p-8 rounded-xl">
          <div className="text-center">
            <Title level={5}>Sign Up</Title>
            <p className="mt-2 text-lg">
              Do you already have an account? <CustomNavLink href="/login">Log In Here</CustomNavLink>
            </p>
          </div>

          {/* Name Field */}
          <div className="py-5">
            <Caption className="mb-2">Username *</Caption>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
              className={commonClassNameOfInput}
              placeholder="First Name"
              required
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div className="py-5">
            <Caption className="mb-2">Enter Your Email *</Caption>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              className={commonClassNameOfInput}
              placeholder="Enter Your Email"
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="py-5 relative">
            <Caption className="mb-2">Password *</Caption>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleInputChange}
              className={commonClassNameOfInput}
              placeholder="Enter Your Password"
              required
            />

            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Confirm Password Field */}
          <div className="py-5 relative">
            <Caption className="mb-2">Confirm Password *</Caption>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
              className={commonClassNameOfInput}
              placeholder="Confirm Password"
              required
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>

          <PrimaryButton className="w-full rounded-none my-5" type="submit" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "CREATE ACCOUNT"}
          </PrimaryButton>

          <div className="flex items-center gap-2 py-4">
            <input type="checkbox" />
            <Caption>I agree to the Terms & Policy</Caption>
          </div>
          <div className="text-center border py-4 rounded-lg mt-4">
            <Title>OR SIGNUP WITH</Title>
            <div className="flex items-center justify-center gap-5 mt-5">
              <button className="flex items-center gap-2 bg-red-500 text-white p-3 px-5 rounded-sm">
                <FaGoogle />
                <p className="text-sm">SIGNUP WHIT GOOGLE</p>
              </button>
              <button className="flex items-center gap-2 bg-indigo-500 text-white p-3 px-5 rounded-sm">
                <FaFacebook />
                <p className="text-sm">SIGNUP WHIT FACEBOOK</p>
              </button>
            </div>
          </div>
          <p className="text-center mt-5">
            By clicking the signup button, you create a Cobiro account, and you agree to Cobiros <span className="text-green underline">Terms & Conditions</span> &
            <span className="text-green underline"> Privacy Policy </span>.
          </p>
        </form>
      </section >
    </>
  );
};
