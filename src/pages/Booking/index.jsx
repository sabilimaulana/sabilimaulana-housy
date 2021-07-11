import { useEffect, useContext, useState } from "react";

import BookingContent from "../../components/BookingContent";
import Navbar from "../../components/Navbar";
import { UserContext } from "../../contexts/UserContext";
import Loading from "../../components/Loading";
import { Redirect } from "react-router";
import { API, setAuthToken } from "../../service/api";

const Booking = () => {
  const { state, dispatch } = useContext(UserContext);

  const [order, setOrder] = useState([]);
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

    const getOrder = async () => {
      try {
        const result = await API.get("/transactions/order");
        setOrder(result.data.data.reverse());
      } catch (error) {
        console.log(error.response);
      }
    };

    getUser();
    getOrder();
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }
  if (state.isLogin) {
    return (
      <>
        <Navbar />
        <BookingContent order={order} />
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Booking;
