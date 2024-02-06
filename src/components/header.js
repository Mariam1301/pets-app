import FeatherIcon from "feather-icons-react";
import { Sidebar } from "primereact/sidebar";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

const Navbar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const { userToken } = useContext(AuthContext);

  function navigationItems() {
    return (
      <>
        <li>
          <Link
            onClick={() => setIsSidebarVisible(false)}
            className="text-blue-950"
            to="/about"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            onClick={() => setIsSidebarVisible(false)}
            className="text-blue-950"
            to="/services"
          >
            Services
          </Link>
        </li>
        <li>
          <Link
            onClick={() => setIsSidebarVisible(false)}
            className="text-blue-950"
            to="/contact"
          >
            Contact
          </Link>
        </li>
        <li>
          {userToken ? (
            <Link
              onClick={() => setIsSidebarVisible(false)}
              className="px-6 py-2 primary-color rounded-md hover:opacity-50 text-blue-950"
              to="/"
            >
              Add Pet
            </Link>
          ) : (
            <Link
              onClick={() => setIsSidebarVisible(false)}
              className="px-6 py-2 primary-color rounded-md hover:opacity-50 text-blue-950"
              to="/login"
            >
              Login
            </Link>
          )}
        </li>
      </>
    );
  }

  return (
    <>
      <nav className="h-20 md:flex items-center justify-center hidden">
        <div className="flex  items-center justify-between text-l  w-full mx-auto px-20">
          <p to="/" className="text-2xl ">
            Logo
          </p>
          <ul className="flex items-center gap-5 justify-between">
            {navigationItems()}
          </ul>
        </div>
      </nav>
      <div className="h-20 p-5 md:hidden flex justify-between">
        <button onClick={() => setIsSidebarVisible(true)}>
          <FeatherIcon icon="menu" size={24} />
        </button>
        <p to="/" className="text-2xl ">
          Logo
        </p>
      </div>
      <Sidebar
        visible={isSidebarVisible}
        onHide={() => setIsSidebarVisible(false)}
      >
        <div className=" w-full min-h-20 pb-5">
          <ul className="flex flex-col justify-center items-center gap-4">
            {navigationItems()}
          </ul>
        </div>
      </Sidebar>
    </>
  );
};

export default Navbar;
