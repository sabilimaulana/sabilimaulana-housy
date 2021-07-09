import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import styles from "./ChangePasswordModal.module.css";

const ChangePasswordModal = ({ showModal, onHide }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  const [warning, setWarning] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !retypePassword) {
      return setWarning("Silahkan isi semua inputfield");
    }

    if (newPassword !== retypePassword) {
      return setWarning("Re-type password doesn't match");
    }
    try {
      const token = sessionStorage.getItem("token");

      const data = {
        oldPassword,
        newPassword,
      };

      await axios({
        method: "PATCH",
        url: "http://localhost:8080/api/v1/user/change-password/",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data,
      });
      setOldPassword("");
      setNewPassword("");
      setRetypePassword("");
      setWarning("");
      onHide();
    } catch (error) {
      console.log(error.response);
      setWarning(error.response.data.message);
    }
  };

  const handleClose = () => {
    setOldPassword("");
    setNewPassword("");
    setRetypePassword("");
    setWarning("");
    onHide();
  };

  return (
    showModal && (
      <>
        <div className={styles.ChangePasswordModal}>
          <form className={styles.ChangePasswordForm}>
            <div className={styles.centerWrapper}>
              <p className={styles.modalTitle}>Change Password</p>
            </div>
            <label className={styles.inputLabel}>Old Password</label>
            <input
              className={styles.inputField}
              type="password"
              value={oldPassword}
              name="username"
              id="username"
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <label className={styles.inputLabel}>New Password</label>
            <input
              className={styles.inputField}
              type="password"
              value={newPassword}
              name="password"
              id="password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label className={styles.inputLabel}>Re-type Password</label>
            <input
              className={styles.inputField}
              type="password"
              value={retypePassword}
              name="retype-password"
              id="retype-password"
              onChange={(e) => setRetypePassword(e.target.value)}
            />

            <p className={styles.warning}>{warning}</p>

            <Link to="/me">
              <input
                type="submit"
                className={styles.ChangePasswordButton}
                value="Save"
                onClick={handleChangePassword}
              />
            </Link>
          </form>
        </div>
        <div className={styles.background} onClick={handleClose}></div>
      </>
    )
  );
};

export default ChangePasswordModal;
