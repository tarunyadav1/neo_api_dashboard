import React, { useState } from "react";

import styles from "./DatePicker.module.css";

function SelectDate({ setNeoData, setIsLoading, setDatepicker }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const handleDate = () => {
    console.log(startDate);
    var diff = Math.abs(new Date(startDate) - new Date(endDate));
    if (diff > 604800000) {
      setError("The max range in one query is 7 days ");
      return;
    }

    setError("");
    setIsLoading(true);

    fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&detailed=true&api_key=${process.env.REACT_APP_API}`
    )
      .then((response) => response.json())
      .then((data) => {
        setNeoData(data.near_earth_objects[startDate]);
        setIsLoading(false);
        setDatepicker(false);
      });
  };

  const handleChange = (event) => {
    if (event.target.name === "startDate") {
      setError("");
      setStartDate(event.target.value);
    }
    if (event.target.name === "endDate") {
      setEndDate(event.target.value);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Enter Dates</h1>
      </div>
      <div className={styles.Date}>
        <label> Start Date: </label>
        <input
          name="startDate"
          onChange={handleChange}
          value={startDate}
          type="date"
        ></input>
      </div>
      <div className={styles.Date}>
        <label> End Date: </label>
        <input
          name="endDate"
          onChange={handleChange}
          value={endDate}
          type="date"
        ></input>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.button}>
        <button onClick={handleDate}>Find</button>
      </div>
    </div>
  );
}

export default SelectDate;
