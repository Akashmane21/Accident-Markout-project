import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyCzWCqikVnsM8oQn2ieHNRKcXk-xSgRpzQ",
    authDomain: "reactcrud-7b0fc.firebaseapp.com",
    projectId: "reactcrud-7b0fc",
    storageBucket: "reactcrud-7b0fc.appspot.com",
    messagingSenderId: "112205938889",
    appId: "1:112205938889:web:e3ec54b9ef92605900cd18"
  };
  // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);


  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
  export default firebase;