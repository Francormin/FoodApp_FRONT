import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ id, title, img, diets }) {
  return (
    <div key={id} className="Card">
      <h2>Recipe&apos;s Title:</h2>
      <p>
        <strong>{title && title[0].toUpperCase() + title.slice(1)}</strong>
      </p>

      <Link to={`/recipes/${id}`}>
        <img src={img} alt="recipe_img" />
      </Link>

      <h3>Recipe&apos;s Diet Types:</h3>
      {id?.length > 10
        ? diets?.map(diet => <li key={diet.id}>{diet.name[0].toUpperCase() + diet.name.slice(1)}</li>)
        : diets?.map((diet, i) => <li key={i}>{diet[0].toUpperCase() + diet.slice(1)}</li>)}
    </div>
  );
}
