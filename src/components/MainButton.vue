<script setup>
// const props = defineProps(['title'])
// const props = defineProps({
//     'title': {
//         type: String,
//     }
// })
const {title = 'Default',disabled=false} = defineProps({
    'title': {
        type: String,
    }
})
</script>
<template>
    <button :disabled>{{ title }}</button>
</template>