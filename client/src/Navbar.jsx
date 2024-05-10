import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className=" p-2 md:p-4 flex justify-between items-center border border-[#eaeaea] rounded-full">
      <Link to="/" className="ml-2 md:ml-4">
        <h1 className="headingCursive">Wallet</h1>
      </Link>
      <div className="cta flex items-center gap-4">
        <Link to="/register">
          <button className="btnSecondary">Signup</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
