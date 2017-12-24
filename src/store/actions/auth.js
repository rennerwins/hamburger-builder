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
    const { idToken, localId } = await data;
    await dispatch(authSuccess(idToken, localId));
  } catch (err) {
    dispatch(authFail());
  }
};
