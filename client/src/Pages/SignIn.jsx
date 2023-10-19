import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handelChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setIsError(data.message);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      setIsError(null);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      setIsError(error.message);
    }
  };
  console.log(formData);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handelSubmit} className="flex flex-col gap-4 mx-6">
        <input
          type="email"
          placeholder="example@kuch.com"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handelChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handelChange}
        />
        <button
          disabled={isLoading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80"
        >
          {isLoading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-1 mt-5 ml-6">
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">sign Up</span>
        </Link>
      </div>
      {isError && <p className="text-red-500 mt-5 ml-6">{isError}</p>}
    </div>
  );
};

export default SignIn;
