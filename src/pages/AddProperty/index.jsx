import { useContext, useEffect } from "react";
// import { Redirect } from "react-router";
import AddPropertyContent from "../../components/AddPropertyContent";
import Navbar from "../../components/Navbar";
import { UserContext } from "../../contexts/UserContext";
import NotFound from "../NotFound";
import axios from "axios";

const AddProperty = () => {
  const { dispatch, state } = useContext(UserContext);
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

  if (state.user.listAs === "Owner") {
    return (
      <>
        <Navbar />
        <AddPropertyContent />
      </>
    );
  } else {
    // return <Redirect to="/" />;
    return <NotFound />;
  }
};

export default AddProperty;
