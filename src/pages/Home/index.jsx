import { useContext, useEffect, useState } from "react";
import Content from "../../components/Content";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { houses } from "../../constants/houses";
import { UserContext } from "../../Contexts/UserContext";

function Home() {
  const [searchText, setSearchText] = useState("");
  const [duration, setDuration] = useState("Year");
  const [bedroom, setBedroom] = useState("2");
  const [bathroom, setBathroom] = useState("1");
  const [amenities, setAmenities] = useState([
    {
      title: "Furnished",
      value: false,
    },
    {
      title: "Pet Allowed",
      value: false,
    },
    {
      title: "Shared Accomodation",
      value: false,
    },
  ]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchInput = (houses) => {
    const res = houses.filter((house) => {
      return house.address.toLowerCase().includes(searchText.toLowerCase());
    });

    return res;
  };
  const handleDuration = (e) => {
    setDuration(e.target.value);
  };

  const handleAmenities = (e) => {
    const newAmenities = [...amenities];

    newAmenities.forEach((amenity) => {
      if (amenity.title === e.target.value) {
        amenity.value = !amenity.value;
      }
    });

    setAmenities(newAmenities);
  };

  const handleBedroom = (e) => {
    setBedroom(e.target.value);
  };

  const handleBathroom = (e) => {
    setBathroom(e.target.value);
  };

  const filterHouse = (houses) => {
    const filteredHouseBasedOnSearchInput = handleSearchInput(houses);
    const filteredHouseBasedOnAmenities = filterHouseBasedOnAmenities(
      filteredHouseBasedOnSearchInput
    );
    const filteredHouseBasedOnSpec = filterHouseBasedOnSpec(
      filteredHouseBasedOnAmenities
    );
    return filteredHouseBasedOnSpec;
  };

  const filterHouseBasedOnAmenities = (houses) => {
    const res = houses.filter((house) => {
      if (!amenities[0].value && !amenities[1].value && !amenities[2].value) {
        return houses;
      }

      const filteredAmenities = house.amenities.filter((amenity, index) => {
        return (
          amenity.title === amenities[index].title &&
          amenity.value === amenities[index].value
        );
      });
      return filteredAmenities.length === 3;
    });

    return res;
  };

  const filterHouseBasedOnSpec = (houses) => {
    return houses.filter((house) => {
      return (
        house.spec.bedroom === parseInt(bedroom) &&
        house.spec.bathroom === parseInt(bathroom)
      );
    });
  };

  const { dispatch } = useContext(UserContext);

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
  }, [dispatch]);

  // console.log(filterHouseBasedOnSpec(houses));

  return (
    <div className="Home">
      <Navbar
        handleSearch={handleSearch}
        searchText={searchText}
        searchbar={true}
      />
      <div style={{ display: "flex", width: "100%" }}>
        <Sidebar
          handleAmenities={handleAmenities}
          amenities={amenities}
          handleDuration={handleDuration}
          duration={duration}
          handleBathroom={handleBathroom}
          bathroom={bathroom}
          handleBedroom={handleBedroom}
          bedroom={bedroom}
        />
        <Content houses={filterHouse(houses)} housesDuration={duration} />
      </div>
    </div>
  );
}

export default Home;
