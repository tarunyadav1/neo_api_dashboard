import React from "react";
import CloseApproachData from "./CloseApproachData/CloseApproachData";
import SelectDate from "./../DatePicker/DatePicker";

import styles from "./NeoData.module.css";

const Orbital = ({ name, value }) => {
  return (
    <div className={styles.singleData}>
      <div>
        <strong>{name}</strong>
      </div>
      <div>{value}</div>
    </div>
  );
};

function NeoData({
  selectedNeoCard,
  setDatepicker,
  datepicker,
  setNeoData,
  setIsLoading,
}) {
  let od = selectedNeoCard ? selectedNeoCard.orbital_data : null;
  let orbitID = od ? od.orbit_id : null;
  let firstObserveDate = od ? od.first_observation_date : null;
  let lastObserveDate = od ? od.last_observation_date : null;
  let orbitDeterminationDate = od ? od.orbit_determination_date : null;
  let observesUsed = od ? od.observations_used : null;
  let dataArcInDays = od ? od.data_arc_in_days : null;
  let orbitUncertainty = od ? od.orbit_uncertainty : null;
  let minOrbitIntersect = od ? od.minimum_orbit_intersection : null;
  let jupiterTissInvar = od ? od.jupiter_tisserand_invariant : null;
  let epochOsc = od ? od.epoch_osculation : null;
  let eccentricity = od ? od.eccentricity : null;
  let semiMajorAxis = od ? od.semi_major_axis : null;
  let inclination = od ? od.inclination : null;
  let ascNodeLong = od ? od.ascending_node_longitude : null;
  let orbitPeriod = od ? od.orbital_period : null;
  let periDist = od ? od.perihelion_distance : null;
  let periArg = od ? od.perihelion_argument : null;
  let apDist = od ? od.aphelion_distance : null;
  let periTime = od ? od.perihelion_time : null;
  let meanAnomaly = od ? od.mean_anomaly : null;
  let meanMotion = od ? od.mean_motion : null;
  let equinox = od ? od.equinox : null;
  let orbitClassType = od
    ? od.orbit_class
      ? od.orbit_class.orbit_class_type
      : null
    : null;
  let orbitClassRange = od
    ? od.orbit_class
      ? od.orbit_class.orbit_class_range
      : null
    : null;
  let orbitClassDescription = od
    ? od.orbit_class
      ? od.orbit_class.orbit_class_description
      : null
    : null;

  if (datepicker) {
    return (
      <SelectDate
        setDatepicker={setDatepicker}
        setNeoData={setNeoData}
        setIsLoading={setIsLoading}
      />
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Near Earth Object (NEO) Data</h1>
      </div>

      <div className={styles.orbitalData}>
        <div className={styles.orbitalHeading}>Orbital Data</div>
        <div className={styles.displayData}>
          <Orbital name="Orbit ID:" value={orbitID} />
          <Orbital name="First Observation Date:" value={firstObserveDate} />
          <Orbital name="Last Observation Date:" value={lastObserveDate} />
          <Orbital
            name="Orbit Determination Date:"
            value={orbitDeterminationDate}
          />
          <Orbital name="Data Arc in Days: " value={dataArcInDays} />
          <Orbital name="Observations Used: " value={observesUsed} />
          <Orbital name="Orbit Uncertainty:" value={orbitUncertainty} />
          <Orbital
            name="Minimum Orbit Intersection:"
            value={parseFloat(minOrbitIntersect).toLocaleString()}
          />
          <Orbital
            name="Jupiter Tisserand Invariant:"
            value={parseFloat(jupiterTissInvar).toLocaleString()}
          />
          <Orbital
            name="Epoch Osculation:"
            value={parseFloat(epochOsc).toLocaleString()}
          />
          <Orbital
            name="Eccentricity:"
            value={parseFloat(eccentricity).toLocaleString()}
          />
          <Orbital
            name="Semi Major Axis:"
            value={parseFloat(semiMajorAxis).toLocaleString()}
          />
          <Orbital
            name="Inclination:"
            value={parseFloat(inclination).toLocaleString()}
          />
          <Orbital
            name="Ascending Node Longitude:"
            value={parseFloat(ascNodeLong).toLocaleString()}
          />
          <Orbital
            name="Orbital Period:"
            value={parseFloat(orbitPeriod).toLocaleString()}
          />
          <Orbital
            name="Perihelion Distance:"
            value={parseFloat(periDist).toLocaleString()}
          />
          <Orbital
            name="Aphelion Distance:"
            value={parseFloat(periArg).toLocaleString()}
          />
          <Orbital
            name="Perihelion Argument:"
            value={parseFloat(apDist).toLocaleString()}
          />
          <Orbital
            name="Perihelion Time:"
            value={parseFloat(periTime).toLocaleString()}
          />
          <Orbital
            name="Mean Anomaly:"
            value={parseFloat(meanAnomaly).toLocaleString()}
          />
          <Orbital
            name="Mean Motion:"
            value={parseFloat(meanMotion).toLocaleString()}
          />
          <Orbital name="Equinox:" value={equinox} />
          <Orbital name="Orbit Class Type:" value={orbitClassType} />
          <Orbital name="Orbit Class Range: " value={orbitClassRange} />
          <Orbital
            name="Orbit Class Description: "
            value={orbitClassDescription}
          />
        </div>
      </div>
      <CloseApproachData selectedNeoCard={selectedNeoCard} />
    </div>
  );
}

export default NeoData;
