import Navbar from "../components/Navbar";
import Input from "../components/Input";
import { z } from "zod";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const loginSchema = z.object({
    username: z.string().min(3).max(15).trim(),
    password: z.string().min(6).max(18).trim(),
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(loginForm);
    const formData = Object.fromEntries(form.entries());
    console.log(formData);
    try {
      loginSchema.parse(formData);
      let loading = toast.loading("Login....");
      axios
        .post(`${import.meta.env.VITE_SERVER}/api/v1/user/signin`, formData)
        .then(({ data }) => {
          console.log(data);
          const expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + 90);
          Cookies.set("authorization", data.authToken, { expires: expiryDate });
          toast.success("Logged in successfully");
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        })
        .finally(() => {
          toast.dismiss(loading);
        });
    } catch (error) {
      error.errors.forEach((err) => {
        return toast.error(err.message.replace("String", err.path[0]));
      });
    }
  };

  return (
    <>
      <Toaster />
      <div className="navAndPage">
        <Navbar text={"Signup"} route={"/signup"} />
        <div className="whFull flex justify-center mt-16 md:mt-24">
          <div className="max-w-[800] mx-auto p-2 columnFlex">
            <h2 className="headingCursive">Log in</h2>

            <h1 className="text-3xl md:text-5xl font-semibold md:font-medium text-center w-full md:w-2/3">
              Cashless transaction is the new trend
            </h1>

            <form className="mt-12 md:mt-16 w-full" id="loginForm">
              <div className="columnFlex gap-y-2">
                <Input
                  type="text"
                  name="username"
                  placeholder="Username"
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                />

                <button className="formBtn" type="submit" onClick={handleLogin}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
