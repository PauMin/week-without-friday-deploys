<script setup lang="ts">
defineProps<{ active?: boolean }>();
const emit = defineEmits(['click']);

function clickAction() {
    emit('click');
}
</script>

<template>
    <button class="py-1 w-52 border rounded bg-cyan-900 text-slate-50" :class="{'border-cyan-900': !active, 'border-cyan-400': active}" @click="clickAction">
        <slot />
    </button>
</template>