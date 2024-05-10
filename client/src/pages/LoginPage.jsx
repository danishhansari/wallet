import Navbar from "../Navbar";
import Input from "../components/Input";
const LoginPage = () => {
  return (
    <>
      <div className="navAndPage">
        <Navbar type="login" />
        <div className="whFull flex justify-center mt-20 md:mt-28">
          <div className="max-w-[800] mx-auto p-4 columnFlex">
            <h2 className="headingCursive">Log in</h2>

            <h1 className="text-3xl md:text-5xl font-semibold md:font-medium text-center w-full md:w-2/3">
              Cashless transaction is the new trend
            </h1>

            <form className="mt-12 md:mt-16 w-full" id="registerForm">
              <div className="columnFlex">
                <Input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  defaultValue={""}
                  onchange={""}
                />
                <Input
                  type="password"
                  name="password"
                  className="mt-4"
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

export default LoginPage;
