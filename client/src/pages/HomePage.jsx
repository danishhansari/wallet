import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const HomePage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [user, setUser] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [balance, setBalance] = useState("");
  const authorization = Cookies.get("authorization");

  useEffect(() => {
    if (!authorization) {
      return navigate("/login");
    }
    fetchUser();
    fetchUserBalance(authorization);
    fetchCurrentUser(authorization);
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchCurrentUser = (authorization) => {
    axios
      .post(`${import.meta.env.VITE_SERVER}/api/v1/user/current-user`, null, {
        headers: {
          Authorization: `Bearer ${authorization}`,
        },
      })
      .then(({ data }) => {
        setCurrentUser(data[0]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <Navbar text={"Edit Profile"} route={"/edit-profile"} />
      <div className="mt-8 max-w-[600px] mx-auto px-2">
        <div className="flex justify-between items-center">
          <h1 className="headingCursive text-left text-3xl md:text-4xl">
            Hello {currentUser.name}
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
                  <button
                    className="btnPrimarySmall"
                    onClick={() => navigate(`/transfer/${item._id}`)}
                  >
                    Send
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default HomePage;
