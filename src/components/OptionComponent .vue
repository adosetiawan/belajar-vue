<script>
    export default {
        name: 'CompositionComponent',
        props: {
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                name: 'Ado Setiawan',
            };
        },
        methods: {
            showName() {
                return this.name = 'Has Name chenge to Adrian Setiawan';
            }
            // Define any methods needed for this component
        }
    };
</script>
<template>
    <h1>
        {{ name }}
    </h1>
    <button @click="showName">Click FOr Show name {{ name }}</button>
</template>