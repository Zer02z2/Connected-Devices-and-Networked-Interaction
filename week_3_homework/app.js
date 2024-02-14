const socket = new WebSocket('ws://localhost:1880/testing');

let textarea = document.querySelector('div.bottom p2');
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
let textString = '';

socket.addEventListener('open', handleSocketOpen);
socket.addEventListener('message', handleSocketMessages);

function handleSocketOpen() {
    document.body.style.backgroundColor = 'green';
}
function handleSocketMessages(e) {
    document.body.style.backgroundColor = 'white';
    let data = e.data.split(',');
    console.log(data);
    
    if (data[0] > 0) switchToLeft();
    else if (data[0] < 0) switchToRight();

    if (data[1] == 'yellow') textString += '~';
    else if (data[1] == 'blue') textString += '!';
    else if (data[1] == 'red') textString += '?';
    else if (data[1] == 'green') sendMessage();
    textarea.innerHTML = textString;
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
    phrase.innerHTML = textString + '<br><br>';
    speaker.appendChild(phrase);

    let spacing = document.createElement('p');
    spacing.innerHTML = '<br><br>';
    listener.appendChild(spacing);

    textString = '';
}

const switchToLeft = () => {
    
    talkingSide = 'left';
    span.innerHTML = 'Left Elephant says:';
    for (const i of leftLines) {
        i.style.visibility = 'visible';
    }
    for (const i of rightLines) {
        i.style.visibility = 'hidden';
    }
}

const switchToRight = () => {

    talkingSide = 'right';
    span.innerHTML = 'Right Elephant says:';
    for (const i of leftLines) {
        i.style.visibility = 'hidden';
    }
    for (const i of rightLines) {
        i.style.visibility = 'visible';
    }
}

const resetAnimation = (el) => {

    el.style.animation = 'none';
    el.offsetHeight;
    el.style.animation = null;
}

leftElephant.addEventListener('click', switchToLeft);
rightElephant.addEventListener('click', switchToRight);

// Enter key to send input
textarea.addEventListener('keyup', (e) => {

    if (e.key === 'Enter') {

        sendMessage();
    }
})

function sendMessage() {

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



