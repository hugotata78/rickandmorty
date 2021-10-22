import { loginWithGoogle, signOutGoogle } from "../config";
import { getFavoritesActions } from './characters'
//constants

const initialState = {
  loggedIn: false,
  loading: false,
  error: "",
};
const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILED = "LOGIN_FAILED";
const LOG_OUT = "LOG_OUT";

//reducer

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
  
    case LOGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loading: false,
        ...action.payload,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOG_OUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
//funcion auxiliar

function saveStorage(storage) {
  localStorage.storage = JSON.stringify(storage);
}

//actions

const logOutActions = () => (dispatch, getState) => {
  signOutGoogle();
  dispatch({
    type: LOG_OUT,
  });
  localStorage.removeItem("storage");
  localStorage.removeItem("favs");
};

const restoreSession = () => (dispatch) => {
  const storage = localStorage.getItem("storage");
  const data = JSON.parse(storage);
  console.log(data);
  if (data && data.users) {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.users,
    });
  }
};

const loginActions = () => (dispatch, getState) => {
  dispatch({
    type: LOGIN,
  });
  return loginWithGoogle()
    .then((user) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        },
      });
      saveStorage(getState());
      getFavoritesActions()(dispatch,getState)
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_FAILED,
        payload: "Login Failed",
      });
    });
};

//exports

export { usersReducer, loginActions, restoreSession, logOutActions };
