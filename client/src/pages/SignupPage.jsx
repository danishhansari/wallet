import Navbar from "../Navbar";
import Input from "../components/Input";
const SignupPage = () => {
  return (
    <>
      <div className="navAndPage">
        <Navbar type="signup" />
        <div className="whFull flex justify-center mt-20 md:mt-28">
          <div className="max-w-[800] mx-auto p-2 columnFlex">
            <h2 className="headingCursive">Sign UP</h2>

            <h1 className="text-3xl md:text-5xl font-semibold md:font-medium text-center w-full md:w-2/3">
              The next big thing in digital money transfer
            </h1>

            <form className="mt-12 md:mt-16 w-full" id="registerForm">
              <div className="columnFlex gap-y-2">
                <Input
                  type="text"
                  name="firstName"
                  placeholder="Enter your FirstName"
                  defaultValue={""}
                  onchange={""}
                />
                <Input
                  type="text"
                  name="username"
                  placeholder="Enter your Lastname (optional)"
                  defaultValue={""}
                  onchange={""}
                />
                <Input
                  type="text"
                  name="username"
                  placeholder="Enter your Username"
                  defaultValue={""}
                  onchange={""}
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  defaultValue={""}
                  onchange={""}
                />

                <button
                  className="formBtn"
                  disabled={""}
                  type="submit"
                  onClick={""}
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
