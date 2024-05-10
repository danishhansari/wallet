import RegisterForm from "../components/RegisterForm";
import Navbar from "../Navbar";
const AuthPage = () => {
  return (
    <>
      <div className="navAndPage">
        <Navbar />
        <div className="whFull flex justify-center mt-20 md:mt-28">
          <RegisterForm />
        </div>
      </div>
    </>
  );
};

export default AuthPage;
