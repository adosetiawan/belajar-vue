<script setup>
import { ref } from 'vue';

 const name2 = ref('Another Option Component');
 const changeName = () => {
    name2.value = 'Adrian Setiawan';
  };
</script>
<template>
    <h1>{{ name2 }}</h1>


    <button @click="changeName">Click For Show name {{ name2 }}</button>
    <p>Another Option Component</p>
</template>