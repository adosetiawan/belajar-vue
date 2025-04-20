<script setup> 
import { computed,watchEffect,watch } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const currentHeader = computed(() => {
  return route.meta?.headerComponent || 'HeaderDefaultComponent';
});
const currentTitle = computed(() => {
  return route.meta?.headerTitle || 'Judul Defaults';
});

watchEffect(currentHeader, (newValue) => {
  console.log('Updated meta:', newValue);
});
</script>

<template>
  <!-- Preloader -->
  <!-- <div id="preloader">
    <div class="spinner-grow text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div> -->

  <!-- Internet Connection Status -->
<div class="internet-connection-status" id="internetStatus"></div>

<component :is="currentHeader" :title="currentTitle" />
  <div class="page-content-wrapper py-3">
    <RouterView />
  </div>
  <FooterNavComponent />
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
