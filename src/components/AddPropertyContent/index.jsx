import { useContext, useEffect, useState } from "react";
import styles from "./AddPropertyContent.module.css";
import folderIcon from "../../assets/images/folder-icon.svg";
import closeIcon from "../../assets/images/close-icon.svg";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import dropdownIcon from "../../assets/images/black-dropdown-icon.svg";

const AddPropertyContent = () => {
  const { state } = useContext(UserContext);

  const [propertyName, setPropertyName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [yearPrice, setYearPrice] = useState("");
  const [monthPrice, setMonthPrice] = useState("");
  const [dayPrice, setDayPrice] = useState("");
  const [furnished, setFurnished] = useState(false);
  const [petAllowed, setPetAllowed] = useState(false);
  const [sharedAccomodation, setSharedAccomodation] = useState(false);
  const [bedroom, setBedroom] = useState("1");
  const [bathroom, setBathroom] = useState("1");
  const [area, setArea] = useState("");
  const [description, setDescription] = useState("");

  // untuk image preview
  const [firstImage, setFirstImage] = useState("");
  const [isFirstImageUploaded, setIsFirstImageUploaded] = useState(false);
  const [rawFirstImage, setRawFirstImage] = useState();

  const [secondImage, setSecondImage] = useState("");
  const [isSecondImageUploaded, setIsSecondImageUploaded] = useState(false);
  const [rawSecondImage, setRawSecondImage] = useState();

  const [thirdImage, setThirdImage] = useState("");
  const [isThirdImageUploaded, setIsThirdImageUploaded] = useState(false);
  const [rawThirdImage, setRawThirdImage] = useState();

  const [fourthImage, setFourthImage] = useState("");
  const [isFourthImageUploaded, setIsFourthImageUploaded] = useState(false);
  const [rawFourthImage, setRawFourthImage] = useState();

  const [cities, setCities] = useState([]);

  // Untuk warning required
  const [warning, setWarning] = useState("");

  const handleFirstImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (e) => {
        setFirstImage(e.target.result);
        setIsFirstImageUploaded(true);
      };
      reader.readAsDataURL(e.target.files[0]);
      setRawFirstImage(e.target.files[0]);
    }
  };
  const handleCloseFirstImage = () => {
    setFirstImage("");
    setRawFirstImage();
    setIsFirstImageUploaded(false);
  };
  const handleSecondImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (e) => {
        setSecondImage(e.target.result);
        setIsSecondImageUploaded(true);
      };
      reader.readAsDataURL(e.target.files[0]);
      setRawSecondImage(e.target.files[0]);
    }
  };
  const handleCloseSecondImage = () => {
    setSecondImage("");
    setRawSecondImage();
    setIsSecondImageUploaded(false);
  };

  const handleThirdImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (e) => {
        setThirdImage(e.target.result);
        setIsThirdImageUploaded(true);
      };
      reader.readAsDataURL(e.target.files[0]);
      setRawThirdImage(e.target.files[0]);
    }
  };
  const handleCloseThirdImage = () => {
    setThirdImage("");
    setRawThirdImage();
    setIsThirdImageUploaded(false);
  };

  const handleFourthImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (e) => {
        setFourthImage(e.target.result);
        setIsFourthImageUploaded(true);
      };
      reader.readAsDataURL(e.target.files[0]);
      setRawFourthImage(e.target.files[0]);
    }
  };
  const handleCloseFourthImage = () => {
    setFourthImage("");
    setRawFourthImage();
    setIsFourthImageUploaded(false);
  };

  const handlePress = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
    }
  };

  // console.log({
  //   propertyName,
  //   city,
  //   address,
  //   yearPrice,
  //   monthPrice,
  //   dayPrice,
  //   furnished,
  //   petAllowed,
  //   sharedAccomodation,
  //   bedroom,
  //   bathroom,
  // });

  const handleSave = async (e) => {
    e.preventDefault();
    // console.log({
    //   propertyName,
    //   city,
    //   address,
    //   yearPrice,
    //   monthPrice,
    //   dayPrice,
    //   furnished,
    //   petAllowed,
    //   sharedAccomodation,
    //   bedroom,
    //   bathroom,
    // });

    // console.log("id", state.user.id);
    try {
      if (
        !propertyName ||
        !address ||
        !yearPrice ||
        !monthPrice ||
        !dayPrice ||
        !area
      ) {
        setWarning("Silahkan isi semua input terlebih dahulu");
        return;
      }

      var bodyForm = new FormData();
      bodyForm.append("uploadedImages", rawFirstImage);
      bodyForm.append("uploadedImages", rawSecondImage);
      bodyForm.append("uploadedImages", rawThirdImage);
      bodyForm.append("uploadedImages", rawFourthImage);
      bodyForm.append("propertyName", propertyName);
      bodyForm.append("ownerId", state.user.id);
      bodyForm.append("cityId", city);
      bodyForm.append("address", address);
      bodyForm.append("yearPrice", yearPrice);
      bodyForm.append("monthPrice", monthPrice);
      bodyForm.append("dayPrice", dayPrice);
      bodyForm.append("furnished", furnished);
      bodyForm.append("petAllowed", petAllowed);
      bodyForm.append("sharedAccomodation", sharedAccomodation);
      bodyForm.append("bedroom", bedroom);
      bodyForm.append("bathroom", bathroom);
      bodyForm.append("area", area);
      bodyForm.append("description", description);

      const token = await sessionStorage.getItem("token");

      await axios({
        method: "POST",
        url: "http://localhost:8080/api/v1/property",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        data: bodyForm,
      });
      window.location.reload();
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    const getCities = async () => {
      try {
        const result = await axios.get("http://localhost:8080/api/v1/cities");
        setCities(result.data.data);
        setCity(result.data.data[0]?.id);
        // setCities()
      } catch (error) {
        console.log(error.data);
      }
    };

    getCities();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add Property</h1>
      <form className={styles.formProperty}>
        <label htmlFor="name" className={styles.inputLabel}>
          Property Name
        </label>
        <input
          placeholder="Aria"
          type="text"
          className={styles.inputText}
          value={propertyName}
          onChange={(e) => setPropertyName(e.target.value)}
        />

        <label htmlFor="city" className={styles.inputLabel}>
          City
        </label>
        <img
          src={dropdownIcon}
          className={styles.cityDropdown}
          alt="dropdown"
          height="20px"
        />

        <select
          name="city"
          id="city"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        >
          {cities.map((city, index) => {
            return (
              <option key={index} value={city.id}>
                {city.cityName}
              </option>
            );
          })}
        </select>

        <label htmlFor="address" className={styles.inputLabel}>
          Address
        </label>
        <textarea
          placeholder="Jalan Jembatan Besi, 11320"
          className={styles.inputTextarea}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>

        <div className={styles.priceSection}>
          <label htmlFor="price" className={styles.inputLabel}>
            Price
          </label>
          <div className={styles.priceInputSection}>
            <div>
              <label htmlFor="yearPrice">Year :</label>
              <input
                type="number"
                placeholder="9000000"
                className={styles.inputPrice}
                value={yearPrice}
                onChange={(e) => setYearPrice(e.target.value)}
                onKeyDown={handlePress}
                onWheel={(e) => e.target.blur()}
              />
            </div>

            <div>
              <label htmlFor="monthPrice">Month :</label>
              <input
                type="number"
                placeholder="750000"
                className={styles.inputPrice}
                value={monthPrice}
                onChange={(e) => setMonthPrice(e.target.value)}
                onKeyDown={handlePress}
                onWheel={(e) => e.target.blur()}
              />
            </div>

            <div>
              <label htmlFor="dayPrice">Day :</label>
              <input
                type="number"
                placeholder="25000"
                className={styles.inputPrice}
                value={dayPrice}
                onChange={(e) => setDayPrice(e.target.value)}
                onKeyDown={handlePress}
                onWheel={(e) => e.target.blur()}
              />
            </div>
          </div>
        </div>

        <label htmlFor="amenities" className={styles.inputLabel}>
          Amenities
        </label>
        <div className={styles.amenitiesWrapper}>
          <div>
            <input
              type="checkbox"
              id="Furnished"
              value={furnished}
              onChange={(e) => setFurnished(!furnished)}
            />
            <label htmlFor="Furnished">Furnished</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="PetAllowed"
              value={petAllowed}
              onChange={(e) => setPetAllowed(!petAllowed)}
            />
            <label htmlFor="PetAllowed">Pet Allowed</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="SharedAccomodation"
              value={sharedAccomodation}
              onChange={(e) => setSharedAccomodation(!sharedAccomodation)}
            />
            <label htmlFor="SharedAccomodation">Shared Accomodation</label>
          </div>
        </div>

        <label htmlFor="bedroom" className={styles.inputLabel}>
          Bedroom
        </label>
        <img
          src={dropdownIcon}
          className={styles.bedroomDropdown}
          alt="dropdown"
          height="20px"
        />
        <select
          name="bedroom"
          id="bedroom"
          value={bedroom}
          onChange={(e) => setBedroom(e.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>

        <label htmlFor="bathroom" className={styles.inputLabel}>
          Bathroom
        </label>
        <img
          src={dropdownIcon}
          className={styles.bathroomDropdown}
          alt="dropdown"
          height="20px"
        />
        <select
          name="bathroom"
          id="bathroom"
          value={bathroom}
          onChange={(e) => setBathroom(e.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>

        <label htmlFor="area" className={styles.inputLabel}>
          Area (sqft)
        </label>
        <input
          type="number"
          placeholder="2000"
          className={styles.inputText}
          value={area}
          onChange={(e) => setArea(e.target.value)}
          onKeyDown={handlePress}
          onWheel={(e) => e.target.blur()}
        />

        <label htmlFor="description" className={styles.inputLabel}>
          Description
        </label>
        <textarea
          placeholder="..."
          className={styles.inputTextarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength="1400"
        ></textarea>

        {/* Hati-hati terhadap kodingan berikut rawan terjadi kebingungan */}
        {/*  */}
        <div className={styles.boxFileWrapper}>
          <div className={styles.boxFile}>
            <h2>First Image</h2>
            <p>Upload here</p>
            {!isFirstImageUploaded ? (
              <div className={styles.uploadField}>
                <label htmlFor="firstImageInput">
                  <img src={folderIcon} alt="placeholder" width="30px" />
                </label>
                <input
                  type="file"
                  id="firstImageInput"
                  accept=".jpeg,.jpg,.png,.svg"
                  onChange={handleFirstImage}
                />
              </div>
            ) : (
              <div className={styles.imagePreview}>
                <img
                  src={firstImage}
                  className={styles.uploadedImage}
                  alt="uploaded first img"
                  draggable="false"
                />
                <img
                  src={closeIcon}
                  alt="close"
                  width="20px"
                  className={styles.closeButton}
                  onClick={handleCloseFirstImage}
                />
              </div>
            )}
          </div>

          <div className={styles.boxFile}>
            <h2>Second Image</h2>
            <p>Upload here</p>
            {!isSecondImageUploaded ? (
              <div className={styles.uploadField}>
                <label htmlFor="secondImageInput">
                  <img src={folderIcon} alt="placeholder" width="30px" />
                </label>
                <input
                  type="file"
                  id="secondImageInput"
                  accept=".jpeg,.jpg,.png,.svg"
                  onChange={handleSecondImage}
                />
              </div>
            ) : (
              <div className={styles.imagePreview}>
                <img
                  src={secondImage}
                  className={styles.uploadedImage}
                  alt="uploaded second img"
                  draggable="false"
                />
                <img
                  src={closeIcon}
                  alt="close"
                  width="20px"
                  className={styles.closeButton}
                  onClick={handleCloseSecondImage}
                />
              </div>
            )}
          </div>

          <div className={styles.boxFile}>
            <h2>Third Image</h2>
            <p>Upload here</p>
            {!isThirdImageUploaded ? (
              <div className={styles.uploadField}>
                <label htmlFor="thirdImageInput">
                  <img src={folderIcon} alt="placeholder" width="30px" />
                </label>
                <input
                  type="file"
                  id="thirdImageInput"
                  accept=".jpeg,.jpg,.png,.svg"
                  onChange={handleThirdImage}
                />
              </div>
            ) : (
              <div className={styles.imagePreview}>
                <img
                  src={thirdImage}
                  className={styles.uploadedImage}
                  alt="uploaded third img"
                  draggable="false"
                />
                <img
                  src={closeIcon}
                  alt="close"
                  width="20px"
                  className={styles.closeButton}
                  onClick={handleCloseThirdImage}
                />
              </div>
            )}
          </div>

          <div className={styles.boxFile}>
            <h2>Fourth Image</h2>
            <p>Upload here</p>
            {!isFourthImageUploaded ? (
              <div className={styles.uploadField}>
                <label htmlFor="fourthImageInput">
                  <img src={folderIcon} alt="placeholder" width="30px" />
                </label>
                <input
                  type="file"
                  id="fourthImageInput"
                  accept=".jpeg,.jpg,.png,.svg"
                  onChange={handleFourthImage}
                />
              </div>
            ) : (
              <div className={styles.imagePreview}>
                <img
                  src={fourthImage}
                  className={styles.uploadedImage}
                  alt="uploaded fourth img"
                  draggable="false"
                />
                <img
                  src={closeIcon}
                  alt="close"
                  width="20px"
                  className={styles.closeButton}
                  onClick={handleCloseFourthImage}
                />
              </div>
            )}
          </div>
        </div>

        <p className={styles.warning}>{warning}</p>
        <button className={styles.saveButton} onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
};

export default AddPropertyContent;
