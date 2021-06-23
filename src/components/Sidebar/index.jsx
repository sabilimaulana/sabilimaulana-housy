import styles from "./Sidebar.module.css";

import DateInput from "../../components/DateInput";

const Sidebar = ({
  handleAmenities,
  amenities,
  handleDuration,
  duration,
  handleBedroom,
  bedroom,
  handleBathroom,
  bathroom,
}) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.duration}>
        <p className={styles.durationTitle}>Type of Rent</p>
        <div className={styles.durationOptions} onChange={handleDuration}>
          <Duration id="day" value="Day" duration={duration} />
          <Duration id="month" value="Month" duration={duration} />
          <Duration id="year" value="Year" duration={duration} />
        </div>
      </div>
      <div className={styles.date}>
        <p className={styles.dateTitle}>Date</p>

        {/* <p className={styles.dateFormat}>24 March 2020</p> */}
        <DateInput />
      </div>
      <div className={styles.room}>
        <p className={styles.roomTitle}>Property room</p>
        <p className={styles.roomSubTitle}>Bedroom</p>
        <div className={styles.roomOptions} onChange={handleBedroom}>
          <Room id="bedroom1" value="1" room={bedroom} />
          <Room id="bedroom2" value="2" room={bedroom} />
          <Room id="bedroom3" value="3" room={bedroom} />
          <Room id="bedroom4" value="4" room={bedroom} />
          <Room id="bedroom5plus" value="5+" room={bedroom} />
        </div>

        <p className={styles.roomSubTitle}>Bathroom</p>
        <div className={styles.roomOptions} onChange={handleBathroom}>
          <Room id="bathroom1" value="1" room={bathroom} />
          <Room id="bathroom2" value="2" room={bathroom} />
          <Room id="bathroom3" value="3" room={bathroom} />
          <Room id="bathroom4" value="4" room={bathroom} />
          <Room id="bathroom5plus" value="5+" room={bathroom} />
        </div>
      </div>

      <div className={styles.amenities}>
        <p className={styles.amenitiesTitle}>Amenities</p>
        <div className={styles.amenitiesOptions} onChange={handleAmenities}>
          {amenities.map((amenity, index) => {
            return (
              <AmenitiesOption
                key={index}
                value={amenity.title}
                children={amenity.title}
                isChecked={amenity.value}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.budget}>
        <p className={styles.budgetTitle}>Budget</p>
        <form className={styles.budgetForm} action="">
          <span>Less than IDR.</span>
          <input type="number" min="0" step="any" />
        </form>
      </div>

      <div className={styles.apply}>
        <button className={styles.applyButton}>APPLY</button>
      </div>
    </div>
  );
};

const Duration = ({ id, value, duration }) => {
  return (
    <div
      className={styles.durationOption}
      style={
        duration === value ? { backgroundColor: "#5a57ab", color: "white" } : {}
      }
    >
      <input
        className={styles.durationRadio}
        type="radio"
        id={id}
        name="duration"
        value={value}
      />
      <label className={styles.durationLabel} htmlFor={id}>
        {value}
      </label>
    </div>
  );
};

const Room = ({ id, value, room }) => {
  return (
    <div
      className={styles.roomOption}
      style={
        room === value ? { backgroundColor: "#5a57ab", color: "white" } : {}
      }
    >
      <input
        className={styles.roomRadio}
        type="radio"
        id={id}
        name="room"
        value={value}
      />
      <label className={styles.roomLabel} htmlFor={id}>
        {value}
      </label>
    </div>
  );
};

const AmenitiesOption = ({ value, children, isChecked }) => {
  return (
    <div className={styles.amenitiesOption}>
      <label className={styles.amenitiesLabel} htmlFor={value}>
        {children}
      </label>
      <input
        className={styles.amenitiesCheckBox}
        type="checkbox"
        value={value}
        id={value}
        checked={isChecked}
        onChange={() => {}}
      />
    </div>
  );
};

export default Sidebar;
