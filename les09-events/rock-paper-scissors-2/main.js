let $rockBtn = document.getElementById('rock-btn');
let $paperBtn = document.getElementById('paper-btn');
let $scissorsBtn = document.getElementById('scissors-btn');
let $aiBtn = document.getElementById('ai-btn');
let $userScore = document.getElementById('user-score');
let $aiScore = document.getElementById('ai-score');
let $messageContainer = document.getElementById('message-container');
let $gameMessageContainer = document.getElementById('game-message-container');
let $playAgainBtn = document.getElementById('play-again-btn');

let aiChoices = ['Rock', 'Paper', 'Scissors'];
let userScore = 0;
let aiScore = 0;
let aiInterval;
let aiTimeout;
let bestOf = 5;
let gameOver = false;

function stopAiRun(aiChoice) {
    clearInterval(aiInterval);
    clearTimeout(aiTimeout);

    $aiBtn.innerText = aiChoices[aiChoice];
    if (!gameOver) {
        aiTimeout = setTimeout(startAiRun, 1500);
    }
}

function startAiRun() {
    let tempChoice = 0;

    function toggleChoices() {
        $aiBtn.innerText = aiChoices[tempChoice];

        if (tempChoice === aiChoices.length - 1) {
            tempChoice = 0;
        } else {
            tempChoice++;
        }
    }

    aiInterval = setInterval(toggleChoices, 120);
}

function init() {
    // reset scores
    // empty message
    userScore = 0;
    $userScore.innerText = userScore;
    aiScore = 0;
    $aiScore.innerText = aiScore;

    $gameMessageContainer.innerText = '';
    $messageContainer.innerText = '';
    $playAgainBtn.classList.add('hide');
    gameOver = false;
    startAiRun();
}

function handleClick(userChoice) {
    if (gameOver) {
        return;
    }

    let aiChoice = Math.floor(Math.random() * aiChoices.length);

    console.log({ user: aiChoices[userChoice], ai: aiChoices[aiChoice] });

    if (aiChoice === userChoice) {
        $messageContainer.innerText = `It's a tie`;
    } else if (
        (userChoice === 0 && aiChoice === 2) ||
        (userChoice === 1 && aiChoice === 0) ||
        (userChoice === 2 && aiChoice === 1)
    ) {
        $messageContainer.innerText = `You won this round`;
        userScore++;
        $userScore.innerText = userScore;
    } else {
        $messageContainer.innerText = `You lost this round`;
        aiScore++;
        $aiScore.innerText = aiScore;
    }

    if (userScore > bestOf / 2) {
        $gameMessageContainer.innerText = `You won the game, play again?`;
        $playAgainBtn.classList.remove('hide');
        gameOver = true;
    }

    if (aiScore > bestOf / 2) {
        $gameMessageContainer.innerText = `You lost the game, try again?`;
        $playAgainBtn.classList.remove('hide');
        gameOver = true;
    }

    stopAiRun(aiChoice);
}

function handleRockClick() {
    // execute handleClick(0)
    handleClick(0);
}

function handlePaperClick() {
    // execute handleClick(1)
    handleClick(1);
}

function handleScissorsClick() {
    // execute handleClick(2)
    handleClick(2);
}

// event listeners
$rockBtn.addEventListener('click', handleRockClick);
$paperBtn.addEventListener('click', handlePaperClick);
$scissorsBtn.addEventListener('click', handleScissorsClick);
$playAgainBtn.addEventListener('click', init);

// execute init()
init();
