import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import "./movieDetails.css";

const MovieDetails = () => {
  let location = useLocation();
  const { original_title, overview, poster_path } = location?.state?.param || {};
  console.log("line 8", location?.state?.param);

  return (
    <div style={{ marginLeft: "40px", marginTop: "72px" }}>
      <h1 className="headerText">Movie Details</h1>
      <h2 className="headerText">{original_title}</h2>
      <div className="card">
        <div style={{ display: "flex", }}>
        <img
          className="img"
          src={`https://media.themoviedb.org/t/p/w440_and_h660_face${poster_path}`}
          alt="Logo"
        />
        <div style={{ display: "flex", flexDirection: "column"}}>
        <h2 className="headerText">Overview</h2>
        <p>{overview}</p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
