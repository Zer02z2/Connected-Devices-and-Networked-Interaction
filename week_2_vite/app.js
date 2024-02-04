let button = document.getElementById('duplicate-elephant');
let countNum = document.getElementById('count');
let rightColumn = document.getElementsByClassName('right')[0];

let count = 0;

button.addEventListener('click', () => {
  let image = document.createElement('img');
  image.setAttribute('src', 'https://hatrabbits.com/wp-content/uploads/2017/01/random-word-1.jpg');
  rightColumn.appendChild(image);
  console.log(rightColumn);
  count += 1;
  countNum.innerHTML = count;
});


