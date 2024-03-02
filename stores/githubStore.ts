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
        owner: 'cybetic',
        repo: 'gameplatform',
        repos: [
            {key: 'gameplatform', value: 'Game Platform'},
            {key: 'backoffice', value: 'Backoffice'},
            {key: 'sportsbook', value: 'Sportsbook'},
        ],
        error: null as string | null,
    }),
    getters: {
        hasError(): boolean {
            return this.error !== null;
        },

        errorMessage(): string | null {
            return this.error;
        },

        lastFridayDeploy(): Deployment | null {
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

        weekCount(): string {
            const first = new Date(this.deployments[0].created_at);
            const last = new Date(this.deployments[this.deployments.length - 1].created_at);
            const diff = last.getTime() - first.getTime();
            return Math.floor(diff / (1000 * 60 * 60 * 24 * 7)) + '+';
        }
    },
    actions: {
        async fetchDeploys() {
            try {
                const data = await $fetch(`/api/github/deployments?owner=${this.owner}&repo=${this.repo}`);

                this.deployments = data.map((deployment) => ({
                    id: deployment.id,
                    environment: deployment.environment,
                    creator: { login: deployment.creator?.login },
                    created_at: deployment.created_at,
                    updated_at: deployment.updated_at,
                    statuses_url: deployment.statuses_url,
                })) as Deployment[];
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