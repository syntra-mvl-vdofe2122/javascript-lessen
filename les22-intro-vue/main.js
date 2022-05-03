Vue.createApp({
    data() {
        return {
            count: 0,
            title: `I'm learning <em>Vue</em>`,
            disabled: false,
        };
    },
    methods: {
        addClick() {
            this.count++;
        },
        reduceClick() {
            this.count--;
        },
        updateTitle() {
            this.title += '!';
        },
        oddEvenClassMethod() {
            console.log('Method');
            return this.count % 2 ? 'odd' : 'even';
        },
    },
    computed: {
        oddEvenClass() {
            console.log('Computed');

            return {
                odd: this.count % 2 > 0,
                even: this.count % 2 === 0,
                underline: this.title.length > 30,
            };
        },
        tooMuchStyles() {
            return {
                color: this.count % 2 ? 'green' : 'yellow',
                'background-color': this.count % 2 ? 'yellow' : 'green',
                'font-size': this.title.length + 'px',
            };
        },
    },
}).mount('#app');
