import {
  EMPTY_ERROR_STATE,
  EMPTY_RECIPE_DETAILS,
  FILTER_RECIPES,
  GET_DIETS,
  GET_RECIPES,
  GET_RECIPE_DETAILS,
  ORDER_RECIPES,
  POST_RECIPE,
  SEARCH_RECIPES,
  THROW_ERROR_RECIPES_SEARCH,
  THROW_ERROR_RECIPE_DETAILS
} from "../actions";

const initialState = {
  recipes: [],
  recipesCopy: [],
  recipeDetails: {},
  diets: [],
  errorMessage: {}
};

export default function reducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: payload,
        recipesCopy: payload
      };
    case GET_RECIPE_DETAILS:
      return {
        ...state,
        recipeDetails: payload
      };
    case SEARCH_RECIPES:
      return {
        ...state,
        recipes: payload,
        recipesCopy: payload
      };
    case ORDER_RECIPES:
      return {
        ...state,
        recipes: payload
      };
    case FILTER_RECIPES:
      return {
        ...state,
        recipes: payload
      };
    case POST_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, payload]
      };
    case GET_DIETS:
      return {
        ...state,
        diets: payload
      };
    case EMPTY_RECIPE_DETAILS:
      return {
        ...state,
        recipeDetails: {}
      };
    case EMPTY_ERROR_STATE:
      return {
        ...state,
        errorMessage: {}
      };
    case THROW_ERROR_RECIPES_SEARCH:
      return {
        ...state,
        errorMessage: { name: "recipesSearching" }
      };
    case THROW_ERROR_RECIPE_DETAILS:
      return {
        ...state,
        errorMessage: { name: "recipeDetails" }
      };
    default:
      return state;
  }
}
