import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types';

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// Register User
export const register = (body, dispatch) => {
  // Headers
  const config = {
    'Content-Type': 'application/json'
  };
  axios
    .post('/api/users', body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, REGISTER_FAIL)
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// Login User
export const login = (body, dispatch) => {
  // Headers
  const config = {
    'Content-Type': 'application/json'
  };
  axios
    .post('/api/auth', body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, LOGIN_FAIL)
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};
// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

// Set config/headers and token
export const tokenConfig = getState => {
  //? Get token from Storage
  // the combineReducers function(in rootReducer)
  // contains the entire State(which is later on mapped to props)
  // and we are accessing it with getState()
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
};
