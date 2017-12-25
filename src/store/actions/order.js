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

export const purchaseBurger = (orderData, token) => async dispatch => {
  dispatch(purchaseBurgerStart());
  try {
    const { data } = await axios.post(`/orders.json?auth=${token}`, orderData);
    await dispatch(purchaseBurgerSuccess(data.name, orderData));
  } catch (err) {
    dispatch(purchaseBurgerFail(err));
  }
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders
  };
};

export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDER_FAIL,
    error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START
  };
};

export const fetchOrders = token => async dispatch => {
  dispatch(fetchOrdersStart());
  try {
    const fetchedOrders = [];
    const { data } = await axios.get(`/orders.json?auth=${token}`);

    for (let key in data) {
      fetchedOrders.push({ ...data[key], id: key });
    }

    await dispatch(fetchOrdersSuccess(fetchedOrders));
  } catch (err) {
    dispatch(fetchOrdersFail(err));
  }
};
