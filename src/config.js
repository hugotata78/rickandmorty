import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyDqpsUWd7bEhVjXiRatR07IWVqtDWyqyUk",
    authDomain: "curso-udemy-5343c.firebaseapp.com",
    projectId: "curso-udemy-5343c",
    storageBucket: "curso-udemy-5343c.appspot.com",
    messagingSenderId: "56857111835",
    appId: "1:56857111835:web:0f2c6fe0a0816bee5c37be"
  };
  // Initialize Firebase
firebase.initializeApp(config);
const db = firebase.firestore().collection('favs')

export function updateFavs(arr,uid){
  return db.doc(uid).set({arr})
}

export function getFavs(uid){
  return db.doc(uid).get()
  .then(snap=>{
    return snap.data().arr
  })
}
export function signOutGoogle(){
  firebase.auth().signOut()
}

export function loginWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider()
    return firebase.auth().signInWithPopup(provider)
    .then(snap=>snap.user)
}