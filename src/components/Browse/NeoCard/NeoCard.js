import React, { useEffect } from "react";
import { IconContext } from "react-icons";
import { firebase } from "./../../../lib/firebase";
import { BsHeartFill } from "react-icons/bs";

import styles from "./NeoCard.module.css";

const sizeComparison = {
  2: "human",
  6: "human-3",
  10: "human-5",
  15: "bus",
  45: "bus-3",
  75: "bus-5",
  80: "plane",
  240: "plane-3",
  325: "eiffel-tower",
  350: "plane-5",
  445: "empire-state-building",
  975: "eiffel-tower-3",
  1335: "empire-state-building-3",
  1960: "eiffel-tower-6",
  2670: "empire-state-building-6",
};

let like = [];
const sizes = Object.keys(sizeComparison);

const thumbnail = (diameterM) => {
  let largest = 0;
  for (let i = 1; i < sizes.length; i++) {
    if (diameterM > sizes[i]) largest = i;
  }
  return sizeComparison[sizes[largest]];
};

function NeoCard({ neo, handleClick, selectedNeoCard, user }) {
  var db = firebase.firestore();

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("like")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            doc.data();
            like.push(doc.id);
          });
        });
    }
  });

  let neoInfo = neo;
  let estDiameter = neoInfo ? neoInfo.estimated_diameter : null;
  let dm = estDiameter ? estDiameter.meters : null;
  let df = estDiameter ? estDiameter.feet : null;
  let diameterM =
    (dm ? dm.estimated_diameter_max : 0 + dm ? dm.estimated_diameter_min : 1) /
    2;
  let diameterF =
    (df ? df.estimated_diameter_max : 0 + df ? df.estimated_diameter_min : 1) /
    2;

  const neoClick = () => {
    handleClick(neoInfo);
  };

  const handleLike = () => {
    let id = neo.id;

    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("like")
        .doc(id)
        .set({
          id,
        })
        .then(function () {
          console.log("Document successfully written!");
        });
    }
  };

  return (
    <div
      onClick={neoClick}
      className={`${styles.container}  ${
        selectedNeoCard.id === neo.id && styles.active
      }`}
    >
      <div className={styles.col1}>
        <div className={styles.image}>
          <img
            src={`/assets/images/asteroid-${thumbnail(diameterM)}-192.png`}
            alt="Asteroid with outline of human overlay"
          />
        </div>
        {user && (
          <div onClick={handleLike} className={styles.heart}>
            <IconContext.Provider
              value={{
                color: `${like.includes(neo.id) ? "red" : "white"}`,
                className: "global-class-name",
              }}
            >
              <div>
                <BsHeartFill />
              </div>
            </IconContext.Provider>
          </div>
        )}
      </div>

      <div className={styles.col2}>
        <div className={styles.nameId}>
          <div>
            <strong>Name:</strong> {neo.name}
          </div>
          <div>
            <strong>ID:</strong> {neo.id}
          </div>
        </div>
        <div className={styles.diameter}>
          <div>
            <strong>Estimated Diameter:</strong>
            {diameterM.toFixed(2)}m | {diameterF.toFixed(2)}ft
          </div>
          <div>
            <strong>Potential Hazard:</strong>{" "}
            {neoInfo.is_potentially_hazardous_asteroid ? "Yes" : "No"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NeoCard;
