import React, { useState } from "react";
import Card from "../card/Card";
import styles from "./home.module.css";
import { connect } from "react-redux";
import { removeCharacterActions, addToFavoritesActions } from '../../redux/characters'


function Home({ chars, favorites, removeCharacterActions, addToFavoritesActions }) {

  const [isFavorite, setIsFavorite] = useState(false)

  function renderCharacter() {
    let char = chars[0];
    return <Card leftClick={nextCharacter} rightClick={addFav} {...char} />;
  }

  function nextCharacter() {
    removeCharacterActions()
    if (isFavorite) {
      setIsFavorite(false)
    }
  }

  function addFav() {
    if(favorites.length){
      const result = favorites.find(f=> f.name === chars[0].name)
      if(result){
        setIsFavorite(true)
      }else{
        addToFavoritesActions()
      }
    }else{
      addToFavoritesActions()
    }
  }



  return (
    <div className={styles.container}>
      <h2>Personajes de Rick y Morty</h2>
      {isFavorite && <h3 className='no_favorite'>El personaje que intenta agregar ya se encuentra en su lista de favoritos</h3>}
      <div>{renderCharacter()}</div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    chars: state.characters.arrCharacters,
    favorites: state.characters.favorites
  }
}

export default connect(mapStateToProps, { removeCharacterActions, addToFavoritesActions })(Home);
