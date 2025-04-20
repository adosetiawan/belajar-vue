<script setup>
defineProps({
  to: {
	type: String,
	required: true,
	default: '/'
  }
});
</script>
<template>
<RouterLink :to="to" class="text-decoration-none">
		<div class="card shadow-sm border-0">
		<div class="card-body px-0 py-2">
			<div class="feature-card mx-auto text-center">
				<!-- render slot here -->
				<slot></slot>
			</div>
		</div>
	</div>
</RouterLink>
</template>
