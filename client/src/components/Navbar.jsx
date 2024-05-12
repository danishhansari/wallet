import { Link } from "react-router-dom";

const Navbar = ({ route, text }) => {
  return (
    <nav className="m-2 p-2 flex justify-between items-center border border-[#eaeaea] rounded-full">
      <Link to="/" className="ml-2 md:ml-4">
        <h1 className="headingCursive">Wallet</h1>
      </Link>
      <div className="cta flex items-center gap-4">
        <Link to={route}>
          <button className="btnSecondary capitalize">{text}</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
