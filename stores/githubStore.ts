interface Deployment {
    id: number;
    environment: string;
    creator: {
        login: string;
    };
    created_at: string;
    updated_at: string;
    statuses_url: string;
}

export const useGithubStore = defineStore('github', {
    state: () => ({
        deployments: [] as Deployment[],
        repo: null as string | null,
        repos: [] as { key: string, value: string }[],
        error: null as string | null,
    }),
    getters: {
        hasError(): boolean {
            return this.error !== null;
        },

        lastFridayDeploy(): Deployment | null {
            if (!this.deployments.length) {
                return null;
            }

            const lastFriday = this.deployments.find((deployment) => {
                const date = new Date(deployment.created_at);
                return date.getDay() === 5;
            });

            return lastFriday || null;
        },

        weeksWithoutFridayDeploys(): string | null {
            if (!this.deployments.length) {
                return null;
            }

            const lastFriday = this.lastFridayDeploy;
            if (!lastFriday) {
                return this.weekCount;
            }

            const last = new Date(lastFriday.created_at);
            const now = new Date();
            const diff = now.getTime() - last.getTime();
            return Math.floor(diff / (1000 * 60 * 60 * 24 * 7)).toString();
        },

        weekCount(): string | null {
            if (!this.deployments.length) {
                return null;
            }

            const first = new Date(this.deployments[0].created_at);
            const last = new Date(this.deployments[this.deployments.length - 1].created_at);
            const diff = last.getTime() - first.getTime();
            return Math.floor(diff / (1000 * 60 * 60 * 24 * 7)) + '+';
        }
    },
    actions: {
        async fetchRepos() {
            try {
                const data = await $fetch('/api/github/repositories');

                this.repos = data.map((repo) => ({ key: repo.name, value: repo.name }));
                this.repo = this.repos[0].key;
            } catch (error: any) {
                this.error = error.message;
            }
        },
        async fetchDeploys() {
            try {
                this.deployments = await $fetch(`/api/github/deployments?repo=${this.repo}`);
            } catch (error: any) {
                this.error = error.message;
            }
        },

        async switchRepo(repo: string) {
            this.repo = repo;
            this.deployments = [];
            await this.fetchDeploys();
        }
    },
});
