import { useContext, useState, useEffect } from "react";
import { Redirect, useParams } from "react-router";
import HouseContent from "../../components/HouseContent";
import Navbar from "../../components/Navbar";
import { UserContext } from "../../contexts/UserContext";
import Loading from "../../components/Loading";
import { API, setAuthToken } from "../../service/api";

const HouseDetail = () => {
  const { id } = useParams();
  const { dispatch } = useContext(UserContext);

  const [house, setHouse] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (token) {
          setAuthToken(token);
          const user = await API.get("/user/profile");
          dispatch({
            type: "LOGIN",
            payload: {
              user: user.data.data,
            },
          });
        }
      } catch (error) {
        console.log(error.response);
      }
    };

    const getHouse = async (id) => {
      try {
        const result = await API.get(`/property/${id}`);
        setHouse(result.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.response);
      }
    };

    getUser();
    getHouse(id);
  }, [id, dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (house.id) {
    return (
      <>
        <Navbar searchbar={false} />
        <HouseContent house={house} />
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default HouseDetail;
