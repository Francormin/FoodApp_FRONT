import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { emptyErrorState, emptyRecipeDetails, getRecipeDetails } from "../redux/actions";
import "./Details.css";
import gif from "../assets/loading_gif.gif";
import NotFound from "./NotFound";

export default function Details() {
  const dispatch = useDispatch();
  const { recipeId } = useParams();

  const recipeDetails = useSelector(state => state.recipeDetails);
  const errorMessage = useSelector(state => state.errorMessage);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    dispatch(getRecipeDetails(recipeId));

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      dispatch(emptyRecipeDetails());
    };
  }, [dispatch, recipeId]);

  useEffect(() => {
    if (errorMessage.name === "recipeDetails") {
      setError("idNotFound");
    }

    return () => {
      dispatch(emptyErrorState());
    };
  }, [dispatch, errorMessage.name]);

  return (
    <>
      {loading ? (
        <div className="gifContainer">
          <img src={gif} alt="loading_gif" />
        </div>
      ) : recipeDetails.id ? (
        <div className="detailsCard">
          <div className="Details">
            <div className="firstContainer">
              <div className="firstContainerChild1">
                <img src={recipeDetails.img || null} alt="recipe_img" className="recipe_img" />
              </div>

              <div className="firstContainerChild2">
                <h3>Recipe&apos;s Title:</h3>
                <p className="recipe_title">
                  {recipeDetails.title && recipeDetails.title[0].toUpperCase() + recipeDetails.title.slice(1)}
                </p>

                <h3>Recipe&apos;s Health Score:</h3>
                <p className="recipe_score">{recipeDetails.healthScore}</p>
              </div>
            </div>

            <h3>Recipe&apos;s Diet Types:</h3>
            <p className="dietTypes">
              {recipeDetails.id && recipeDetails.id.length > 10
                ? recipeDetails.diets.map(diet => (
                    <li key={diet.id}>{diet.name[0].toUpperCase() + diet.name.slice(1)}</li>
                  ))
                : recipeDetails.diets?.map((diet, i) => <li key={i}>{diet[0].toUpperCase() + diet.slice(1)}</li>)}
            </p>

            <h3>Recipe&apos;s Summary:</h3>
            <p className="bigText">{recipeDetails.summary[0].toUpperCase() + recipeDetails.summary.slice(1)}</p>

            <h3>Recipe&apos;s Steps: </h3>
            <div className="stepsDiv">
              {!recipeDetails.steps ? <p className="noSteps">This recipe has no steps to show.</p> : null}
            </div>

            <div className="stepsDiv">
              {recipeDetails.id.length > 10 ? (
                recipeDetails.steps ? (
                  <p className="bigText">{recipeDetails.steps[0].toUpperCase() + recipeDetails.steps.slice(1)}</p>
                ) : null
              ) : (
                recipeDetails.steps?.map(step => (
                  <p key={step.number} className="bigText">
                    <strong>{step.number} -</strong> {step.step}
                  </p>
                ))
              )}
            </div>
          </div>

          <div className="Button">
            <Link to="/home">
              <button type="button">
                <strong>Go back to Home Page</strong>
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <NotFound error={error} />
      )}
    </>
  );
}
