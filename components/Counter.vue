<script setup lang="ts">
defineProps<{ loading?: boolean, number?: string }>();
</script>

<template>
    <div class="text-slate-50">
        <Loader class="w-24 h-32" v-if="loading" />
        <h1 class="text-9xl font-bold" v-else>{{ number }}</h1>
    </div>
</template>