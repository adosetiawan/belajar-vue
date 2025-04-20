<script setup>
defineProps({
  title: String,
})
</script>
<template>
  <div class="header-area" id="headerArea">
    <div class="container">
      <!-- Header Content -->
      <div class="header-content position-relative d-flex align-items-center justify-content-between">
        <!-- Back Button -->
        <div class="back-button">
          <a href="#" @click="$router.back()" class="text-decoration-none">
            <i class="bi bi-arrow-left-short"></i>
          </a>
        </div>

        <!-- Page title -->
        <div class="page-heading">
          <h6 class="mb-0">{{ title }}</h6>
        </div>

        <!-- Settings -->
        <div class="setting-wrapper">
          <div class="setting-trigger-btn" id="settingTriggerBtn">
            <i class="bi bi-gear"></i>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>