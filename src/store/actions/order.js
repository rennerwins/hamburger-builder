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

export const purchaseBurgerStart = orderData => async dispatch => {
  try {
    const { data } = await axios.post('/orders.json', orderData);
    await dispatch(purchaseBurgerSuccess(data, orderData));
  } catch (err) {
    dispatch(purchaseBurgerFail(err));
  }
};
