let button = document.getElementById('duplicate-elephant');
let countNum = document.getElementById('count');
let rightColumn = document.getElementsByClassName('right')[0];

let count = 0;

button.addEventListener('click', () => {
  let image = document.createElement('img');
  image.setAttribute('src', './elephant.jpg');
  rightColumn.appendChild(image);
  console.log(rightColumn);
  count += 1;
  countNum.innerHTML = count;
});



