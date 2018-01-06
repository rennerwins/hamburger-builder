import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => dispatch => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};

export const auth = (email, password, isSignup) => async dispatch => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true
  };

  const authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  const firebaseKey = 'AIzaSyBP7e1Es72xV0ODSIshGgsv6W2zz99Bies';

  let url = `${authUrl}/signupNewUser?key=${firebaseKey}`;

  if (!isSignup) {
    url = `${authUrl}/verifyPassword?key=${firebaseKey}`;
  }

  try {
    const { data } = await axios.post(url, authData);
    const { idToken, localId, expiresIn } = await data;
    await dispatch(authSuccess(idToken, localId));
    await dispatch(checkAuthTimeout(expiresIn));
  } catch (err) {
    dispatch(authFail(err.response.data.error));
  }
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
  };
};
