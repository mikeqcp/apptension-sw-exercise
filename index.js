let counterValue = 0;

window.onload = () => {
  const increaseBtn = document.querySelector('#increase_btn');
  const decreaseBtn = document.querySelector('#decrease_btn');
  const label = document.querySelector('#label');

  increaseBtn.addEventListener('click', () => {
    counterValue += 1;
    _updateDisplay();
  });
  decreaseBtn.addEventListener('click', () => {
    counterValue -= 1;
    _updateDisplay();
  });

  const _updateDisplay = () => {
    label.innerHTML = counterValue;
  }
};
