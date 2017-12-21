import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    id,
    orderData
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseBurger = orderData => async dispatch => {
  dispatch(purchaseBurgerStart());
  try {
    const { data } = await axios.post('/orders.json', orderData);
    await dispatch(purchaseBurgerSuccess(data.name, orderData));
  } catch (err) {
    dispatch(purchaseBurgerFail(err));
  }
};
