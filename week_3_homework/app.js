const socket = new WebSocket('ws://localhost:1880/testing');

let textarea = document.querySelector('div.bottom textarea');
let leftWords = document.querySelector('div.leftColumn .conversation');
let rightWords = document.querySelector('div.rightColumn .conversation');
let leftElephant = document.querySelector('div.leftColumn .elephant');
let rightElephant = document.querySelector('div.rightColumn .elephant');
let span = document.querySelector('div.bottom span');

let leftLines = [document.querySelector('div.leftColumn .imageContainer .leftLines'),
                document.querySelector('div.leftColumn .imageContainer .rightLines')];
let rightLines = [document.querySelector('div.rightColumn .imageContainer .leftLines'),
                document.querySelector('div.rightColumn .imageContainer .rightLines')];

let talkingSide = 'left';

socket.addEventListener('open', handleSocketOpen);
socket.addEventListener('message', handleSocketMessages);

function handleSocketOpen() {
    document.body.style.backgroundColor = 'green';
}
function handleSocketMessages(e) {
    document.body.style.backgroundColor = 'white';
    document.querySelector('textarea').innerHTML = e.data;
}

for (const i of leftLines) {
    i.style.visibility = 'visible';
}

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

const resetAnimation = (el) => {

    el.style.animation = 'none';
    el.offsetHeight;
    el.style.animation = null;
}

leftElephant.addEventListener('click', () => {

    talkingSide = 'left';
    span.innerHTML = 'Left Elephant says:';
    for (const i of leftLines) {
        i.style.visibility = 'visible';
    }
    for (const i of rightLines) {
        i.style.visibility = 'hidden';
    }
});
rightElephant.addEventListener('click', () => {

    talkingSide = 'right';
    span.innerHTML = 'Right Elephant says:';
    for (const i of leftLines) {
        i.style.visibility = 'hidden';
    }
    for (const i of rightLines) {
        i.style.visibility = 'visible';
    }
});

// Enter key to send input
textarea.addEventListener('keyup', (e) => {

    if (e.key === 'Enter') {

        if (talkingSide === 'left') {
            addPhrase(leftWords, rightWords);
            resetAnimation(leftElephant);
            leftElephant.style.animation = 'rotate 0.5s linear';
        }
        else {
            addPhrase(rightWords, leftWords);
            resetAnimation(rightElephant);
            rightElephant.style.animation = 'rotate 0.5s reverse linear';
        }
    }
})



