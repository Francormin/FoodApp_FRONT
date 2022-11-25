import React from "react";
import { Link } from "react-router-dom";
import img from "../assets/not_found_background.webp";

export default function NotFound({ error }) {
  if (error === false) return null;

  return (
    <div
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        height: "100vh",
        backgroundPosition: "center"
      }}
    >
      <h2
        style={{
          color: "white",
          fontSize: "28px",
          padding: "8px"
        }}
      >
        Page Not Found
      </h2>

      <p
        style={{
          color: "white",
          fontStyle: "italic"
        }}
      >
        {error === "idNotFound" ? "There is no recipe with that id" : null}
      </p>

      <Link
        to="/home"
        style={{
          textDecoration: "none",
          color: "white",
          border: "1px solid white",
          borderRadius: "10px",
          padding: "5px"
        }}
      >
        Go back to Home Page
      </Link>
    </div>
  );
}
