import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyABt2FoSJgNwk3jtKrxgEoNG8GDfa5y-dw",
  authDomain: "curso-udemy-498c2.firebaseapp.com",
  projectId: "curso-udemy-498c2",
  storageBucket: "curso-udemy-498c2.appspot.com",
  messagingSenderId: "671502287784",
  appId: "1:671502287784:web:2eb93b23bc653c62d7939d"
};
// Initialize Firebase
firebase.initializeApp(config);
const db = firebase.firestore().collection('favs')

export function updateFavs(arr, uid) {
  return db.doc(uid).set({ arr })
}

export function getFavs(uid) {
  return db.doc(uid).get()
    .then(snap => {
      return snap.data().arr
    })
}
export function signOutGoogle() {
  firebase.auth().signOut()
}

export function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider()
  return firebase.auth().signInWithPopup(provider)
    .then(snap => snap.user)
}