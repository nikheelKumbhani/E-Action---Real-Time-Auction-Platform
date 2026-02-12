import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Caption, Container, CustomNavLink, Loader, PrimaryButton, Title } from "../../router";
import { commonClassNameOfInput } from "../../components/common/Design";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, RESET } from "../../redux/features/authSlice"; 

const initialState = {
  email: "",
  password: "",
};

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  // Password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  // Error state
  const [errors, setErrors] = useState({});

  // Get authentication state from Redux
  const { isLoading, isSuccess, user, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess && user) {
      navigate("/dashboard"); // Redirect after successful login
    }


    return () => {
      dispatch(RESET());
    };
  }, [dispatch, isSuccess, isError, message, user, navigate]);

  const validateForm = () => {
    let newErrors = {};

    // Email Validation (must be correct format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    // Password Validation (must be at least 8 characters)
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
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

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const userData = { email, password };
      dispatch(login(userData));
    }
  };

  return (
    <>
      {typeof window !== "undefined" && isLoading && <Loader />}
      <section className="login pt-16 relative">
        <div className="bg-green w-96 h-96 rounded-full opacity-20 blur-3xl absolute top-2/3"></div>
        <div className="bg-[#241C37] pt-8 h-[40vh] relative content">
          <Container>
            <div>
              <Title level={3} className="text-white">Log In</Title>
              <div className="flex items-center gap-3">
                <Title level={5} className="text-green font-normal text-xl">Home</Title>
                <Title level={5} className="text-white font-normal text-xl">/</Title>
                <Title level={5} className="text-white font-normal text-xl">Log In</Title>
              </div>
            </div>
          </Container>
        </div>

        <form onSubmit={handleLogin} className="bg-white shadow-s3 w-1/3 m-auto my-16 p-8 rounded-xl">
          <div className="text-center">
            <Title level={5}>New Member?</Title>
            <p className="mt-2 text-lg">
              Don't have an account? <CustomNavLink href="/register">Sign Up Here</CustomNavLink>
            </p>
          </div>

          {/* Email Field */}
          <div className="py-5 mt-8">
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

          <PrimaryButton className="w-full rounded-none my-5" type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "LOGIN"}
          </PrimaryButton>

          <div className="flex items-center gap-2 py-4">
            <input type="checkbox" />
            <Caption>I agree to the Terms & Policy</Caption>
          </div>
          
          <div className="text-center border py-4 rounded-lg mt-4">
            <Title>OR SIGN IN WITH</Title>
            <div className="flex items-center justify-center gap-5 mt-5">
              <button className="flex items-center gap-2 bg-red-500 text-white p-3 px-5 rounded-sm">
                <FaGoogle />
                <p className="text-sm">SIGN IN WITH GOOGLE</p>
              </button>
              <button className="flex items-center gap-2 bg-indigo-500 text-white p-3 px-5 rounded-sm">
                <FaFacebook />
                <p className="text-sm">SIGN IN WITH FACEBOOK</p>
              </button>
            </div>
          </div>
          
          <p className="text-center mt-5">
            By clicking the login button, you agree to Cobiro's 
            <span className="text-green underline"> Terms & Conditions </span> & 
            <span className="text-green underline"> Privacy Policy </span>.
          </p>
        </form>
      </section>
    </>
  );
};
