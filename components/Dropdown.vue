
<script setup lang="ts">
const props = defineProps<{
    items: object[];
}>();

const showList = ref(false);
const model = defineModel();
const activeItem = computed(() => props.items.find(item => item.key === model.value).value);

function updateModel(key: string) {
    model.value = key;
    showList.value = false;
}
</script>

<template>
    <div>
        <button class="text-slate-400 uppercase text-4xl" @click="() => showList = !showList" v-click-outside="() => showList = false">{{ activeItem }}</button>
        <div class="flex justify-center">
            <Transition enter-from-class="opacity-0" leave-to-class="opacity-0" enter-active-class="transition-opacity" leave-active-class="transition-opacity">
                <ul v-show="showList" class="absolute py-2 rounded border border-slate-800 bg-slate-900 mt-4 flex flex-col gap-2 h-52">
                    <perfect-scrollbar>
                        <li v-for="item in items" :key="item.key" class="px-8">
                            <button class="text-slate-400 text-2xl uppercase" @click="() => updateModel(item.key)">{{ item.value }}</button>
                        </li>
                    </perfect-scrollbar>
                </ul>
            </Transition>
        </div>
    </div>
</template>