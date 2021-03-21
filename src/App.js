import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);;
} else {
  firebase.app(); // if already initialized, use that one
}

function App() {
  //state
  const [user, setUser] = useState({})
  const [fbUser, setFbUser] = useState([])
  const [gitUser, setGitUser] = useState([]);
  //google provider
  var provider = new firebase.auth.GoogleAuthProvider();
  //facebook provider
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  var gitHubprovider = new firebase.auth.GithubAuthProvider();

  const handleGoogleSignIn = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        // set to state
        setUser(user)
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(errorCode);
      });
  }
  const handleFbSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        var user = result.user;
        var accessToken = credential.accessToken;
        setFbUser(user)
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode);
      });
  }

  const handleGithubSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(gitHubprovider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        console.log(user);
        setGitUser(user)
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log('error :', errorCode, email, credential);
      });
  }
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}> Google sign in </button>
      <br />
      <button onClick={handleFbSignIn}>Facebook sign in</button>
      <br />
      <button onClick={handleGithubSignIn}>Github sign in</button>
      <div>
        <h1>Email information :</h1>
        <h3>{user.email}</h3>
        <h3>{user.displayName}</h3>
      </div>
      <div>
        <h1>Facebook information :</h1>
        <h3>{fbUser.displayName}</h3>
        <h3>{fbUser.email}</h3>
      </div>
      <div>
        <h1>GitHub Information</h1>
        <h3>{gitUser.displayName}</h3>
        <h3>{gitUser.email}</h3>
      </div>
    </div>
  );
}

export default App;
