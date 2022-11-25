const axios = require("axios");

export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPE_DETAILS = "GET_RECIPE_DETAILS";
export const SEARCH_RECIPES = "SEARCH_RECIPES";
export const ORDER_RECIPES = "ORDER_RECIPES";
export const FILTER_RECIPES = "FILTER_RECIPES";
export const POST_RECIPE = "POST_RECIPE";
export const GET_DIETS = "GET_DIETS";
export const EMPTY_RECIPE_DETAILS = "EMPTY_RECIPE_DETAILS";
export const EMPTY_ERROR_STATE = "EMPTY_ERROR_STATE";
export const THROW_ERROR_RECIPES_SEARCH = "THROW_ERROR_RECIPES_SEARCH";
export const THROW_ERROR_RECIPE_DETAILS = "THROW_ERROR_RECIPE_DETAILS";

export function getRecipes() {
  return async function (dispatch) {
    const recipes = await axios.get("/recipes");
    dispatch({
      type: GET_RECIPES,
      payload: recipes.data
    });
  };
}

export function getRecipeDetails(recipeId) {
  return async function (dispatch) {
    try {
      const recipeDetails = await axios.get(`/recipes/${recipeId}`);
      dispatch({
        type: GET_RECIPE_DETAILS,
        payload: recipeDetails.data
      });
    } catch (error) {
      dispatch({
        type: THROW_ERROR_RECIPE_DETAILS
      });
    }
  };
}

export function searchRecipes(title) {
  return async function (dispatch) {
    try {
      const searchedRecipes = await axios.get(`/recipes?title=${title}`);
      dispatch({
        type: SEARCH_RECIPES,
        payload: searchedRecipes.data
      });
    } catch (error) {
      dispatch({
        type: THROW_ERROR_RECIPES_SEARCH
      });
    }
  };
}

export function orderRecipes(recipes) {
  return function (dispatch) {
    dispatch({
      type: ORDER_RECIPES,
      payload: recipes
    });
  };
}

export function filterRecipes(recipes) {
  return function (dispatch) {
    dispatch({
      type: FILTER_RECIPES,
      payload: recipes
    });
  };
}

export function postRecipe(recipe) {
  return async function (dispatch) {
    try {
      const newRecipe = await axios.post("/recipes", recipe);
      dispatch({
        type: POST_RECIPE,
        payload: newRecipe.data
      });
    } catch (error) {
      throw new Error("postRecipe: ", error);
    }
  };
}

export function getDiets() {
  return async function (dispatch) {
    const diets = await axios.get("/diets");
    dispatch({
      type: GET_DIETS,
      payload: diets.data
    });
  };
}

export function emptyRecipeDetails() {
  return function (dispatch) {
    dispatch({
      type: EMPTY_RECIPE_DETAILS
    });
  };
}

export function emptyErrorState() {
  return function (dispatch) {
    dispatch({
      type: EMPTY_ERROR_STATE
    });
  };
}
