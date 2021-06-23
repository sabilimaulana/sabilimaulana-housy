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

          <input
            type="submit"
            className={styles.signupButton}
            value="Sign in"
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
