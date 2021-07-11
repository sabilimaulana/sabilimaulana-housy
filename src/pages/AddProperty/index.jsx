import { useContext, useEffect, useState } from "react";
// import { Redirect } from "react-router";
import AddPropertyContent from "../../components/AddPropertyContent";
import Navbar from "../../components/Navbar";
import { UserContext } from "../../contexts/UserContext";
import Loading from "../../components/Loading";
import { Redirect } from "react-router";
import { API, setAuthToken } from "../../service/api";

const AddProperty = () => {
  const { dispatch, state } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = sessionStorage.getItem("token");
        setAuthToken(token);
        if (token) {
          const user = await API.get("/user/profile");
          dispatch({
            type: "LOGIN",
            payload: {
              user: user.data.data,
            },
          });
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.response);
      }
    };

    getUser();
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }
  if (state.user.listAs === "Owner") {
    return (
      <>
        <Navbar />
        <AddPropertyContent />
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default AddProperty;
