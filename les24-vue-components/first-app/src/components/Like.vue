<template>
    <div class="like">
        <slot />

        <p>Likes: {{ count }}</p>

        <button @click="addOne">Like</button>
    </div>
</template>

<script>
export default {
    props: {
        startCount: {
            type: Number,
            default: 0,
        },
    },
    emits: ['addOne'],
    data() {
        return {
            count: this.startCount,
        };
    },
    methods: {
        addOne() {
            this.count++;
            this.$emit('addOne', this.count);
        },
    },
};
</script>

<style>
.like {
    border: solid 2px gold;
    padding: 2rem;
}
</style>
