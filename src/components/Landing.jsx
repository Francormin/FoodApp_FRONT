import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  return (
    <div className="container">
      <h3>
        Welcome to the <u>Food Recipes</u> APP!
      </h3>

      <Link to="/home">
        <button type="button" className="btn">
          <strong>Go to Home Page</strong>
        </button>
      </Link>
    </div>
  );
}
