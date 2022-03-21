let $catSelectContainer = document.getElementById('cat-select-container');
let $catSelectForm = document.getElementById('cat-select-form');
let $catSelectSelect = document.getElementById('cat-select-select');
let $catSelectDifficulty = document.getElementById('cat-select-difficulty');
let $catSelectCount = document.getElementById('cat-select-count');
let $catSelectSubmit = document.getElementById('cat-select-submit');
let $quizAside = document.getElementById('quiz-aside');
let $quizContainer = document.getElementById('quiz-container');
let $quizTitle = document.getElementById('quiz-title');
let $quizAnswerContainer = document.getElementById('quiz-answer-container');
let $quizScore = document.getElementById('quiz-score');
let $quizQuestion = document.getElementById('quiz-question');

const QuestionCount = 10;

let state = {
    questionCount: null,
    difficulty: null,
    error: false,
    catFetchComplete: false,
    gameOver: false,
    selectedCatId: null,
    selectCatText: null,
    score: 0,
    turn: 0,
    questions: null,
    token: null,
};

// Draw Function

/**
 *
 * @param {number} index
 * @param {'active' | 'correct' | 'wrong'} type
 */
function drawQuestionNumberClass(index, type) {
    $quizAside.children[
        index
    ].className = `quiz__question-number quiz__question-number--${type}`;
}

function drawPage() {
    if (state.selectedCatId === null && state.selectCatText === null) {
        $catSelectContainer.classList.remove('hidden');
        $quizContainer.classList.add('hidden');
    } else {
        $quizTitle.innerText = `${state.selectCatText} Quiz`;
        $catSelectContainer.classList.add('hidden');
        $quizContainer.classList.remove('hidden');
    }
}

function drawAside() {
    let asideHTML = '';

    for (let i = 1; i <= state.questionCount; i++) {
        asideHTML += `<div class="quiz__question-number">${i}</div>`;
    }

    asideHTML += `<div class="quiz__score">
                    <span id="quiz-score">${state.score}</span><span>/</span><span>${state.questionCount}</span>
                </div>`;

    $quizAside.innerHTML = asideHTML;
    $quizContainer.className = `quiz__container quiz__container--${state.questionCount}`;
    $quizScore = document.getElementById('quiz-score');
}

function disableCatForm() {
    $catSelectSelect.disabled = true;
    $catSelectSubmit.disabled = true;
}

function enableCatForm() {
    $catSelectSelect.disabled = false;
    $catSelectSubmit.disabled = false;
}

function drawOptions(categories) {
    let optionsHTML = categories.reduce((html, category) => {
        console.log({ html, category });

        html += `<option value="${category.id}">${category.name}</option>`;

        return html;
    }, '');

    console.log(optionsHTML);
    $catSelectSelect.innerHTML = optionsHTML;
}

/*function resetQuestionNumberClasses() {
    $quizQuestionNumbers.forEach(($quizQuestionNumber) => {
        $quizQuestionNumber.classList.remove(
            'quiz__question-number--active',
            'quiz__question-number--correct',
            'quiz__question-number--wrong',
        );
    });
}*/

function drawScore() {
    $quizScore.innerText = state.score;
}

function drawQuestion() {
    if (state.questions === null) {
        $quizQuestion.innerHTML = '';
        return;
    }

    let curQuestion = state.questions[state.turn];

    $quizQuestion.innerHTML = curQuestion.question;
}

function drawEndQuestion() {
    $quizQuestion.innerHTML = `Quiz over, you scored ${state.score} points. Try again?`;
}

function drawErrorQuestion() {
    $quizQuestion.innerHTML = `Could not find questions for ${state.selectCatText}. Select a different category?`;
}

function removeCatOption(catId) {
    let $option = document.querySelector(
        `.cat-select__select option[value="${catId}"]`,
    );
    $option.remove();
}

// Fetch Functions

function fetchQuestions() {
    let queryParams = new URLSearchParams();
    queryParams.append('amount', state.questionCount);
    queryParams.append('category', state.selectedCatId);
    queryParams.append('difficulty', state.difficulty);
    queryParams.append('type', 'boolean');
    queryParams.append('token', state.token);

    return fetch('https://opentdb.com/api.php?' + queryParams.toString())
        .then((response) => {
            if (!response.ok) {
                throw new Error('Could not fetch questions');
            }

            return response.json();
        })
        .then((body) => {
            return body;
        })
        .catch((error) => {
            console.error(error);
        });
}

function fetchCategories() {
    return fetch('https://opentdb.com/api_category.php')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Could not fetch categories');
            }

            return response.json();
        })
        .then((body) => {
            return body.trivia_categories;
        })
        .catch((error) => {
            console.error(error);
        });
}

function fetchToken() {
    return fetch('https://opentdb.com/api_token.php?command=request')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Could not fetch token');
            }

            return response.json();
        })
        .then((body) => {
            return body.token;
        })
        .catch((error) => {
            console.error(error);
        });
}

// Game functions

function initCat() {
    state.selectedCatId = null;
    state.selectCatText = null;
    state.difficulty = null;
    state.questionCount = null;

    if (!state.catFetchComplete) {
        disableCatForm();

        Promise.all([fetchToken(), fetchCategories()])
            .then((bodies) => {
                let token = bodies[0];
                let categories = bodies[1];
                drawOptions(categories);
                state.catFetchComplete = true;
                state.token = token;
            })
            .finally(() => {
                enableCatForm();
            });
    }

    drawPage();
}

function initQuiz() {
    state.score = 0;
    state.turn = 0;
    state.questions = null;
    state.gameOver = false;
    state.error = false;

    fetchQuestions().then((body) => {
        if (body.response_code !== 0) {
            drawErrorQuestion();
            state.error = true;
            removeCatOption(state.selectedCatId);
            return;
        }

        state.questions = body.results;
        drawQuestion();
    });

    drawAside();
    drawQuestion();
    drawQuestionNumberClass(state.turn, 'active');
}

/**
 * Handle answer
 * @param {'True'|'False'} curAnswer
 */
function answer(curAnswer) {
    if (state.error) {
        initCat();
        return;
    }

    if (state.gameOver) {
        console.log(curAnswer);
        if (curAnswer === 'True') {
            initQuiz();
        } else {
            initCat();
        }
        return;
    }

    let correctAnswer = state.questions[state.turn].correct_answer;

    if (curAnswer === correctAnswer) {
        state.score++;
        drawScore();
        drawQuestionNumberClass(state.turn, 'correct');
    } else {
        drawQuestionNumberClass(state.turn, 'wrong');
    }

    if (state.turn === state.questionCount - 1) {
        drawEndQuestion();
        state.gameOver = true;
    } else {
        state.turn++;
        drawQuestionNumberClass(state.turn, 'active');
        drawQuestion();
    }
}

// Event Handlers

function submitCatSelect(event) {
    event.preventDefault();

    let questionCount = $catSelectCount.value;
    let difficulty = $catSelectDifficulty.value;
    let activeOption = event.target.querySelector(
        '#cat-select-select option:checked',
    );

    state.selectedCatId = activeOption.value;
    state.selectCatText = activeOption.innerText;
    state.difficulty = difficulty;
    state.questionCount = questionCount;

    drawPage();

    initQuiz();
}

function answerBtnClicked(event) {
    // execute answer with correct parameter
    if (event.target.matches('.quiz__answer')) {
        answer(event.target.innerText);
    }
}

$catSelectForm.addEventListener('submit', submitCatSelect);
$quizAnswerContainer.addEventListener('click', answerBtnClicked);

initCat();
