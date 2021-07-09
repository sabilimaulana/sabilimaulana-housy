import { useEffect, useContext } from "react";
import HistoryContent from "../../components/HistoryContent";
import Navbar from "../../components/Navbar";
import { UserContext } from "../../contexts/UserContext";
import NotFound from "../NotFound";
import axios from "axios";
const History = () => {
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const getUser = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
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
      }
    };

    getUser();
  }, [dispatch]);

  if (state.isLogin) {
    // console.log(state);
    return (
      <>
        <Navbar />
        <HistoryContent />
      </>
    );
  } else {
    return <NotFound></NotFound>;
  }
};

export default History;
