import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Browse from "./../../components/Browse/Browse";
import NeoData from "./../../components/NeoData/NeoData";
import { firebase } from "./../../lib/firebase";

import styles from "./Dashboard.module.css";

function Dashboard() {
  const [neodata, setNeoData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNeoCard, setSelectedNeoCar] = useState([]);
  const [neoById, setNeoById] = useState("");
  const [neoByIdData, setNeoByIdData] = useState([]);
  const [error, setError] = useState("");
  const [datepicker, setDatepicker] = useState(false);

  var user = firebase.auth().currentUser;

  const handleClick = (neo) => {
    setSelectedNeoCar(neo);
  };

  const handleChange = (e) => {
    setNeoById(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getAsteroidById(neoById);
  };

  const getAsteroidById = (neoById) => {
    setIsLoading(true);
    fetch(
      `https://api.nasa.gov/neo/rest/v1/neo/${neoById}?api_key=${process.env.REACT_APP_API}`
    )
      .then((response) => response.json())
      .then((jsondata) => {
        setNeoData(jsondata);
        setSelectedNeoCar(jsondata);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("ID Doesn't exit, Please enter correct ID");
        setNeoData({});
        setSelectedNeoCar([]);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetch(
      `https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=10&api_key=${process.env.REACT_APP_API}`
    )
      .then((response) => response.json())
      .then((data) => {
        setNeoData(data.near_earth_objects);
        setIsLoading(false);
        setSelectedNeoCar(data.near_earth_objects[0]);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.row1}>
        <div className={styles.logo}>
          <a href="/">
            <h1>NEO Dashboard</h1>
          </a>
        </div>
        <div className={styles.search}>
          <form onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              placeholder="Search by ID"
              className={styles.searchInput}
              type="text"
              value={neoById}
            />
          </form>
        </div>

        {!user && (
          <div className={styles.navitems}>
            <div className={styles.item}>
              <Link style={{ color: "white" }} to="/login">
                Login
              </Link>
            </div>
            <div className={styles.item}>
              <Link style={{ color: "white" }} to="/signup">
                {" "}
                Signup
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className={styles.row2}>
        <Browse
          handleClick={handleClick}
          neodata={neodata}
          isLoading={isLoading}
          selectedNeoCard={selectedNeoCard}
          datepicker={datepicker}
          setDatepicker={setDatepicker}
          error={error}
        />
        <NeoData
          datepicker={datepicker}
          setDatepicker={setDatepicker}
          selectedNeoCard={selectedNeoCard}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setNeoData={setNeoData}
        />
      </div>
    </div>
  );
}

export default Dashboard;
