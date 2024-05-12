import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";

const TransferPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const authorization = Cookies.get("authorization");

  const redirectUser = () => {
    setTimeout(() => {
        navigate("/")
    }, 2000)
  };
  const handleTransfer = () => {
    axios
      .post(
        `${import.meta.env.VITE_SERVER}/api/v1/account/transfer`,
        {
          to: id,
          amount: money,
        },
        {
          headers: {
            Authorization: `Bearer ${authorization}`,
          },
        }
      )
      .then(({ data }) => {
        console.log(data);
        toast.success("Transaction complete");
        redirectUser();
      })
      .catch((err) => {
        console.log(err);
        return toast.error(err.message);
      });
  };

  const [money, setMoney] = useState(0);
  return (
    <>
      <Toaster />
      <div className="w-full flex md:h-screen md:items-center justify-center flex-col">
        <div className=" text-md md:text-lg p-2 rounded-sm border mx-2 mt-[20vh] md:mt-0 max-w-[400px] w-full">
          <p className="text-3xl md:text-4xl text-center font-cursive">
            Transfer Money
          </p>
          <div className="w-full flex items-center flex-col">
            <input
              type="text"
              className="my-3  focus:outline-none focus:border-2 w-1/2 mx-auto rounded-sm border py-1 text-center font-medium"
              value={money}
              onChange={(e) => setMoney(e.target.value)}
              placeholder="min. 1$"
            />
            <button className="btnPrimary" onClick={handleTransfer}>
              Send Money ${money}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransferPage;
