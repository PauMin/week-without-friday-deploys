<script setup lang="ts">
const github = useGithubStore();
const {repo} = storeToRefs(github);

watch(repo, (newRepo) => {
  if (newRepo) {
    github.switchRepo(newRepo);
  }
});

await callOnce(github.fetchRepos);
callOnce(github.fetchDeploys);
</script>

<template>
  <div class="bg-slate-950 h-screen flex flex-col justify-center items-center gap-y-14">
    <Dropdown v-if="github.repos.length" :items="github.repos" v-model="repo" />
    <Counter :loading="!github.deployments.length" :number="github.weeksWithoutFridayDeploys" />
    <h2 class="text-slate-50 uppercase text-4xl text-center">Week/s without Friday deployments</h2>
  </div>
</template>
