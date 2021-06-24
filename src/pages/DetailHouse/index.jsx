import { useContext, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import HouseContent from "../../components/HouseContent";
import Navbar from "../../components/Navbar";
import { houses } from "../../constants/houses";
import { UserContext } from "../../Contexts/UserContext";

const HouseDetail = () => {
  const { id } = useParams();
  const { dispatch } = useContext(UserContext);

  const [house, setHouse] = useState({});
  // console.log(id);

  useEffect(() => {
    const userSession = JSON.parse(sessionStorage.getItem("user"));

    if (userSession) {
      dispatch({
        type: "LOGIN",
        payload: {
          user: userSession,
        },
      });
    } else {
      dispatch({
        type: "LOGOUT",
      });
    }

    const res = houses.filter((house, index) => {
      if (house.id == id) {
        return house;
      }
    })[0];

    setHouse(res);
  }, [id]);

  return (
    <>
      <Navbar searchbar={false} />

      {house.id ? <HouseContent house={house} /> : <div>loading</div>}
    </>
  );
};

export default HouseDetail;
