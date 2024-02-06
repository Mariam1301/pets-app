import React from "react";
import { Link } from "react-router-dom";
import RegistrationForm from "../components/registrationForm";

const RegistrationPage = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full md:w-1/2 mx-auto bg-white rounded-md py-12 px-10 shadow-lg">
        <RegistrationForm />
        <div className="w-full flex items-center justify-center pt-8  text-blue-900 text-base">
          <Link to="/login">გაიარე ავტორიზაცია</Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
