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

let counterValue = 0;

firebase.database().ref('/counter').on('value', snapshot => {
  counterValue = snapshot.val();
  _updateDisplay();
});

const _updateDisplay = () => {
  label.innerHTML = counterValue;
};

const _sendToDB = () => {
  firebase.database().ref('/counter').set(counterValue);
};

window.onload = () => {
  const increaseBtn = document.querySelector('#increase_btn');
  const decreaseBtn = document.querySelector('#decrease_btn');
  const label = document.querySelector('#label');

  increaseBtn.addEventListener('click', () => {
    counterValue += 1;
    _updateDisplay();
    _sendToDB();
  });
  decreaseBtn.addEventListener('click', () => {
    counterValue -= 1;
    _updateDisplay();
    _sendToDB();
  });
};
