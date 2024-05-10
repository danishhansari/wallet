import Navbar from "../components/Navbar";
const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="mt-8 max-w-[900px] mx-auto px-2">
        <h1 className="headingCursive text-left text-3xl md:text-4xl">
          Hello {"user full Name"}
        </h1>
        <div className="w-full md:w-2/3 mt-4">
          <div className="flex justify-between">
            <p className="text-lg font-medium">User Name</p>
            <button className="btnPrimarySmall">Send</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
