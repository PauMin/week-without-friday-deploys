<script setup lang="ts">
const github = useGithubStore();
const repo = ref(github.repo);

watch(repo, (newRepo) => {
  github.switchRepo(newRepo);
});

callOnce(github.fetchDeploys);
</script>

<template>
  <div class="bg-slate-950 h-screen flex flex-col justify-center items-center gap-y-14">
    <Dropdown :items="github.repos" v-model="repo" />
    <Counter :loading="!github.deployments.length" :number="github.weeksWithoutFridayDeploys" />
    <h2 class="text-slate-50 uppercase text-4xl text-center">Weeks without Friday deployments</h2>
  </div>
</template>
