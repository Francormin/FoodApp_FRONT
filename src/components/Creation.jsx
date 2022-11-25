import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDiets, postRecipe } from "../redux/actions";
import "./Creation.css";
import gif from "../assets/loading_gif.gif";
import MessagesToShow from "./MessagesToShow";

export default function Creation() {
  const dispatch = useDispatch();

  const diets = useSelector(state => state.diets);

  const [recipe, setRecipe] = useState({
    img: "",
    title: "",
    summary: "",
    healthScore: 50,
    steps: "",
    diets: []
  });

  const [selectedDiets, setSelectedDiets] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState({});
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(true);

  function validation(input) {
    const errors = {};

    if ((input.img && !Number.isNaN(parseInt(input.img))) || (input.img && !/^\S*$/.test(input.img))) {
      errors.img = (
        <p>
          The <strong>img</strong> <u>must be</u> a string and <u>cannot contain</u> spaces at all
        </p>
      );
      setDisabled(true);
    } else if ((!/^http:/.test(input.img) && !/^https:/.test(input.img)) || !/.jpg$/.test(input.img)) {
      errors.img = (
        <p>
          The <strong>img</strong> <u>must be</u> a valid URL (starting with `http:` or `https:` and ending with `.jpg`)
        </p>
      );
      setDisabled(true);
    } else if (!input.title || !Number.isNaN(parseInt(input.title))) {
      errors.title = (
        <p>
          The <strong>title</strong> is <u>required</u> and <u>must be</u> a string
        </p>
      );
      setDisabled(true);
    } else if (!/^[^\s]+(\s+[^\s]+)*$/.test(input.title)) {
      errors.title = (
        <p>
          The <strong>title</strong> is <u>required</u> and <u>cannot contain</u> spaces at the beggining or at the end
        </p>
      );
      setDisabled(true);
    } else if (!/^[A-Za-z0-9 ]+$/.test(input.title)) {
      errors.title = (
        <p>
          The <strong>title</strong> <u>cannot contain</u> special characters
        </p>
      );
      setDisabled(true);
    } else if (!input.summary || !Number.isNaN(parseInt(input.summary))) {
      errors.summary = (
        <p>
          The <strong>summary</strong> is <u>required</u> and <u>must be</u> a string
        </p>
      );
      setDisabled(true);
    } else if (!input.summary || !/^\S+(?: \S+)*$/.test(input.summary)) {
      errors.summary = (
        <p>
          The <strong>summary</strong> is <u>required</u> and <u>cannot contain</u> spaces at the beggining or at the
          end
        </p>
      );
      setDisabled(true);
    } else if (!input.healthScore || !/^[1-9][0-9]?$|^100$/.test(input.healthScore)) {
      errors.healthScore = (
        <p>
          The <strong>health score</strong> is <u>required</u> and <u>must be</u> a number between 1 and 100
        </p>
      );
      setDisabled(true);
    } else if (input.steps.length && !/^[^\s]+(\s+[^\s]+)*$/.test(input.steps)) {
      errors.steps = (
        <p>
          The <strong>steps</strong> <u>must be</u> a string and <u>cannot contain</u> spaces at the beggining or at the
          end
        </p>
      );
      setDisabled(true);
    } else if (!input.diets.length) {
      errors.diets = (
        <p>
          At least one <strong>diet type</strong> <u>must be</u> selected
        </p>
      );
      setDisabled(true);
    } else {
      setDisabled(false);
    }

    return errors;
  }

  function handleOnChange(e) {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value
    });

    if (
      e.target.name === "img" ||
      e.target.name === "title" ||
      e.target.name === "summary" ||
      e.target.name === "steps"
    ) {
      setRecipe({
        ...recipe,
        [e.target.name]: e.target.value.toLowerCase()
      });
    }

    if (e.target.name === "healthScore") {
      setRecipe({
        ...recipe,
        [e.target.name]: parseInt(e.target.value)
      });
    }

    setError(
      validation({
        ...recipe,
        [e.target.name]: e.target.value
      })
    );
  }

  function handleOnChangeDiet(e) {
    const selectedDiet = diets.find(diet => diet.name === e.target.value);

    if (!selectedDiets.find(diet => diet.id === selectedDiet.id)) {
      const dietsId = [...recipe.diets, selectedDiet.id];

      setRecipe({
        ...recipe,
        diets: dietsId
      });

      setError(
        validation({
          ...recipe,
          diets: dietsId
        })
      );

      setSelectedDiets([...selectedDiets, selectedDiet]);
      document.getElementById("diets").selectedIndex = "";
    } else {
      setMessage("dietAlreadySelected");
      document.getElementById("diets").selectedIndex = "";
    }
  }

  function handleOnCloseDiet(id) {
    const selectedDietsRemaining = selectedDiets.filter(diet => diet.id !== id);
    const dietsRemaining = recipe.diets.filter(dietId => dietId !== id);

    setRecipe({
      ...recipe,
      diets: dietsRemaining
    });

    setError(
      validation({
        ...recipe,
        diets: dietsRemaining
      })
    );

    setSelectedDiets(selectedDietsRemaining);
    document.getElementById("diets").selectedIndex = "";
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(postRecipe(recipe));

    setRecipe({
      image: "",
      title: "",
      summary: "",
      healthScore: 50,
      steps: "",
      diets: []
    });

    setSelectedDiets([]);
    setDisabled(true);
    setError({});
    setMessage("recipeCreated");
    document.getElementById("diets").selectedIndex = "";
  }

  useEffect(() => {
    dispatch(getDiets());

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [dispatch]);

  return (
    <div className="Creation">
      {loading === false ? (
        <>
          <br />
          <h1>Create Your Own Recipe</h1>

          <form onSubmit={e => handleOnSubmit(e)} className="Form">
            <label htmlFor="img">
              Image:{" "}
              <input
                type="text"
                id="img"
                name="img"
                value={recipe.img}
                onChange={e => handleOnChange(e)}
                className="imageLabel"
              />
            </label>

            <div visibility={error.img ? "visible" : "hidden"} className={error.img ? "error" : null}>
              {error.img}
            </div>

            <label htmlFor="title">
              Title:{" "}
              <input
                type="text"
                id="title"
                name="title"
                value={recipe.title}
                onChange={e => handleOnChange(e)}
                required
              />
            </label>

            <div visibility={error.title ? "visible" : "hidden"} className={error.title ? "error" : null}>
              {error.title}
            </div>

            <label htmlFor="summary">
              Summary:{" "}
              <input
                type="text"
                id="summary"
                name="summary"
                value={recipe.summary}
                onChange={e => handleOnChange(e)}
                required
              />
            </label>

            <div visibility={error.summary ? "visible" : "hidden"} className={error.summary ? "error" : null}>
              {error.summary}
            </div>

            <label htmlFor="healthScore">
              Health Score:{" "}
              <input
                type="number"
                min={1}
                max={100}
                id="healthScore"
                name="healthScore"
                value={recipe.healthScore}
                onChange={e => handleOnChange(e)}
              />
            </label>

            <div visibility={error.healthScore ? "visible" : "hidden"} className={error.healthScore ? "error" : null}>
              {error.healthScore}
            </div>

            <label htmlFor="steps">
              Steps:{" "}
              <input type="text" id="steps" name="steps" value={recipe.steps} onChange={e => handleOnChange(e)} />
            </label>

            <div visibility={error.steps ? "visible" : "hidden"} className={error.steps ? "error" : null}>
              {error.steps}
            </div>

            <label htmlFor="diets">
              Diet Type:{" "}
              <select id="diets" name="diets" onChange={e => handleOnChangeDiet(e)}>
                <option hidden value="">
                  Choose any Diet Type
                </option>
                {diets.length &&
                  diets?.map(diet => (
                    <option key={diet.id} value={diet.name}>
                      {diet.name[0].toUpperCase() + diet.name.slice(1)}
                    </option>
                  ))}
              </select>
            </label>

            <div visibility={error.diets ? "visible" : "hidden"} className={error.diets ? "error" : null}>
              {error.diets}
            </div>

            {selectedDiets.length ? (
              <>
                <p className="dietsSelected">
                  <u>Diets selected:</u>
                </p>
                {selectedDiets.map(diet => (
                  <div key={diet.id} className="diets">
                    <button type="button" onClick={() => handleOnCloseDiet(diet.id)} className="closeButton">
                      x
                    </button>

                    <span> {diet.name[0].toUpperCase() + diet.name.slice(1)}</span>
                  </div>
                ))}
              </>
            ) : null}

            <input type="submit" value="CREATE" disabled={disabled} className="submitButton" />
          </form>

          <Link to="/home">
            <button type="button" className="btnBack">
              <strong>Go back to Home Page</strong>
            </button>
          </Link>

          <MessagesToShow message={message} onClose={() => setMessage(false)} />
        </>
      ) : (
        <img src={gif} alt="loading_gif" className="loadingGif" />
      )}
    </div>
  );
}
