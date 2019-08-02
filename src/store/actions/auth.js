import axios from 'axios';
import * as actionTypes from './actionTypes';
import API_KEY from '../../firebase_keys/firebase.json';


export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId 
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    const KEY = API_KEY["WEB_API_KEY"];
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${KEY}`;
    if (!isSignup) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${KEY}`;
    }
    axios.post(url, authData)
      .then(response => {
        console.log(response);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
      })
      .catch(err => {
        console.log(err);
        console.log(KEY);
        dispatch(authFail(err));
      });
  };
};