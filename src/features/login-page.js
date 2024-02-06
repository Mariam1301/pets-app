import React from "react";
import LoginForm from "../components/loginForm.js";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full md:w-1/2 mx-auto bg-white rounded-md py-12 px-10 shadow-lg">
        <LoginForm />
        <div className="w-full flex items-center justify-center pt-8 text-blue-900 text-base">
          <Link to="/registration">შექმენი ანგარიში</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
