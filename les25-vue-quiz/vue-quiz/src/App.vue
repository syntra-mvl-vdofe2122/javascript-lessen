<template>
    <CatSelect v-if="showCatSelect" @selectCat="selectCat" />

    <Quiz v-else :cat-data="catData" @end-quiz="endQuiz" />
</template>

<script>
import CatSelect from './components/CatSelect.vue';
import Quiz from './components/Quiz.vue';

export default {
    components: {
        Quiz,
        CatSelect,
    },
    data() {
        return {
            showCatSelect: true,
            catData: null,
        };
    },
    computed: {},
    methods: {
        selectCat(catData) {
            console.log(catData);
            this.showCatSelect = false;
            this.catData = catData;
        },
        endQuiz() {
            this.showCatSelect = true;
        },
    },
    created() {},
};
</script>

<style>
@import './assets/style.css';
</style>
