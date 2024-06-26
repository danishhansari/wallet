import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import EditProfilePage from "./pages/EditProfilePage";
import TransferPage from "./pages/TransferPage";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Router>
        <Toaster limit={1} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/transfer/:id" element={<TransferPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
