let button = document.getElementById('duplicate-elephant');
let countNum = document.getElementById('count');

let count = 0;

console.log(button);

button.addEventListener('click', () => {
    count += 1;
    countNum.innerHTML = count;
});
