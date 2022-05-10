<template>
    <div id="cat-select-container" class="cat-select__container">
        <form
            id="cat-select-form"
            class="cat-select__form"
            @submit.prevent="selectCat"
        >
            <h1 class="cat-select__title">
                Select Category {{ selectedCatText }}
            </h1>
            <select
                name="question-count"
                id="cat-select-count"
                class="cat-select__select"
                v-model.number="selectedQuestionCount"
            >
                <option value="5">5 Questions</option>
                <option value="10">10 Questions</option>
                <option value="15">15 Questions</option>
            </select>
            <select
                id="cat-select-select"
                class="cat-select__select"
                name="category"
                v-model="selectedCatId"
                :disabled="!catFetchComplete"
            >
                <option v-if="!catFetchComplete" value="0">Loading</option>
                <option v-for="category in categories" :value="category.id">
                    {{ category.name }}
                </option>
            </select>
            <select
                class="cat-select__select"
                id="cat-select-difficulty"
                name="difficulty"
                v-model="selectedDifficulty"
            >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            <button
                id="cat-select-submit"
                class="cat-select__submit"
                type="submit"
                :disabled="!catFetchComplete"
            >
                Start Quiz
            </button>
        </form>
    </div>
</template>

<script>
export default {
    emits: ['selectCat'],
    data() {
        return {
            selectedQuestionCount: 5,
            selectedDifficulty: 'easy',
            selectedCatId: null,
            catFetchComplete: false,
            categories: null,
            token: null,
        };
    },
    computed: {
        selectedCatText() {
            if (!this.categories) {
                return '';
            }

            let selectedCategory = this.categories.filter((category) => {
                return category.id === this.selectedCatId;
            })[0];

            return selectedCategory.name;
        },
    },
    methods: {
        fetchToken() {
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
        },
        fetchCategories() {
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
        },
        init() {
            this.selectedCatId = null;
            this.selectCatText = null;
            this.difficulty = null;
            this.questionCount = null;

            if (!this.catFetchComplete) {
                Promise.all([this.fetchToken(), this.fetchCategories()]).then(
                    (bodies) => {
                        this.token = bodies[0];
                        this.categories = bodies[1];
                        this.selectedCatId = this.categories[0].id;
                        this.catFetchComplete = true;
                    },
                );
            }
        },
        selectCat() {
            if (
                !this.selectedCatId ||
                !this.selectedDifficulty ||
                !this.selectedQuestionCount
            ) {
                return;
            }

            this.$emit('selectCat', {
                selectedCatId: this.selectedCatId,
                selectedCatText: this.selectedCatText,
                selectedDifficulty: this.selectedDifficulty,
                selectedQuestionCount: this.selectedQuestionCount,
                token: this.token,
            });
        },
    },
    created() {
        this.init();
    },
};
</script>

<style></style>
