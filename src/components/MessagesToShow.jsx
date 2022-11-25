import React from "react";
import "./MessagesToShow.css";

export default function MessagesToShow({ message, onClose }) {
  if (message === false) return null;

  return (
    <div className="containerOne">
      <div className="containerTwo">
        <div className="containerThree">
          <span>{message === "titleNotFound" ? "There is no recipe with that title" : null}</span>
          <span>{message === "recipeCreated" ? "The recipe has been successfully created" : null}</span>
          <span>
            {message === "dietAlreadySelected" ? "The diet is already selected. Please choose another one" : null}
          </span>
          <span>{message === "noLettersSearch" ? "Please type a recipe title" : null}</span>
          <span>{message === "numbersSearch" ? "Numbers are not allowed" : null}</span>
          <span>{message === "spacesAround" ? "Spaces are not allowed at the beggining or at the end" : null}</span>
          <span>{message === "specialCharactersSearch" ? "Special characters are not allowed" : null}</span>
          <span>{message === "noRecipesFound" ? "There is no recipe with that diet type" : null}</span>
        </div>
        <div className="buttonDiv">
          <button type="button" onClick={() => onClose()} className="btnClose">
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
