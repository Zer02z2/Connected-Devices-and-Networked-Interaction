let textarea = document.querySelector("div.bottom textarea");
let leftWords = document.querySelector("div.leftColumn .conversation");

// Enter key to send input
textarea.addEventListener('keyup', (e) => {

    if (e.key === 'Enter') {

        let lastWord = leftWords.children[leftWords.children.length - 1];
        if (typeof lastWord !== 'undefined') lastWord.style.color = 'rgb(170, 170, 170)';

        let phrase = document.createElement('p');
        phrase.innerHTML = textarea.value + '<br><br>';
        leftWords.appendChild(phrase);
        textarea.value = null;
    }
})

// button.addEventListener('click', () => {
//   let image = document.createElement('img');
//   image.setAttribute('src', './elephant.jpg');
//   rightColumn.appendChild(image);
//   console.log(rightColumn);
//   count += 1;
//   countNum.innerHTML = count;
// });



