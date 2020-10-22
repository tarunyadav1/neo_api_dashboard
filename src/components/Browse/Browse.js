import React, { useEffect, useState } from "react";
import NeoCard from "./NeoCard/NeoCard";
import Spinner from "./../../components/Spinner/Spinner";
import { firebase } from "./../../lib/firebase";

import styles from "./Browse.module.css";

function Browse(props) {
  const [user, setUser] = useState({});

  useEffect(() => {
    var user = firebase.auth().currentUser;
    setUser(user);
  });
  const {
    neodata,
    isLoading,
    handleClick,
    selectedNeoCard,
    error,
    setDatepicker,
    datepicker,
  } = props;

  const handleDatePicker = () => {
    setDatepicker(!datepicker);
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.heading}>Browse</div>

        <div className={styles.spinner}>
          <Spinner />
        </div>
      </div>
    );
  }

  if (!Array.isArray(neodata)) {
    return (
      <div className={styles.container}>
        <div className={styles.heading}>
          <div>Browse</div>
          <div onClick={handleDatePicker} className={styles.searchDate}>
            Search by Date
          </div>
        </div>
        {error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <NeoCard
            selectedNeoCard={selectedNeoCard}
            handleClick={handleClick}
            neo={neodata}
          />
        )}
        <div style={{ paddingTop: "0.7rem" }}></div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <div>Browse</div>
        <div onClick={handleDatePicker} className={styles.searchDate}>
          Search by Date
        </div>
      </div>
      {Array.isArray(neodata) && neodata.length ? (
        neodata.map((neo) => {
          return (
            <NeoCard
              selectedNeoCard={selectedNeoCard}
              handleClick={handleClick}
              neo={neo}
              user={user}
            />
          );
        })
      ) : (
        <h2>There are no Near-Earth Objects available at the moment</h2>
      )}
      <div style={{ paddingTop: "0.7rem" }}></div>
    </div>
  );
}

export default Browse;
