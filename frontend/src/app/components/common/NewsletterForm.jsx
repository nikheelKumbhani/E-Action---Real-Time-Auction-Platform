import { useState } from "react";
import { Link } from "react-router-dom";
import { PrimaryButton } from "./Design";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSuccess(true);
      setEmail("");
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex items-center justify-between mt-5">
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email" 
          className="w-full h-full p-3.5 py-[15px] text-sm border-none outline-none rounded-l-md" 
          disabled={isSubmitting || isSuccess}
          required
        />
        <PrimaryButton 
          type="submit"
          className="rounded-none py-3.5 px-8 text-sm hover:bg-indigo-800 rounded-r-md"
          disabled={isSubmitting || isSuccess}
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </PrimaryButton>
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      {isSuccess && <p className="text-green-400 text-sm">Thank you for subscribing!</p>}
      <p className="text-gray-300 text-sm mt-3">
        By subscribing, you agree to our{" "}
        <Link to="/privacy" className="underline hover:text-[#00bcd4]">
          Privacy Policy
        </Link>
      </p>
    </form>
  );
}
