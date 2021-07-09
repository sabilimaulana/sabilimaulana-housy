import { useContext, useEffect, useState } from "react";
import Content from "../../components/Content";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { UserContext } from "../../contexts/UserContext";
import { FilterContext } from "../../contexts/FilterContext";
import { convertToAngka } from "../../utils/moneyConvert.js";
import OwnerContent from "../../components/OwnerContent";
import axios from "axios";
import Loading from "../../components/Loading";

function Home() {
  const { state, dispatch } = useContext(UserContext);
  const { filterState } = useContext(FilterContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [houses, setHouses] = useState([]);

  const {
    duration,
    bedroom,
    bathroom,
    furnished,
    petAllowed,
    sharedAccomodation,
    budget,
  } = filterState.filter;

  const { search, isSearch, isFilter } = filterState;

  const filterHouseBasedOnAmenities = (houses) => {
    const res = houses.filter((house) => {
      if (!furnished && !petAllowed && !sharedAccomodation) {
        return houses;
      }
      // console.log(
      //   furnished,
      //   house.furnished,
      //   petAllowed,
      //   house.petAllowed,
      //   sharedAccomodation,
      //   house.sharedAccomodation
      // );
      return (
        furnished.toString() === house.furnished &&
        petAllowed.toString() === house.petAllowed &&
        sharedAccomodation.toString() === house.sharedAccomodation
      );
    });

    return res;
  };

  const filterHouseBasedOnSpec = (houses) => {
    return houses.filter((house) => {
      if (!bedroom && !bathroom) {
        return true;
      }

      // console.log(bedroom, bathroom);
      if (bedroom === "5+" && bathroom === "5+") {
        return (
          +house.bedroom >= parseInt(bedroom) &&
          +house.bathroom >= parseInt(bathroom)
        );
      } else if (bedroom === "5+" && bathroom !== "5+") {
        // console.log("lala");
        if (bathroom === "") {
          return +house.bedroom >= parseInt(bedroom);
        }
        return (
          +house.bedroom >= parseInt(bedroom) &&
          +house.bathroom === parseInt(bathroom)
        );
      } else if (bedroom !== "5+" && bathroom === "5+") {
        if (bedroom === "") {
          return +house.bathroom >= parseInt(bathroom);
        }
        return (
          +house.bedroom === parseInt(bedroom) &&
          +house.bathroom >= parseInt(bathroom)
        );
      }

      if (
        +house.bedroom === parseInt(bedroom) &&
        +house.bathroom === parseInt(bathroom)
      ) {
        return true;
      }
      return (
        (+house.bedroom === parseInt(bedroom) && !bathroom) ||
        (+house.bathroom === parseInt(bathroom) && !bedroom)
      );
    });
  };

  const filterHouseBasedOnSearchInput = (houses) => {
    const res = houses.filter((house) => {
      return house.address.toLowerCase().includes(search.toLowerCase());
    });

    return res;
  };

  const filterHouseBasedOnBudget = (houses) => {
    return houses.filter((house) => {
      if (!budget) {
        return house;
      } else {
        switch (duration) {
          case "Year":
            return convertToAngka(house.yearPrice) <= convertToAngka(budget);
          case "Month":
            return convertToAngka(house.monthPrice) <= convertToAngka(budget);
          case "Day":
            return convertToAngka(house.dayPrice) <= convertToAngka(budget);
          default:
            return false;
        }
      }
    });
  };

  // filterHouseBasedOnBudget(houses);

  const filterHouse = (houses) => {
    if (!isFilter && !isSearch) {
      return houses;
    }

    const filteredHouseBasedOnSearchInput =
      filterHouseBasedOnSearchInput(houses);

    const filteredHouseBasedOnAmenities = filterHouseBasedOnAmenities(
      filteredHouseBasedOnSearchInput
    );
    const filteredHouseBasedOnSpec = filterHouseBasedOnSpec(
      filteredHouseBasedOnAmenities
    );

    const filteredHouseBasedOnBudget = filterHouseBasedOnBudget(
      filteredHouseBasedOnSpec
    );
    return filteredHouseBasedOnBudget;
  };

  // console.log(filterState);
  console.log("code by sabilimaulana");
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

    const getHouses = async () => {
      try {
        setLoading(true);
        const result = await axios.get(
          "http://localhost:8080/api/v1/properties"
        );
        setHouses(result.data.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error.response);
      }
    };

    getUser();
    getHouses();
  }, [dispatch]);

  // console.log(state.user.status);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  if (state.user.listAs === "Owner") {
    return (
      <>
        <Navbar />
        <OwnerContent />;
      </>
    );
  } else {
    return (
      <>
        <Navbar searchbar={true} />
        <div style={{ display: "flex", width: "100%" }}>
          <Sidebar />
          <Content houses={filterHouse(houses)} housesDuration={duration} />
        </div>
      </>
    );
  }
}

export default Home;
