let textarea = document.querySelector('div.bottom textarea');
let leftWords = document.querySelector('div.leftColumn .conversation');
let rightWords = document.querySelector('div.rightColumn .conversation');
let leftElephant = document.querySelector('div.leftColumn .elephant');
let rightElephant = document.querySelector('div.rightColumn .elephant');
let span = document.querySelector('div.bottom span');

let talkingSide = 'left';

console.log(leftElephant);

const addPhrase = (speaker, listener) => {

    let lastWords = [speaker.children[speaker.children.length - 1],
                    listener.children[listener.children.length - 1]];
    for (const i of lastWords) {
        if (typeof i !== 'undefined') i.style.color = 'rgb(170, 170, 170)';
    }

    let phrase = document.createElement('p');
    phrase.innerHTML = textarea.value + '<br><br>';
    speaker.appendChild(phrase);

    let spacing = document.createElement('p');
    spacing.innerHTML = '<br><br>';
    listener.appendChild(spacing);

    textarea.value = null;
}

leftElephant.addEventListener('click', () => {

    talkingSide = 'left';
    span.innerHTML = 'Left Elephant says:';
});
rightElephant.addEventListener('click', () => {

    talkingSide = 'right';
    span.innerHTML = 'Right Elephant says:';
});

// Enter key to send input
textarea.addEventListener('keyup', (e) => {

    if (e.key === 'Enter') {

        if (talkingSide === 'left') {
            addPhrase(leftWords, rightWords);
            leftElephant.style.animation = 'rotate 4.5s linear';
        }
        else {
            addPhrase(rightWords, leftWords);
        }
    }
})



