import { useState } from "react";
import ActionModal from "../ActionModal";
import styles from "./OwnerContent.module.css";

const OwnerContent = () => {
  const [actionModalShow, setActionModalShow] = useState(false);
  return (
    <div className={styles.container}>
      <ActionModal
        showModal={actionModalShow}
        onHide={() => {
          setActionModalShow(false);
        }}
      />
      <h1 className={styles.title}>Income Transaction</h1>
      <table className={styles.incomeTable}>
        <tr>
          <th>No</th>
          <th>Users</th>
          <th>Type of Rent</th>
          <th>Bukti Transfer</th>
          <th>Status Payment</th>
          <th>Action</th>
        </tr>
        <tr>
          <td>1</td>
          <td>Sabili Maulana</td>
          <td>year</td>
          <td>bukti.mp3</td>

          <td className={styles.pending}>Pending</td>
          <td
            onClick={() => {
              setActionModalShow(true);
            }}
          >
            icon
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Sabili Maulana</td>
          <td>year</td>
          <td>bukti.mp3</td>
          <td className={styles.cancel}>Cancel</td>
          <td>icon</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Sabili Maulana</td>
          <td>year</td>
          <td>bukti.mp3</td>
          <td className={styles.approved}>Approved</td>
          <td>icon</td>
        </tr>

        <tr>
          <td>4</td>
          <td>Sabili Maulana</td>
          <td>year</td>
          <td>bukti.mp3</td>

          <td className={styles.pending}>Pending</td>
          <td>icon</td>
        </tr>
        <tr>
          <td>5</td>
          <td>Sabili Maulana</td>
          <td>year</td>
          <td>bukti.mp3</td>
          <td className={styles.cancel}>Cancel</td>
          <td>icon</td>
        </tr>
        <tr>
          <td>6</td>
          <td>Sabili Maulana</td>
          <td>year</td>
          <td>bukti.mp3</td>
          <td className={styles.approved}>Approved</td>
          <td>icon</td>
        </tr>
      </table>
    </div>
  );
};

export default OwnerContent;
