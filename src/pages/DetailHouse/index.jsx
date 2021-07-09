import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import HouseContent from "../../components/HouseContent";
import Navbar from "../../components/Navbar";
import { UserContext } from "../../contexts/UserContext";
import Loading from "../../components/Loading";

const HouseDetail = () => {
  const { id } = useParams();
  const { dispatch } = useContext(UserContext);

  const [house, setHouse] = useState({});
  // console.log(id);

  // useEffect(() => {
  //   const userSession = JSON.parse(sessionStorage.getItem("user"));

  //   if (userSession) {
  //     dispatch({
  //       type: "LOGIN",
  //       payload: {
  //         user: userSession,
  //       },
  //     });
  //   } else {
  //     dispatch({
  //       type: "LOGOUT",
  //     });
  //   }

  //   const res = houses.filter((house) => {
  //     return house.id === parseInt(id);
  //   })[0];

  //   setHouse(res);
  // }, [id, dispatch]);

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

    const getHouse = async (id) => {
      try {
        const result = await axios.get(
          `http://localhost:8080/api/v1/property/${id}`
        );
        setHouse(result.data.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    getUser();
    getHouse(id);
    // const res = dummyHouse.filter((house) => {
    //   return house.id === parseInt(id);
    // })[0];
    // setHouse(res);
  }, [id, dispatch]);
  if (house.id) {
    return (
      <>
        <Navbar searchbar={false} />
        <HouseContent house={house} />
      </>
    );
  } else {
    return <Loading />;
  }
};

export default HouseDetail;
