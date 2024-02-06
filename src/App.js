import React from "react";
import "primereact/resources/themes/saga-orange/theme.css";
import "./App.css";
import Navbar from "./components/header.js";
import MainPage from "./features/main-page.js";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./features/login-page.js";
import WrapperComponent from "./components/wrapper-component.js";

function App() {
  return (
    <div className="page-color min-h-screen md:px-28 ">
      <Navbar />
      <div className="py-12 w-full mx-auto lg:px-20 px-5">
        <WrapperComponent />
      </div>
    </div>
  );
}

export default App;
