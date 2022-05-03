Vue.createApp({
    data() {
        return {
            result: '',
            numOne: null,
            numTwo: null,
            selectedOperator: null,
            calculated: false,
            operators: ['/', '*', '-', '+'],
        };
    },
    methods: {
        numberInput(number) {
            if (this.result.includes('.') && number === '.') {
                return;
            }

            if (this.selectedOperator === null) {
                if (this.calculated) {
                    this.result = '';
                    this.calculated = false;
                }

                this.result += number;
                this.numOne = parseFloat(this.result);
            } else {
                if (this.numTwo === null) {
                    this.result = '';
                }

                this.result += number;
                this.numTwo = parseFloat(this.result);
            }
        },
        operatorInput(operator) {
            if (
                this.numOne !== null &&
                this.numTwo !== null &&
                this.selectedOperator !== null
            ) {
                this.calculateResult();
            }

            this.selectedOperator = operator;
        },
        calculateResult() {
            if (
                this.numOne === null ||
                this.numTwo === null ||
                this.selectedOperator === null
            ) {
                return;
            }

            switch (this.selectedOperator) {
                case '+': {
                    let result = this.numOne + this.numTwo;
                    this.result = result.toString();
                    this.numOne = result;
                    break;
                }
                case '-': {
                    let result = this.numOne - this.numTwo;
                    this.result = result.toString();
                    this.numOne = result;
                    break;
                }
                case '/': {
                    let result = this.numOne / this.numTwo;
                    this.result = result.toString();
                    this.numOne = result;
                    break;
                }
                case '*': {
                    let result = this.numOne * this.numTwo;
                    this.result = result.toString();
                    this.numOne = result;
                    break;
                }
            }

            this.numTwo = null;
            this.selectedOperator = null;
            this.calculated = true;
        },
    },
}).mount('#calculator');
