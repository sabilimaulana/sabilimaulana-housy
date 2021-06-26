import { useContext, useEffect } from "react";
import Content from "../../components/Content";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { houses } from "../../constants/houses";
import { UserContext } from "../../contexts/UserContext";
import { FilterContext } from "../../contexts/FilterContext";
import { convertToAngka } from "../../utils/moneyConvert.js";
import OwnerContent from "../../components/OwnerContent";

function Home() {
  const { state, dispatch } = useContext(UserContext);
  const { filterState } = useContext(FilterContext);

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
      return (
        furnished === house.amenities[0].value &&
        petAllowed === house.amenities[1].value &&
        sharedAccomodation === house.amenities[2].value
      );
    });

    return res;
  };

  const filterHouseBasedOnSpec = (houses) => {
    return houses.filter((house) => {
      if (!bedroom && !bathroom) {
        return true;
      }
      if (
        house.spec.bedroom === parseInt(bedroom) &&
        house.spec.bathroom === parseInt(bathroom)
      ) {
        return true;
      }
      return (
        (house.spec.bedroom === parseInt(bedroom) && !bathroom) ||
        (house.spec.bathroom === parseInt(bathroom) && !bedroom)
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
            return (
              convertToAngka(house.price.year.value) <= convertToAngka(budget)
            );
          case "Month":
            return (
              convertToAngka(house.price.month.value) <= convertToAngka(budget)
            );
          case "Day":
            return (
              convertToAngka(house.price.day.value) <= convertToAngka(budget)
            );
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

  console.log(filterState);

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

  console.log(state.user.status);

  if (state.user.status === "owner") {
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
