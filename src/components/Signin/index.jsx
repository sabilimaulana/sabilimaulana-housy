import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Signin.module.css";

// import { users } from "../../constants/users";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";

const Signin = ({ showModal, onHide, onHere }) => {
  // const [user, setUser] = useState({});
  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
  });

  const { dispatch } = useContext(UserContext);

  // console.log(state);

  const [warning, setWarning] = useState("");

  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post("http://localhost:8080/api/v1/signin", {
        username: userInput.username,
        password: userInput.password.toString(),
      });

      console.log(result);

      if (result.data.hasOwnProperty("token")) {
        setWarning("");
        setUserInput({ username: "", password: "" });
        sessionStorage.setItem("token", result.data.token);

        const user = await axios.get(
          "http://localhost:8080/api/v1/user/profile",
          { headers: { Authorization: `Bearer ${result.data.token}` } }
        );

        // console.log(user);
        dispatch({
          type: "LOGIN",
          payload: {
            user: user.data.data,
          },
        });

        onHide();
      } else {
        setWarning(result.data.message);
      }
    } catch (error) {
      setWarning(error.response.data.message);
    }
  };

  return (
    showModal && (
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
              value={userInput.username}
              name="username"
              id="username"
              onChange={(e) =>
                setUserInput({ ...userInput, username: e.target.value })
              }
            />
            <label className={styles.inputLabel}>Password</label>
            <input
              className={styles.inputField}
              type="password"
              value={userInput.password}
              name="password"
              id="password"
              onChange={(e) =>
                setUserInput({ ...userInput, password: e.target.value })
              }
            />
            <Link to="/">
              <input
                type="submit"
                className={styles.signinButton}
                value="Sign in"
                onClick={handleSignin}
              />
            </Link>

            <div className={styles.centerWrapper}>
              <span className={styles.warning}>{warning}</span>
            </div>

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
    )
  );
};

export default Signin;
