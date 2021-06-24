import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import HouseContent from "../../components/HouseContent";
import Navbar from "../../components/Navbar";
import { houses } from "../../constants/houses";

const HouseDetail = () => {
  const { id } = useParams();

  const [house, setHouse] = useState({});
  // console.log(id);

  useEffect(() => {
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
      {/* <div>{house.name}</div> */}
      {/* <Navbar house={house} /> */}
      {house.id ? <HouseContent house={house} /> : <div>loading</div>}
    </>
  );
};

export default HouseDetail;
