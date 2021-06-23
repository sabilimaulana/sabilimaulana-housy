import styles from "./Navbar.module.css";

import { Link } from "react-router-dom";

import brandIcon from "../../assets/images/brand-icon.svg";
import searchIcon from "../../assets/images/search-icon.svg";
import verticalLine from "../../assets/images/vertical-line.svg";
import userIcon from "../../assets/images/user-icon.svg";
import { useState } from "react";

const Navbar = ({ logged, handleSearch, searchText }) => {
  const [log, setLog] = useState(logged);

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
          <Link
            to="/"
            onClick={() => {
              setLog(true);
            }}
          >
            <button className={styles.signinButton}>Sign In</button>
          </Link>
          <button className={styles.signupButton}>Sign Up</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
