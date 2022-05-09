Vue.createApp({
    data() {
        return {
            name: 'Korneel',
            age: 0,
            pets: false,
            food: 'cookie',
            foods: {
                cookie: 'Cookie',
                chocolate: 'Chocolate',
                candy: 'Candy',
            },

            numbers: [1, 2, 3, 4],
        };
    },
}).mount('#app');
