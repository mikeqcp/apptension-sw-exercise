import Dexie from 'dexie';

import firebaseDB from './src/firebase';
import { initBackgroundSync, requestSync } from './src/backgroundSync';

const indexedDB = new Dexie('CounterDB');
indexedDB.version(1).stores({
  counter: 'value'
});

let counterValue = 0;

initBackgroundSync();

firebaseDB.ref('/counter').on('value', snapshot => {
  counterValue = snapshot.val();
  _updateDisplay();
});

const _updateDisplay = () => {
  label.innerHTML = counterValue;
};

const _sendToDB = () => {
  indexedDB.counter.clear().then(() => {
    indexedDB.counter.put({value: counterValue}).then(function () {
      requestSync();
    })
  });
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
