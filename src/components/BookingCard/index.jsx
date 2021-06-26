import styles from "./BookingCard.module.css";

import brandIcon from "../../assets/images/brand-icon.svg";

import ellipseStart from "../../assets/images/ellipse-start.svg";
import verticalLine from "../../assets/images/line-icon.svg";
import ellipseEnd from "../../assets/images/ellipse-end.svg";

const BookingCard = ({
  button,
  status,
  invoice,
  orderDay,
  orderDate,
  orderMonth,
  orderYear,
  checkinDate,
  checkinMonth,
  checkinYear,
  checkoutDate,
  checkoutMonth,
  checkoutYear,
  houseName,
  duration,
  furnished,
  petAllowed,
  sharedAccomodation,
  address,
  tenantName,
  tenantPhone,
  tenantGender,
  price,
}) => {
  // console.log(house);
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
            {invoice ? (
              <h2 className={styles.bookingTitle}>Invoice</h2>
            ) : (
              <h2 className={styles.bookingTitle}>Booking</h2>
            )}
            <p className={styles.bookingDate}>
              <span>{orderDay}</span>{" "}
              {`, ${orderDate} ${orderMonth} ${orderYear}`}
            </p>
          </div>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.cardContentName}>
            <h2>{`House ${houseName}`}</h2>
            <p className={styles.houseAddress}>{address}</p>
            <div className={styles.bookingStatus}>
              {status === "Approve" ? (
                <div className={styles.approveStatus}>Approve</div>
              ) : status === "Cancel" ? (
                <div className={styles.cancelStatus}>Cancel</div>
              ) : (
                <div className={styles.waitingStatus}>Waiting Payment</div>
              )}
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
                <p>{`${checkinDate} ${checkinMonth} ${checkinYear}`}</p>
              </div>

              <div className={styles.checkoutWrapper}>
                <h3>Check-out</h3>
                <p>{`${checkoutDate} ${checkoutMonth} ${checkoutYear}`}</p>
              </div>
            </div>
          </div>

          <div className={styles.cardContentVariant}>
            <div className={styles.amenities}>
              <h3>Amenities</h3>
              <div>
                <p>{furnished && "Furnished"}</p>
                <p>{petAllowed && "Pet Allowed"}</p>
                <p>{sharedAccomodation && "Shared Accomodation"}</p>
              </div>
            </div>

            <div className={styles.duration}>
              <h3>Type of Rent</h3>
              <p>{duration}</p>
            </div>
          </div>

          <div className={styles.cardContentProof}>
            <div className={styles.imageWrapper}>
              <img src="" alt="" />
              {status === "Approve" ? "barcode" : "input file"}
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
              <p className={styles.tableContent}>{tenantName}</p>
            </div>

            <div className={styles.tableCol}>
              <p className={styles.tableHeader}>Gender</p>
              <p className={styles.tableContent}>{tenantGender}</p>
            </div>

            <div className={styles.tableColLong}>
              <p className={styles.tableHeader}>Phone</p>
              <p className={styles.tableContent}>{tenantPhone}</p>
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
              <p className={styles.totalText}>{`1 ${duration}`}</p>
              <p
                className={styles.totalPrice}
                style={{
                  color:
                    status === "Approve"
                      ? "rgb(10, 207, 131)"
                      : "rgb(255, 7, 66)",
                }}
              >
                {price}
              </p>
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
