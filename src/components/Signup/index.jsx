import styles from "./Signup.module.css";

// import "bootstrap/dist/css/bootstrap.min.css";
// import { Modal, Button } from "react-bootstrap";

const Signup = ({ showModal, onHide, onHere }) => {
  return showModal ? (
    <>
      <div className={styles.signupModal}>
        <form className={styles.signupForm}>
          <div className={styles.centerWrapper}>
            <p className={styles.modalTitle}>Sign up</p>
          </div>
          <label className={styles.inputLabel}>Fullname</label>
          <input
            className={styles.inputField}
            type="text"
            name="fullname"
            id="fullname"
          />

          <label className={styles.inputLabel}>Username</label>
          <input
            className={styles.inputField}
            type="text"
            name="username"
            id="username"
          />

          <label className={styles.inputLabel}>Email</label>
          <input
            className={styles.inputField}
            type="email"
            name="email"
            id="email"
          />

          <label className={styles.inputLabel}>Password</label>
          <input
            className={styles.inputField}
            type="password"
            name="password"
            id="password"
          />

          <label className={styles.inputLabel}>Phone Number</label>
          <input
            className={styles.inputField}
            type="number"
            name="phonenumber"
            id="phonenumber"
          />

          <label className={styles.inputLabel}>Gender</label>
          <div className={styles.genderRadio}>
            <div>
              <input type="radio" value="male" id="male" name="gender" />
              <label htmlFor="male">Male</label>
            </div>

            <div>
              <input type="radio" value="female" id="female" name="gender" />
              <label htmlFor="female">Female</label>
            </div>
          </div>

          <label className={styles.inputLabel}>Alamat</label>
          <textarea
            className={styles.inputAddress}
            name="address"
            id="address"
          />

          <input
            type="submit"
            className={styles.signupButton}
            value="Sign up"
          />
          <div className={styles.centerWrapper}>
            <p className={styles.signupText}>
              Already have an account ? Click
              <label
                className={styles.hereButton}
                onClick={() => {
                  onHide();
                  onHere();
                }}
              >
                Here
              </label>
            </p>
          </div>
        </form>
      </div>
      <div className={styles.background} onClick={onHide}></div>
    </>
  ) : null;
};

export default Signup;
