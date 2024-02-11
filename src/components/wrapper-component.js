import { Route, Routes } from "react-router";
import { AuthContext } from "../context/auth-context";
import LoginPage from "../features/login-page";
import MainPage from "../features/main-page";
import AddPetPage from "../features/add-pet";
import RegistrationPage from "../features/registration-page";

const WrapperComponent = () => {
  return (
    <Routes>
      <Route path="/about" element={<MainPage />} />
      <Route path="/addPet" element={<AddPetPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
};

export default WrapperComponent;
