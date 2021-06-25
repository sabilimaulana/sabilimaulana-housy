import styles from "./BookingCard.module.css";

import brandIcon from "../../assets/images/brand-icon.svg";

import ellipseStart from "../../assets/images/ellipse-start.svg";
import verticalLine from "../../assets/images/line-icon.svg";
import ellipseEnd from "../../assets/images/ellipse-end.svg";

const BookingCard = ({ button }) => {
  return (
    <div
      className={styles.bookingCardWrapper}
      style={{ minHeight: button ? "482px" : "410px" }}
    >
      <div
        className={styles.bookingCard}
        style={{ marginBottom: button ? "22px" : 0 }}
      >
        <div className={styles.bookingCardHeader}>
          <img src={brandIcon} alt="" />
          <div className={styles.headerTitle}>
            <h2 className={styles.bookingTitle}>Booking</h2>
            <p className={styles.bookingDate}>
              <span>Saturday</span>, 30 March 2020
            </p>
          </div>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.cardContentName}>
            <h2>House Astina</h2>
            <p className={styles.houseAddress}>
              Tambora, Jakarta Barat Lorem, ipsum dolor sit amet consectetur
              adipisicing elit.
            </p>
            <div className={styles.bookingStatus}>
              <div className={styles.statusCard}>Waiting Payment</div>
            </div>
          </div>

          <div className={styles.cardContentDate}>
            <div className={styles.iconWrapper}>
              <img src={ellipseStart} alt="ellipse start" />
              <img src={verticalLine} alt="vertical line" />
              <img src={ellipseEnd} alt="ellipse end" />
            </div>

            <div className={styles.dateWrapper}>
              <div className={styles.checkinWrapper}>
                <h3>Check-in</h3>
                <p>30 August 2021</p>
              </div>

              <div className={styles.checkoutWrapper}>
                <h3>Check-out</h3>
                <p>30 Septemberre 2022</p>
              </div>
            </div>
          </div>

          <div className={styles.cardContentVariant}>
            <div className={styles.amenities}>
              <h3>Amenities</h3>
              <div>
                <p>Furnished</p>
                <p>Pet Allowed</p>
                <p>Shared Accomodation</p>
              </div>
            </div>

            <div className={styles.duration}>
              <h3>Type of Rent</h3>
              <p>Month</p>
            </div>
          </div>

          <div className={styles.cardContentProof}>
            <div className={styles.imageWrapper}>
              <img src="" alt="" />
            </div>
            <p>Upload payment proof</p>
          </div>
        </div>

        <div className={styles.cardTable}>
          <div className={styles.cardTableLeft}>
            <div className={styles.tableCol}>
              <p className={styles.tableHeader}>No</p>
              <p className={styles.tableContent}>1</p>
            </div>

            <div className={styles.tableColLong}>
              <p className={styles.tableHeader}>Fullname</p>
              <p className={styles.tableContent}>Sabili Maulana</p>
            </div>

            <div className={styles.tableCol}>
              <p className={styles.tableHeader}>Gender</p>
              <p className={styles.tableContent}>Male</p>
            </div>

            <div className={styles.tableColLong}>
              <p className={styles.tableHeader}>Phone</p>
              <p className={styles.tableContent}>081234567890</p>
            </div>
          </div>

          <div className={styles.cardTableRight}>
            <div className={styles.totalTitle}>
              <p className={styles.tableHeader}>&nbsp;</p>
              <p className={styles.totalText}>Long time rent</p>
              <p className={styles.totalText}>Total</p>
            </div>
            <div className={styles.totalDivider}>
              <p className={styles.tableHeader}>&nbsp;</p>
              <p className={styles.totalText}>:</p>
              <p className={styles.totalText}>:</p>
            </div>
            <div className={styles.totalValue}>
              <p className={styles.tableHeader}>&nbsp;</p>
              <p className={styles.totalText}>1 Year</p>
              <p className={styles.totalPrice}>Rp. 9.000.000</p>
            </div>
          </div>
        </div>
        <hr className={styles.hrOne} />
        <hr className={styles.hrTwo} />
      </div>
      {button && (
        <div className={styles.buttonWrapper}>
          <button className={styles.buttonPay}>Pay</button>
        </div>
      )}
    </div>
  );
};

export default BookingCard;
