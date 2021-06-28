import axios from "axios";
import { updateFavs, getFavs } from "../config";
import ApolloClient, {gql} from 'apollo-boost'

//constants

const initialState = {
  arrCharacters: [],
  favorites: [],
  error: "",
  loading: false,
  nextPage:1
};

const GET_CHARACTERS = "GET_CHARACTERS";
const GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS";
const GET_CHARACTERS_FAILED = "GET_CHARACTERS_FAILED";
const URL = "https://rickandmortyapi.com/api/character";
const client = new ApolloClient({
  uri:"https://rickandmortyapi.com/graphql"
})
const REMOVE_CHARACTER = "REMOVE_CHARACTER";
const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
const GET_FAVS = "GET_FAVS";
const GET_FAVS_SUCCESS = "GET_FAVS_SUCCESS";
const GET_FAVS_FAILED = "GET_FAVS_FAILED";
const UPDATE_PAGE = 'UPDATE_PAGE'

//reducer
const charactersReducers = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PAGE:
      return {...state,nextPage:action.payload}
    case GET_FAVS:
      return { ...state, loading: true };
    case GET_FAVS_SUCCESS:
      return { ...state, loading: false, favorites: action.payload };
    case GET_FAVS_FAILED:
      return { ...state, loading: false, error: action.payload };
    case ADD_TO_FAVORITES:
      return {
        ...state,
        ...action.payload,
      };
    case REMOVE_CHARACTER:
      return {
        ...state,
        arrCharacters: action.payload,
      };
    case GET_CHARACTERS:
      return { ...state, loading: true };
    case GET_CHARACTERS_SUCCESS:
      return { ...state, arrCharacters: action.payload, loading: false };
    case GET_CHARACTERS_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
//actions
const addToFavoritesActions = () => (dispatch, getState) => {
  const { arrCharacters, favorites } = getState().characters;
  const { uid } = getState().users;
  const char = arrCharacters.shift();
  favorites.push(char);
  updateFavs(favorites, uid);
  dispatch({
    type: ADD_TO_FAVORITES,
    payload: {
      arrCharacters: [...arrCharacters],
      favorites: [...favorites],
    },
  });
};

const removeCharacterActions = () => (dispatch, getState) => {
  let { arrCharacters } = getState().characters;
  arrCharacters.shift();
  if(!arrCharacters.length){
    getCharactersActions()(dispatch,getState)
    return
  }
  dispatch({
    type: REMOVE_CHARACTER,
    payload: [...arrCharacters],
  });
};

const getFavoritesActions = () => (dispatch, getState) => {
  const { uid } = getState().users;
  dispatch({
    type: GET_FAVS,
  });
  return getFavs(uid)
    .then((arr) => {
      dispatch({
        type: GET_FAVS_SUCCESS,
        payload: [...arr],
      });
    })
    .catch((e) => {
      dispatch({
        type: GET_FAVS_FAILED,
        payload: "No se puede conectar la base de datos",
      });
    });
};

const getCharactersActions = () => (dispatch, getState) => {
  let query = gql`
    query ($page:Int){
        characters(page:$page){
          info{
            pages
            next
            prev
          }
          results{
            name
            image
          }
        }
      }
    `
  dispatch({
    type: GET_CHARACTERS,
  });

  let { nextPage } = getState().characters
  return client.query({
    query,
    variables:{page:nextPage}
  })
  .then(({data, error})=>{
    if(error){
      dispatch({
        type:GET_CHARACTERS_FAILED,
        payload:'No se pudo conectar con la base de datos'
      })
      return
    }
    dispatch({
      type:GET_CHARACTERS_SUCCESS,
      payload:data.characters.results
    })
    dispatch({
      type:UPDATE_PAGE,
      payload:data.characters.info.next ? data.characters.info.next : 1 
    })
  })
  // return axios
  //   .get(URL)
  //   .then((res) => {
  //     dispatch({
  //       type: GET_CHARACTERS_SUCCESS,
  //       payload: res.data.results,
  //     });
  //   })
  //   .catch((error) => {
  //     dispatch({
  //       type: GET_CHARACTERS_FAILED,
  //       payload: "Page not found!",
  //     });
  //   });
};

//exports

export {
  charactersReducers,
  getCharactersActions,
  removeCharacterActions,
  addToFavoritesActions,
  getFavoritesActions,
};
