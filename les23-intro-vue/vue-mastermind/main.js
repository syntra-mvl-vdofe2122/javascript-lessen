Vue.createApp({
    data() {
        return {
            gameSettings: {
                minNum: 0,
                maxNum: 4,
                numCount: 5,
                maxTries: 5,
            },
            guessCount: 0,
            curGuess: [],
            gameOver: false,
            solution: [1, 2, 3, 4, 0],
            tries: [
                {
                    try: [1, 2, 3, 4, 0],
                    correctNum: 2,
                    correctNumAndPlace: 3,
                },
                {
                    try: [1, 2, 3, 4, 0],
                    correctNum: 2,
                    correctNumAndPlace: 3,
                },
                {
                    try: [1, 2, 3, 4, 0],
                    correctNum: 2,
                    correctNumAndPlace: 3,
                },
            ],
            guessBtnText: 'Try',
            winnerBtnText: '',
        };
    },
    methods: {
        generateSolution() {
            this.solution = [];

            for (let i = 0; i < this.gameSettings.numCount; i++) {
                let randomNum =
                    Math.floor(
                        Math.random() *
                            (this.gameSettings.maxNum +
                                1 -
                                this.gameSettings.minNum),
                    ) + this.gameSettings.minNum;

                this.solution.push(randomNum);
            }
        },
        init() {
            this.generateSolution();
            this.gameOver = false;
            this.tries = [];
            this.guessCount = 0;
            this.curGuess = [];

            for (let i = 0; i < this.gameSettings.numCount; i++) {
                this.curGuess.push('');
            }
        },
        guess() {
            if (this.gameOver) {
                return;
            }

            for (let i = 0; i < this.curGuess.length; i++) {
                if (
                    !(
                        typeof this.curGuess[i] === 'number' &&
                        this.curGuess[i] >= this.gameSettings.minNum &&
                        this.curGuess[i] <= this.gameSettings.maxNum
                    )
                ) {
                    this.guessBtnText = 'Invalid guess, try again.';
                    return;
                }
            }

            let correctNumAndPlace = this.countCorrectNumAndPlace();
            let correctNum = this.countCorrectNum() - correctNumAndPlace;

            this.guessCount++;

            if (correctNumAndPlace === this.gameSettings.numCount) {
                this.winnerBtnText = 'You won, play again?';
                this.gameOver = true;
            } else if (this.guessCount === this.gameSettings.maxTries) {
                this.winnerBtnText = 'You lost, play again?';
                this.gameOver = true;
            }

            this.tries.push({
                try: [...this.curGuess],
                correctNum,
                correctNumAndPlace,
            });
        },
        countCorrectNum() {
            let solutionCopy = [...this.solution];

            return this.curGuess.reduce((prevVal, element) => {
                let indexFound = solutionCopy.indexOf(element);

                if (indexFound > -1) {
                    prevVal++;
                    solutionCopy.splice(indexFound, 1);
                }

                return prevVal;
            }, 0);
        },
        countCorrectNumAndPlace() {
            return this.curGuess.reduce((prevVal, element, index) => {
                if (element === this.solution[index]) {
                    prevVal++;
                }

                return prevVal;
            }, 0);
        },
    },
    computed: {},
    created() {
        this.init();
    },
}).mount('#app');
