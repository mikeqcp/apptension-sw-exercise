import firebase from 'firebase';
const config = {
    apiKey: "AIzaSyCBpLRPfasKZWbwefb2BajvQrtx7r-NWwY",
    authDomain: "sw-excercise.firebaseapp.com",
    databaseURL: "https://sw-excercise.firebaseio.com",
    projectId: "sw-excercise",
    storageBucket: "sw-excercise.appspot.com",
    messagingSenderId: "508880139950"
};
firebase.initializeApp(config);
const database = firebase.database();



// const _sendToDB = () => {
//   firebase.database().ref('/counter').set(counterValue);
// };


export default database;