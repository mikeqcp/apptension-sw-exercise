import db from './src/firebase';
import { initBackgroundSync, requestSync } from './src/backgroundSync';

let counterValue = 0;

initBackgroundSync();

db.ref('/counter').on('value', snapshot => {
  counterValue = snapshot.val();
  _updateDisplay();
});

const _updateDisplay = () => {
  label.innerHTML = counterValue;
};

const _sendToDB = () => {
  requestSync();
};

window.onload = () => {
  const increaseBtn = document.querySelector('#increase_btn');
  const decreaseBtn = document.querySelector('#decrease_btn');

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
