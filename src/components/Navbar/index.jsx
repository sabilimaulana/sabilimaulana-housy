import styles from "./Navbar.module.css";

// import { Link } from "react-router-dom";

import brandIcon from "../../assets/images/brand-icon.svg";
import searchIcon from "../../assets/images/search-icon.svg";
import verticalLine from "../../assets/images/vertical-line.svg";
import userIcon from "../../assets/images/user-icon.svg";
import { useState } from "react";
import Signin from "../Signin";
import Signup from "../Signup";

const Navbar = ({ logged, handleSearch, searchText }) => {
  const [log, setLog] = useState(logged);
  const [signinModalShow, setSigninModalShow] = useState(false);
  const [signupModalShow, setSignupModalShow] = useState(false);

  return (
    <nav className={styles.navbar}>
      <img src={brandIcon} alt="brand icon" width="138px" />

      <form className={styles.searchForm}>
        <input
          className={styles.searchInput}
          type="text"
          onChange={handleSearch}
          value={searchText}
        />
        <img src={verticalLine} alt="search border" height="40px" />
        <button className={styles.searchButton}>
          <img src={searchIcon} alt="search icon" />
        </button>
      </form>

      {log ? (
        <div className={styles.user}>
          <img src={userIcon} alt="user" height="50px" />
        </div>
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
