import { Link } from "react-router-dom";
import styles from "./Signin.module.css";

// import "bootstrap/dist/css/bootstrap.min.css";
// import { Modal, Button } from "react-bootstrap";

const Signin = ({ showModal, onHide, onHere }) => {
  return showModal ? (
    <>
      <div className={styles.signinModal}>
        <form className={styles.signinForm}>
          <div className={styles.centerWrapper}>
            <p className={styles.modalTitle}>Sign in</p>
          </div>
          <label className={styles.inputLabel}>Username</label>
          <input
            className={styles.inputField}
            type="text"
            name="username"
            id="username"
          />
          <label className={styles.inputLabel}>Password</label>
          <input
            className={styles.inputField}
            type="password"
            name="username"
            id="username"
          />
          <Link to="/">
            <input
              type="submit"
              className={styles.signinButton}
              value="Sign in"
              onClick={(e) => {
                // e.preventDefault();
                onHide();
              }}
            />
          </Link>

          <div className={styles.centerWrapper}>
            <p className={styles.signupText}>
              Don't have an account? ? Click
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

export default Signin;
