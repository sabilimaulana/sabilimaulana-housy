import { useEffect, useContext, useState } from "react";
import HistoryContent from "../../components/HistoryContent";
import Navbar from "../../components/Navbar";
import { UserContext } from "../../contexts/UserContext";
import Loading from "../../components/Loading";
import { Redirect } from "react-router";
import { API, setAuthToken } from "../../service/api";
const History = () => {
  const { state, dispatch } = useContext(UserContext);
  const [histories, setHistories] = useState([]);

  const [loading, setLoading] = useState(true);

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

    const getHistories = async () => {
      try {
        const result = await API.get("/transactions/history");

        setHistories(result.data.data.reverse());
      } catch (error) {
        console.log(error.data);
      }
    };

    getUser();
    getHistories();
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (state.isLogin) {
    return (
      <>
        <Navbar />
        <HistoryContent histories={histories} />
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default History;
