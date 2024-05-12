import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import Input from "../components/Input";

const EditProfilePage = () => {
  const handleEditProfile = () => {};

  return (
    <>
      <Navbar route="/" text="Home" />
      <Toaster />
      <div className="whFull flex justify-center mt-16 md:mt-20 max-w-[800px] mx-auto">
        <div className="w-full mx-auto p-2 columnFlex">
          <h2 className="headingCursive">Edit Profile</h2>

          <form className="mt-4 md:mt-8 w-full" id="editProfileForm">
            <div className="columnFlex gap-y-2">
              <Input type="text" name="name" placeholder="Name" />
              <Input type="text" name="username" placeholder="Username" />
              <Input type="password" name="password" placeholder="Password" />

              <button
                className="formBtn"
                type="submit"
                onClick={handleEditProfile}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfilePage;
