import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const HomePage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [user, setUser] = useState([]);
  const [balance, setBalance] = useState("");

  const authorization = Cookies.get("authorization");

  useEffect(() => {
    if (!authorization) {
      return navigate("/login");
    }
    fetchUser();
    fetchUserBalance(authorization);
    // currentUser(authorization);
  }, [query]);

  const fetchUserBalance = (authorization) => {
    console.log(authorization);
    axios
      .post(`${import.meta.env.VITE_SERVER}/api/v1/account/balance`, null, {
        headers: {
          Authorization: `Bearer ${authorization}`,
        },
      })
      .then(({ data }) => {
        console.log(data.userDetails);
        setBalance(data.userDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUser = () => {
    axios
      .post(`${import.meta.env.VITE_SERVER}/api/v1/user`, {
        query: query,
      })
      .then(({ data }) => {
        setUser(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const currentUser = (authorization) => {
    axios
      .post(`${import.meta.env.VITE_SERVER}/api/v1/user/current-user`, null, {
        headers: {
          Authorization: `Bearer ${authorization}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="mt-8 max-w-[600px] mx-auto px-2">
        <div className="flex justify-between items-center">
          <h1 className="headingCursive text-left text-3xl md:text-4xl">
            Hello {"user full Name"}
          </h1>
          <p className="text-lg md:text-xl font-semibold">${balance.balance}</p>
        </div>
        <input
          type="text"
          className="w-full py-2 pl-3 rounded-md focus:outline-none border mt-8"
          placeholder="Search Friend"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="w-full mt-4 md:max-h-[50vh] overflow-auto">
          {user &&
            user.map((item) => {
              return (
                <div
                  key={item._id}
                  className="flex mb-2 justify-between items-center"
                >
                  <p className="text-lg font-medium capitalize tracking-wide">
                    {item.username}
                  </p>
                  <button className="btnPrimarySmall">Send</button>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default HomePage;
