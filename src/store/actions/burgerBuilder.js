import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = ingredientName => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName
  };
};

export const removeIngredient = ingredientName => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName
  };
};

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => async dispatch => {
  try {
    const { data } = await axios.get('/ingredients.json');
    await dispatch(setIngredients(data));
  } catch (err) {
    dispatch(fetchIngredientsFailed());
  }
};
