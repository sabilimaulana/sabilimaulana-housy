import styles from "./Navbar.module.css";

// import { Link } from "react-router-dom";

import brandIcon from "../../assets/images/brand-icon.svg";
import searchIcon from "../../assets/images/search-icon.svg";
import verticalLine from "../../assets/images/vertical-line.svg";
import manUser from "../../assets/images/man-user.png";
import { useContext, useEffect, useState } from "react";
import Signin from "../Signin";
import Signup from "../Signup";
import UserDropdown from "../UserDropdown";
// import OwnerDropdown from "../OwnerDropdown";

import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import FilterContext from "../../contexts/FilterContext";
import OwnerDropdown from "../OwnerDropdown";

const Navbar = ({ searchbar }) => {
  // handleSearch, searchText,
  const { state } = useContext(UserContext);

  const { filterDispatch } = useContext(FilterContext);

  const [searchText, setSearchText] = useState("");

  const [signinModalShow, setSigninModalShow] = useState(false);
  const [signupModalShow, setSignupModalShow] = useState(false);
  const [userDropdownShow, setUserDropdownShow] = useState(false);
  const [ownerDropdownShow, setOwnerDropdownShow] = useState(false);

  useEffect(() => {}, [state]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchButton = (e) => {
    e.preventDefault();

    filterDispatch({
      type: "FILTERIN",
      payload: {
        search: searchText,
        isSearch: true,
      },
    });
  };

  // console.log(filterState);

  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <img src={brandIcon} alt="brand icon" width="138px" />
      </Link>

      {searchbar && (
        <form className={styles.searchForm}>
          <input
            className={styles.searchInput}
            type="text"
            onChange={handleSearch}
            value={searchText}
          />

          <img src={verticalLine} alt="search border" height="40px" />
          <button className={styles.searchButton} onClick={handleSearchButton}>
            <img src={searchIcon} alt="search icon" />
          </button>
        </form>
      )}

      {state.isLogin ? (
        state.user.listAs === "Owner" ? (
          <>
            <div
              className={styles.user}
              onClick={() => setOwnerDropdownShow(!ownerDropdownShow)}
            >
              {state.user.urlImage === "" ? (
                <img src={manUser} alt="user" height="50px" />
              ) : (
                <img src={state.user.urlImage} alt="user" height="50px" />
              )}
            </div>
            <OwnerDropdown
              showDropdown={ownerDropdownShow}
              onHide={() => setOwnerDropdownShow(false)}
            />
          </>
        ) : (
          <>
            <div
              className={styles.user}
              onClick={() => setUserDropdownShow(!userDropdownShow)}
            >
              {state.user.urlImage === "" ? (
                <img src={manUser} alt="user" height="50px" />
              ) : (
                <img src={state.user.urlImage} alt="user" height="50px" />
              )}
            </div>
            <UserDropdown
              showDropdown={userDropdownShow}
              onHide={() => setUserDropdownShow(false)}
            />
          </>
        )
      ) : (
        <div className={styles.signWrapper}>
          <button
            className={styles.signinButton}
            onClick={() => setSigninModalShow(true)}
          >
            Sign In
          </button>
          <Signin
            showModal={signinModalShow}
            onHide={() => setSigninModalShow(false)}
            onHere={() => setSignupModalShow(true)}
          />
          <button
            className={styles.signupButton}
            onClick={() => setSignupModalShow(true)}
          >
            Sign Up
          </button>
          <Signup
            showModal={signupModalShow}
            onHide={() => setSignupModalShow(false)}
            onHere={() => setSigninModalShow(true)}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
