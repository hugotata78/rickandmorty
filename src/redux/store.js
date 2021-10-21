import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { usersReducer, restoreSession } from "./users";
import { charactersReducers, getCharactersActions, restoreFavsAction } from './characters'
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
  users: usersReducer,
  characters:charactersReducers
});
const generateStore = () => {
  const store = createStore(
    rootReducers,
    composeEnhancers(applyMiddleware(thunk))
  );

  getCharactersActions()(store.dispatch,store.getState)
  restoreSession()(store.dispatch)
  restoreFavsAction()(store.dispatch)
  return store;
};


export { generateStore };
