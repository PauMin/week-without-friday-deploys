import { octokit, repoOwner } from "~/server/config";

export default defineEventHandler(async event => {
    const { repo } = await getQuery(event);

    const { data } = await octokit.request('GET /repos/{owner}/{repo}/deployments', {
        owner: repoOwner,
        repo: repo as string,
        environment: 'production',
    });

    return data.map((deployment) => ({
        id: deployment.id,
        environment: deployment.environment,
        creator: { login: deployment.creator?.login },
        created_at: deployment.created_at,
        updated_at: deployment.updated_at,
        statuses_url: deployment.statuses_url,
    }));
});
