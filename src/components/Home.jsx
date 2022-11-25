import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { emptyErrorState, filterRecipes, getDiets, getRecipes, orderRecipes, searchRecipes } from "../redux/actions";
import gif from "../assets/loading_gif.gif";
import Card from "./Card";
import "./Home.css";
import MessagesToShow from "./MessagesToShow";

//    ----------------------------------------    Functional Component    ----------------------------------------    //

export default function Home({ loading, setLoading, currentPage, setCurrentPage, postsPerPage }) {
  const dispatch = useDispatch();

  const recipes = useSelector(state => state.recipes);
  const copyRecipes = useSelector(state => state.recipesCopy);
  const diets = useSelector(state => state.diets);
  const errorMessage = useSelector(state => state.errorMessage);

  const [recipeTitleSearch, setRecipeTitleSearch] = useState("");
  const [message, setMessage] = useState(false);

  // ------------------------------------------------------------------------------------

  //    ↧    ↧    ↧    ↧    ↧    ↧    ↧    PAGINATION    ↧    ↧    ↧    ↧    ↧    ↧    ↧

  const indexOfLastPost = currentPage * postsPerPage;

  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = recipes.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumbers = [];

  const totalLength = recipes.length;

  for (let i = 1; i <= Math.ceil(totalLength / postsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  function setPage(pageNumber) {
    setCurrentPage(pageNumber);
  }

  //    ↥    ↥    ↥    ↥    ↥    ↥    ↥    PAGINATION    ↥    ↥    ↥    ↥    ↥    ↥    ↥

  // ------------------------------------------------------------------------------------

  //    ↧    ↧    ↧    ↧    ↧    ↧    ↧    SEARCHING    ↧    ↧    ↧    ↧    ↧    ↧    ↧

  function handleRecipeTitleChange(e) {
    if (!/^[^0-9]+$/.test(e.target.value)) {
      setMessage("numbersSearch");
      setRecipeTitleSearch("");
      return;
    }

    if (!/^[^\s]+(\s+[^\s]+)*$/.test(e.target.value)) {
      setMessage("spacesAround");
      setRecipeTitleSearch("");
      return;
    }

    if (/[^a-zA-Z0-9]/.test(e.target.value)) {
      setMessage("specialCharactersSearch");
      setRecipeTitleSearch("");
      return;
    }
    setRecipeTitleSearch(e.target.value);
  }

  function handleRecipeTitleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    if (!recipeTitleSearch.length) {
      setMessage("noLettersSearch");
      setRecipeTitleSearch("");
    }

    setCurrentPage(1);
    document.getElementById("recipesOrdering").selectedIndex = 0;
    document.getElementById("recipesFiltering").selectedIndex = 0;

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    return dispatch(searchRecipes(recipeTitleSearch));
  }

  //    ↥    ↥    ↥    ↥    ↥    ↥    ↥    SEARCHING    ↥    ↥    ↥    ↥    ↥    ↥    ↥

  // ------------------------------------------------------------------------------------

  //    ↧    ↧    ↧    ↧    ↧    ↧    ↧    ORDERING    ↧    ↧    ↧    ↧    ↧    ↧    ↧

  function order(value) {
    const recipesCopy = [...recipes];

    if (value === "AZ") {
      recipesCopy.sort((a, b) => {
        const recipeATitle = a.title.toLowerCase().localeCompare(b.title);
        const recipeBTitle = b.title.toLowerCase().localeCompare(a.title);

        if (recipeATitle < recipeBTitle) return -1;
        if (recipeATitle > recipeBTitle) return 1;
        return 0;
      });
    }

    if (value === "ZA") {
      recipesCopy.sort((a, b) => {
        const recipeATitle = a.title.toLowerCase().localeCompare(b.title);
        const recipeBTitle = b.title.toLowerCase().localeCompare(a.title);

        if (recipeATitle > recipeBTitle) return -1;
        if (recipeATitle < recipeBTitle) return 1;
        return 0;
      });
    }

    if (value === "HS-ASC") {
      recipesCopy.sort((a, b) => {
        const recipeAHs = a.healthScore;
        const recipeBHs = b.healthScore;

        if (recipeAHs < recipeBHs) return -1;
        if (recipeAHs > recipeBHs) return 1;
        return 0;
      });
    }

    if (value === "HS-DESC") {
      recipesCopy.sort((a, b) => {
        const recipeAHs = a.healthScore;
        const recipeBHs = b.healthScore;

        if (recipeAHs > recipeBHs) return -1;
        if (recipeAHs < recipeBHs) return 1;
        return 0;
      });
    }

    setCurrentPage(1);
    return dispatch(orderRecipes(recipesCopy));
  }

  //    ↥    ↥    ↥    ↥    ↥    ↥    ↥    ORDERING    ↥    ↥    ↥    ↥    ↥    ↥    ↥

  // ------------------------------------------------------------------------------------

  //    ↧    ↧    ↧    ↧    ↧    ↧    ↧    FILTERING    ↧    ↧    ↧    ↧    ↧    ↧    ↧

  function filter(value) {
    const recipesToFilter = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const recipe of copyRecipes) {
      if (recipe.diets.includes(value)) {
        recipesToFilter.push(recipe);
      }
    }

    setCurrentPage(1);
    dispatch(filterRecipes(recipesToFilter));
  }

  //    ↥    ↥    ↥    ↥    ↥    ↥    ↥    FILTERING    ↥    ↥    ↥    ↥    ↥    ↥    ↥

  // ------------------------------------------------------------------------------------

  function handleReloadPage() {
    window.location.reload();
  }

  useEffect(() => {
    setLoading(true);

    dispatch(getRecipes());
    dispatch(getDiets());

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [dispatch, setLoading]);

  useEffect(() => {
    if (errorMessage.name === "recipesSearching") {
      setRecipeTitleSearch("");
      setMessage("titleNotFound");
    }

    return () => {
      dispatch(emptyErrorState());
    };
  }, [dispatch, errorMessage.name, setRecipeTitleSearch]);

  return (
    <div className="Home">
      <nav className="navBar">
        <Link to="/" className="navBarLink">
          Landing Page
        </Link>
        <Link to="/home" className="navBarLink" onClick={() => handleReloadPage()}>
          Home Page
        </Link>
        <Link to="/creation" className="navBarLink">
          Creation Page
        </Link>
      </nav>

      <br />
      {loading ? (
        <img src={gif} alt="loading_gif" className="loadingGif" />
      ) : (
        <>
          <form onSubmit={e => handleRecipeTitleSubmit(e)} className="searchBar">
            <input
              type="text"
              placeholder="Search for recipes..."
              value={recipeTitleSearch}
              onChange={e => handleRecipeTitleChange(e)}
            />
            <input type="submit" value="Search" className="searchButton" />
          </form>

          <br />
          <div className="order-filter">
            <select onChange={e => order(e.target.value)} id="recipesOrdering">
              <option value="" hidden>
                Order Recipes by...
              </option>
              <option value="AZ">Alphabetically A - Z</option>
              <option value="ZA">Alphabetically Z - A</option>
              <option value="HS-ASC">Health Score (Asc)</option>
              <option value="HS-DESC">Health Score (Desc)</option>
            </select>

            <select onChange={e => filter(e.target.value)} id="recipesFiltering">
              <option value="" hidden>
                Filter Recipes by Diet Type
              </option>
              {diets
                ? diets.map(diet => (
                    <option key={diet.id} value={diet.name}>
                      {diet.name}
                    </option>
                  ))
                : null}
            </select>
          </div>

          <br />
          <br />
          <div className="paginationSection">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setPage(currentPage - 1)}
              className="btn1"
            >
              PREV
            </button>

            {pageNumbers.map((pageNumber, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setPage(pageNumber);
                }}
                className={currentPage === pageNumber ? "active" : "inactive"}
              >
                {pageNumber}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage === Math.ceil(recipes.length / postsPerPage)}
              onClick={() => setPage(currentPage + 1)}
              className="btn1"
            >
              NEXT
            </button>
          </div>

          <br />
          <div className="cards">
            {recipes.length
              ? currentPosts.map(recipe => (
                  <Card
                    key={recipe?.id}
                    id={recipe?.id}
                    title={recipe?.title}
                    img={recipe?.img}
                    diets={recipe?.diets}
                  />
                ))
              : null}
          </div>

          <MessagesToShow message={message} onClose={() => setMessage(false)} />
        </>
      )}
    </div>
  );
}

//    ----------------------------------------    Class Component    ----------------------------------------    //

// class Home extends React.Component {
//   componentDidMount() {
//     const { getAllRecipes } = this.props;
//     getAllRecipes();
//   }

//   render() {
// const { recipes } = this.props;

// return (
//   <div className="Home">
//     <h3>You&apos;re in Home</h3>

//     <br />
//     <div>{recipes.length > 0 && recipes.map(recipe => <li key={recipe.id}>{recipe.title}</li>)}</div>

//     <br />
//     <br />
//     <button
//       type="button"
//       style={{
//         border: "3px solid black",
//         borderRadius: "10px",
//         padding: "10px",
//         marginBottom: "20px"
//       }}
//     >
//       <Link
//         to="/creation"
//         style={{
//           textDecoration: "none",
//           color: "black",
//           fontSize: "15px"
//         }}
//       >
//         <strong>Go to Creation Page</strong>
//       </Link>
//     </button>
//   </div>
// );
//   }
// }

// function mapStateToProps(state) {
//   return {
//     recipes: state.recipes
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     getAllRecipes: () => dispatch(getRecipes())
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Home);
