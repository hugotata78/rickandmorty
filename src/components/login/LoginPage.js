import React from "react";
import { connect } from "react-redux";
import styles from "./login.module.css";
import { loginActions,logOutActions } from "../../redux/users";
import { useHistory } from "react-router";

function LoginPage({ loading, loggedIn, loginActions, logOutActions }) {

  const history = useHistory()
  function login() {
    loginActions();
    history.push('/')
  }

  function logOut(){
      logOutActions()
  }
  return (
    <div className={styles.container}>
      {!loggedIn ? (
        <div >
          <h1>Inicia Sesión con Google</h1>

          <button onClick={login}>Iniciar Sesión</button>
        </div>
      ) : (
        <div>
          <h1>Cierra tu sesión</h1>
          <button onClick={logOut}>Cerrar Sesión</button>
        </div>
      )}
    </div>
  );
}

function mapStateToProps({ users: { loading, loggedIn } }) {
  return {
    loading,
    loggedIn,
  };
}
export default connect(mapStateToProps, { loginActions, logOutActions })(LoginPage);
