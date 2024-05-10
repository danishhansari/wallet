import Navbar from "../components/Navbar";
import Input from "../components/Input";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  const signupSchema = z.object({
    firstName: z.string().min(3).max(15).trim(),
    lastName: z.string().min(3).max(15).optional(),
    username: z.string().min(3).max(15).trim(),
    password: z.string().min(6).max(18).trim(),
  });

  const handleSignup = (e) => {
    e.preventDefault();
    const form = new FormData(signupForm);
    const formData = Object.fromEntries(form.entries());
    console.log(formData);
    try {
      signupSchema.parse(formData);
      let loading = toast.loading("Login....");
      axios
        .post(`${import.meta.env.VITE_SERVER}/api/v1/user/signup`, formData)
        .then(({ data }) => {
          console.log(data);
          toast.success("Register successfully");
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
        <Navbar type="signup" />
        <div className="whFull flex justify-center mt-16 md:mt-20">
          <div className="max-w-[800] mx-auto p-2 columnFlex">
            <h2 className="headingCursive">Sign UP</h2>

            <h1 className="text-3xl md:text-5xl font-semibold md:font-medium text-center w-full md:w-2/3">
              The next big thing in digital money transfer
            </h1>

            <form className="mt-8 md:mt-16 w-full" id="signupForm">
              <div className="columnFlex gap-y-2">
                <Input
                  type="text"
                  name="firstName"
                  placeholder="Enter your FirstName"
                />
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Enter your Lastname (optional)"
                />
                <Input
                  type="text"
                  name="username"
                  placeholder="Enter your Username"
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                />

                <button
                  className="formBtn"
                  type="submit"
                  onClick={handleSignup}
                >
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

export default SignupPage;
