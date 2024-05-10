import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "cookie-parser";

const PrivateRoute = ({ component }) => {
  const authToken = Cookie.get("authorization");
  const navigate = useNavigate();
  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }
  }, [authToken, navigate]);
  return { component };
};

export default PrivateRoute;
