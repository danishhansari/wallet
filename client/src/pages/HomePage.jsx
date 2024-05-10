import Navbar from "../components/Navbar";
const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="mt-8 max-w-[600px] mx-auto px-2">
        <div className="flex justify-between items-center">
          <h1 className="headingCursive text-left text-3xl md:text-4xl">
            Hello {"user full Name"}
          </h1>
          <p className="text-lg font-medium">"User Account Balance"</p>
        </div>
        <div className="w-full mt-4 md:max-h-[50vh] overflow-auto">
          <div className="flex mb-2 justify-between items-center">
            <p className="text-lg font-medium">User Name</p>
            <button className="btnPrimarySmall">Send</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
