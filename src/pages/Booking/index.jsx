import { useEffect, useContext, useState } from "react";
import axios from "axios";

import BookingContent from "../../components/BookingContent";
import Navbar from "../../components/Navbar";
import { UserContext } from "../../contexts/UserContext";
import NotFound from "../NotFound";

const Booking = () => {
  const { state, dispatch } = useContext(UserContext);

  const [order, setOrder] = useState([]);

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

    const getOrder = async (token) => {
      try {
        const token = sessionStorage.getItem("token");

        const result = await axios.get(
          "http://localhost:8080/api/v1/transactions/order",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrder(result.data.data);
        console.log(result.data.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    getUser();
    getOrder();
  }, [dispatch]);

  if (state.isLogin) {
    return (
      <>
        <Navbar />
        <BookingContent order={order} />
      </>
    );
  } else {
    return <NotFound></NotFound>;
  }
};

export default Booking;
