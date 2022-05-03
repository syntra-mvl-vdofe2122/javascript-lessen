Vue.createApp({
    data() {
        return {
            randomWords: [
                'condition',
                'bottom',
                'lineage',
                'trip',
                'reporter',
                'paper',
                'colorful',
                'agent',
                'justify',
                'torture',
                'cap',
                'earthflax',
                'payment',
                'research',
                'picture',
                'garage',
                'honor',
                'memorial',
                'planet',
                'biography',
                'profound',
                'rumor',
                'gear',
                'bedroom',
                'orthodox',
                'penalty',
                'grief',
                'promote',
                'roof',
                'suite',
                'moving',
                'killer',
                'museum',
                'essay',
                'fever',
                'dignity',
                'shadow',
                'enjoy',
                'kill',
                'shy',
                'counter',
                'pawn',
                'button',
                'bullet',
                'skin',
                'rate',
                'shop',
                'consider',
                'other',
                'prospect',
            ],
            letters: {
                a: '',
                b: '',
                c: '',
                d: '',
                e: '',
                f: '',
                g: '',
                h: '',
                i: '',
                j: '',
                k: '',
                l: '',
                m: '',
                n: '',
                o: '',
                p: '',
                q: '',
                r: '',
                s: '',
                t: '',
                u: '',
                v: '',
                w: '',
                x: '',
                y: '',
                z: '',
            },
            word: '',
            wordResult: [],
            letter: '',
            stage: 1,
            gameOver: false,
            message: '',
        };
    },
    computed: {
        imageSrc() {
            return `images/hangman0${this.stage}.png`;
        },
    },
    methods: {
        letterClicked(letter) {
            if (this.gameOver) {
                return;
            }
            let letterCount = 0;
            for (i = 0; i < this.word.length; i++) {
                if (letter === this.word[i]) {
                    letterCount++;
                    this.wordResult[i] = letter;
                }
            }

            if (letterCount >= 1) {
                this.letters[letter] = 'success';
            } else {
                this.letters[letter] = 'failed';
                this.stage++;
            }

            this.endGameCheck();
        },
        randomWord() {
            let randomNumber = Math.floor(
                Math.random() * this.randomWords.length,
            );
            this.word = this.randomWords[randomNumber];
            this.wordResult = this.word.split('').map(() => '');
        },
        init() {
            this.gameOver = false;
            this.stage = 1;
            this.message = '';

            Object.keys(this.letters).forEach((letter) => {
                this.letters[letter] = '';
            });

            this.randomWord();
        },
        endGameCheck() {
            let filledLetters = this.wordResult.filter(
                (letter) => letter.length > 0,
            );

            if (filledLetters.length === this.word.length) {
                this.gameOver = true;
                this.message = 'You won, want to play again?';
            }

            if (this.stage === 9) {
                this.gameOver = true;
                this.message = `You lost, but guessed ${filledLetters.length} letters. Want to play again?`;
                this.wordResult = this.word.split('');
            }
        },
    },
    created() {
        this.init();
    },
}).mount('#app');
