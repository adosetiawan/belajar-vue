<script setup>
import { ref } from 'vue';
    const greeting = "Hello, World!";
    const bodyBlog = "<p style='color:blue;'>This is a blog post.</p>";
</script>

<template>
    <div>
        <h1>Internal Bindings Component ss</h1>
        <div>
            <h2>Greeting: {{ greeting }}</h2>
            <div v-html="bodyBlog"></div>
            {{ bodyBlog }}
        </div>
    </div>
</template>

