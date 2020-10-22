import React from "react";

import styles from "./CloseApproachData.module.css";

function closeApproach(neoInfo) {
  let templateList = [];

  neoInfo.close_approach_data.forEach((cad, index) => {
    let relVel = cad ? cad.relative_velocity : null;
    let missDist = cad ? cad.miss_distance : null;

    templateList.push(template(cad, relVel, missDist));
  });

  return templateList;
}

const template = (cad, relVel, missDist) => {
  return (
    <>
      <ul>
        <li key="1">
          <div className={styles.name}>
            <strong>Close Approach Date Full:</strong>
          </div>
          <div className={styles.value}>{cad.close_approach_date_full}</div>
        </li>
        <li key="2">
          <div>
            <strong>Relative Velocity: </strong>
          </div>
          <div>
            {parseFloat(relVel.kilometers_per_second).toLocaleString()} km/s |{" "}
            {parseFloat(relVel.kilometers_per_hour).toLocaleString()} km/h |{" "}
            {parseFloat(relVel.miles_per_hour).toLocaleString()} mph
          </div>
        </li>
        <li key="3">
          <div>
            <strong>Miss Distance: </strong>
          </div>
          <div>
            {parseFloat(missDist.astronomical).toLocaleString()} AU |{" "}
            {parseFloat(missDist.lunar).toLocaleString()} LD |{" "}
            {parseFloat(missDist.kilometers).toLocaleString()} km |{" "}
            {parseFloat(missDist.miles).toLocaleString()} mi
          </div>
        </li>
        <li key="4">
          <div>
            <strong>Orbiting Body:</strong>
          </div>
          <div>{cad.orbiting_body}</div>
        </li>
      </ul>
      <br />
    </>
  );
};

function CloseApproachData({ selectedNeoCard }) {
  return (
    <div className={styles.container}>
      <div className={styles.closeHeading}>Close Approach Data</div>

      {selectedNeoCard.close_approach_data &&
      Object.keys(selectedNeoCard.close_approach_data).length > 0 ? (
        <div className={styles.displayData}>
          {closeApproach(selectedNeoCard)}
        </div>
      ) : (
        <p>There is no close approach data available</p>
      )}
    </div>
  );
}

export default CloseApproachData;
