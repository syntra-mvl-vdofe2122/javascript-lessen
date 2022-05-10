<template>
    <div
        id="quiz-container"
        class="quiz__container"
        :class="`quiz__container--${catData.selectedQuestionCount}`"
    >
        <h1 id="quiz-title" class="quiz__title">
            {{ catData.selectedCatText }}
        </h1>

        <aside class="quiz__aside" id="quiz-aside">
            <div
                v-for="num in catData.selectedQuestionCount"
                class="quiz__question-number"
                :class="{ 'quiz__question-number--active': num - 1 === turn }"
            >
                {{ num }}
            </div>

            <div class="quiz__score">
                {{ score }}/{{ catData.selectedQuestionCount }}
            </div>
        </aside>

        <main class="quiz__main">
            <p id="quiz-question" class="quiz__question">
                {{ curQuestion }}
            </p>
            <div id="quiz-answer-container" class="quiz__answer-container">
                <button class="quiz__answer" @click="answer(true)">True</button>
                <button class="quiz__answer" @click="answer(false)">
                    False
                </button>
            </div>
        </main>
    </div>
</template>

<script>
/*
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

function drawOptions(categories) {
    let optionsHTML = categories.reduce((html, category) => {
        console.log({ html, category });

        html += `<option value="${category.id}">${category.name}</option>`;

        return html;
    }, '');

    console.log(optionsHTML);
    $catSelectSelect.innerHTML = optionsHTML;
}

function resetQuestionNumberClasses() {
    $quizQuestionNumbers.forEach(($quizQuestionNumber) => {
        $quizQuestionNumber.classList.remove(
            'quiz__question-number--active',
            'quiz__question-number--correct',
            'quiz__question-number--wrong',
        );
    });
}


function drawScore() {
    $quizScore.innerText = state.score;
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

/**
 * Handle answer
 * @param {'True'|'False'} curAnswer

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

function answerBtnClicked(event) {
    // execute answer with correct parameter
    if (event.target.matches('.quiz__answer')) {
        answer(event.target.innerText);
    }
}
*/
export default {
    emits: ['endQuiz'],
    props: {
        catData: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            error: false,
            gameOver: false,
            score: 0,
            turn: 0,
            questions: null,
            curQuestion: '',
        };
    },
    computed: {},
    methods: {
        fetchQuestions() {
            let queryParams = new URLSearchParams();
            queryParams.append('amount', this.catData.selectedQuestionCount);
            queryParams.append('category', this.catData.selectedCatId);
            queryParams.append('difficulty', this.catData.selectedDifficulty);
            queryParams.append('type', 'boolean');
            queryParams.append('token', this.catData.token);

            return fetch(
                'https://opentdb.com/api.php?' + queryParams.toString(),
            )
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
        },
        init() {
            this.score = 0;
            this.turn = 0;
            this.questions = null;
            this.gameOver = false;
            this.error = false;

            this.fetchQuestions().then((body) => {
                if (body.response_code !== 0 || body.results === null) {
                    this.curQuestion = `Could not find questions for ${this.catData.selectedCatText}. Select a different category?`;
                    this.error = true;
                    return;
                }

                this.questions = body.results;
                this.curQuestion = this.questions[this.turn].question;
            });
        },
        answer(selectedAnswer) {
            this.$emit('endQuiz');
        },
    },
    created() {
        this.init();
    },
};
</script>

<style></style>
