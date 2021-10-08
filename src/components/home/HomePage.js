import React from "react";
import Card from "../card/Card";
import styles from "./home.module.css";
import { connect } from "react-redux";
import { removeCharacterActions, addToFavoritesActions } from '../../redux/characters'


function Home({chars,removeCharacterActions, addToFavoritesActions }) {
  
  function renderCharacter() {
    let char = chars[0];
    return <Card leftClick={nextCharacter} rightClick={addFav} {...char} />;
  }

  function nextCharacter (){
    removeCharacterActions()
  }

  function addFav(){
    addToFavoritesActions()
  }
  return (
    <div className={styles.container}>
      <h2>Personajes de Rick y Morty</h2>
      <div>{renderCharacter()}</div>
    </div>
  );
}

function mapStateToProps(state){
  return{
    chars:state.characters.arrCharacters
  }
}

export default connect(mapStateToProps, {removeCharacterActions, addToFavoritesActions})(Home);
