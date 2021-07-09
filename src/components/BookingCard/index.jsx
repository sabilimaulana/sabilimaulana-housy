import axios from "axios";
import QRCode from "react-qr-code";

import styles from "./BookingCard.module.css";

import folderIcon from "../../assets/images/folder-icon.svg";
import brandIcon from "../../assets/images/brand-icon.svg";
import ellipseStart from "../../assets/images/ellipse-start.svg";
import verticalLine from "../../assets/images/line-icon.svg";
import ellipseEnd from "../../assets/images/ellipse-end.svg";
import { convertToRupiah } from "../../utils/moneyConvert";
import { useState } from "react";
import closeIcon from "../../assets/images/close-icon.svg";

const BookingCard = ({ button, orderDetail, invoice, marginBottom }) => {
  const [proofImage, setProofImage] = useState("");
  const [isProofImageUploaded, setIsProofImageUploaded] = useState(false);
  const [rawProofImage, setRawProofImage] = useState();

  const {
    status,
    total,
    duration,
    createdAt: orderTime,
    checkin,
    checkout,
    id,
    attachment,
  } = orderDetail;
  const { fullname, gender, phone } = orderDetail.userData;
  const {
    propertyName: houseName,
    address,
    furnished,
    petAllowed,
    sharedAccomodation,
  } = orderDetail.Property;

  const getDayString = (time) => {
    const dayNumber = new Date(time).getDay();
    const day = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return day[dayNumber];
  };

  const getMonthString = (time) => {
    const monthNumber = new Date(time).getMonth();

    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "Desember",
    ];

    return month[monthNumber];
  };

  const getFullYear = (time) => {
    return new Date(time).getFullYear();
  };
  const getDate = (time) => {
    return new Date(time).getDate();
  };

  const handleProof = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (e) => {
        setProofImage(e.target.result);
        setIsProofImageUploaded(true);
      };
      reader.readAsDataURL(e.target.files[0]);
      setRawProofImage(e.target.files[0]);
    }
  };
  const handleCloseProofImage = () => {
    setProofImage("");
    setRawProofImage();
    setIsProofImageUploaded(false);
  };

  //   <BookingCard
  //   button
  //   key={index}
  //   orderDay={convertDayToString(
  //     new Date(booking.orderTime).getDay()
  //   )}
  //   orderDate={new Date(booking.orderTime).getDate()}
  //   orderMonth={convertMonthToString(
  //     new Date(booking.orderTime).getMonth()
  //   )}
  //   orderYear={new Date(booking.orderTime).getFullYear()}
  //   houseName={booking.house.name}
  //   checkinDate={new Date(booking.checkinDate).getDate()}
  //   checkinMonth={convertMonthToString(
  //     new Date(booking.checkinDate).getMonth()
  //   )}
  //   checkinYear={new Date(booking.checkinDate).getFullYear()}
  //   checkoutDate={new Date(booking.checkoutDate).getDate()}
  //   checkoutMonth={convertMonthToString(
  //     new Date(booking.checkoutDate).getMonth()
  //   )}
  //   checkoutYear={new Date(booking.checkoutDate).getFullYear()}
  //   orderDetail={booking}
  // />

  // const {state, dispatch} = useContext(UserContext)
  const handlePay = async () => {
    try {
      var bodyForm = new FormData();
      bodyForm.append("proofImage", rawProofImage);
      bodyForm.append("status", "Waiting Approve");
      await axios({
        method: "PATCH",
        url: `http://localhost:8080/api/v1/transaction/${id}`,
        data: bodyForm,
      });

      // axios({
      //   method: "POST",
      //   url: "http://localhost:8080/api/v1/property",
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //     Authorization: `Bearer ${token}`,
      //   },
      //   data: bodyForm,
      // });
    } catch (error) {
      console.log(error.response);
    }

    // if (!localStorage.getItem("order")) {
    //   localStorage.setItem("order", JSON.stringify([]));
    // }

    // orderDetail.status = "Waiting Approve";
    // const orderLocalStorage = JSON.parse(localStorage.getItem("order"));
    // orderLocalStorage.push(orderDetail);
    // localStorage.setItem("order", JSON.stringify(orderLocalStorage));

    // const userSessionStorage = JSON.parse(sessionStorage.getItem("user"));

    // const newBooking = userSessionStorage.booking.filter((item) => {
    //   // console.log(item.idOrder, orderDetail.idOrder);
    //   if (item.idOrder === orderDetail.idOrder) {
    //     item.status = "Waiting Approve";

    //     return true;
    //   }

    //   return true;
    // });

    // const newBooking = userSessionStorage.booking.filter((item) => {
    //   console.log(item.idOrder, orderDetail.idOrder);
    //   if (item.idOrder === orderDetail.idOrder) {
    //     return false;
    //   }
    //   return true;
    // });
    // console.log(newBooking);
    // userSessionStorage.booking = newBooking;
    // sessionStorage.setItem("user", JSON.stringify(userSessionStorage));
    window.location.reload();
  };

  return (
    <div
      className={styles.bookingCardWrapper}
      style={{
        minHeight: button ? "482px" : "410px",
        marginBottom: !marginBottom && "0px",
      }}
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
              <span>{getDayString(orderTime)}</span>
              {`, ${getDate(orderTime)} ${getMonthString(
                orderTime
              )} ${getFullYear(orderTime)}`}
            </p>
          </div>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.cardContentName}>
            <h2>{`House ${houseName}`}</h2>
            <p className={styles.houseAddress}>{address}</p>
            <div className={styles.bookingStatus}>
              {status === "Approved" ? (
                <div className={styles.approveStatus}>Approved</div>
              ) : status === "Cancel" ? (
                <div className={styles.cancelStatus}>Cancel</div>
              ) : status === "Waiting Approve" ? (
                <div className={styles.waitingStatus}>Waiting Approve</div>
              ) : (
                <div className={styles.waitingPaymentStatus}>
                  Waiting Payment
                </div>
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
                <p>{`${getDate(checkin)} ${getMonthString(
                  checkin
                )} ${getFullYear(checkin)}`}</p>
              </div>

              <div className={styles.checkoutWrapper}>
                <h3>Check-out</h3>
                <p>{`${getDate(checkout)} ${getMonthString(
                  checkout
                )} ${getFullYear(checkout)}`}</p>
              </div>
            </div>
          </div>

          <div className={styles.cardContentVariant}>
            <div className={styles.amenities}>
              <h3>Amenities</h3>
              <div>
                <p>{furnished === "true" && "Furnished"}</p>
                <p>{petAllowed === "true" && "Pet Allowed"}</p>
                <p>{sharedAccomodation === "true" && "Shared Accomodation"}</p>
              </div>
            </div>

            <div className={styles.duration}>
              <h3>Type of Rent</h3>
              <p>{duration}</p>
            </div>
          </div>

          <div className={styles.cardContentProof}>
            {status === "Waiting Payment" ? (
              isProofImageUploaded ? (
                <div className={styles.imagePreview}>
                  <img
                    src={proofImage}
                    className={styles.uploadedImage}
                    alt="uploaded proof img"
                    draggable="false"
                  />
                  <img
                    src={closeIcon}
                    alt="close"
                    width="20px"
                    className={styles.closeButton}
                    onClick={handleCloseProofImage}
                  />
                </div>
              ) : (
                <div className={styles.uploadField}>
                  <label htmlFor="proofInput">
                    <img src={folderIcon} alt="placeholder" width="30px" />
                  </label>
                  <input
                    type="file"
                    id="proofInput"
                    accept=".jpeg,.jpg,.png,.svg"
                    onChange={handleProof}
                  />
                </div>
              )
            ) : status === "Waiting Approve" ? (
              <img
                src={attachment}
                className={styles.uploadedImage}
                alt="uploaded proof img"
                draggable="false"
                style={{ border: "2px solid black" }}
              />
            ) : status === "Approved" ? (
              <QRCode
                value={`http://localhost:8080/api/v1/transaction/${id}`}
                size={140}
              />
            ) : status === "Cancel" ? (
              <QRCode
                value={`http://localhost:8080/api/v1/transaction/${id}`}
                size={140}
              />
            ) : null}
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
              <p className={styles.tableContent}>{fullname}</p>
            </div>

            <div className={styles.tableCol}>
              <p className={styles.tableHeader}>Gender</p>
              <p className={styles.tableContent}>{gender}</p>
            </div>

            <div className={styles.tableColLong}>
              <p className={styles.tableHeader}>Phone</p>
              <p className={styles.tableContent}>{phone}</p>
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
                    status === "Approved"
                      ? "rgb(10, 207, 131)"
                      : "rgb(255, 7, 66)",
                }}
              >
                {convertToRupiah(total)}
              </p>
            </div>
          </div>
        </div>
        <hr className={styles.hrOne} />
        <hr className={styles.hrTwo} />
      </div>
      {button && status === "Waiting Payment" && (
        <div className={styles.buttonWrapper}>
          <button className={styles.buttonPay} onClick={handlePay}>
            Pay
          </button>
        </div>
      )}
    </div>
  );
};

BookingCard.defaultProps = {
  marginBottom: true,
  orderDetail: {
    idOrder: 0,
    status: "Waiting Payment",
    orderDuration: "Year",
    price: 0,
    checkinDate: new Date(),
    checkoutDate: new Date(),
    house: {
      id: 18,
      name: "Sea",
      image: null,
      spec: {
        bedroom: 2,
        bathroom: 7,
        sqft: "2,400",
      },
      address: "Jakarta Barat, Tambora",
      amenities: [
        {
          title: "Furnished",
          value: false,
        },
        {
          title: "Pet Allowed",
          value: true,
        },
        {
          title: "Shared Accomodation",
          value: false,
        },
      ],
      price: {
        day: {
          title: "Day",
          value: "17.000",
        },
        month: {
          title: "Month",
          value: "500.000",
        },
        year: {
          title: "Year",
          value: "6.000.000",
        },
      },
    },
    orderTime: new Date(),
    user: {
      id: 0,
      username: "username",
      fullname: "fullname",
      gender: "gender",
      phone: "081234567890",
    },
  },
};

export default BookingCard;
