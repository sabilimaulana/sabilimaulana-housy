import { useContext, useEffect } from "react";
import Navbar from "../../components/Navbar";
import ProfileContent from "../../components/ProfileContent";
import { UserContext } from "../../contexts/UserContext";
import NotFound from "../../pages/NotFound";
import axios from "axios";

const Profile = () => {
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const getUser = async () => {
      const token = sessionStorage.getItem("token");

      const user = await axios.get(
        "http://localhost:8080/api/v1/user/profile",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch({
        type: "LOGIN",
        payload: {
          user: user.data.data,
        },
      });
    };

    getUser();
  }, [dispatch]);

  if (state.isLogin) {
    return (
      <>
        <Navbar />
        <ProfileContent state={state} />
      </>
    );
  } else {
    return <NotFound></NotFound>;
  }
};

export default Profile;
