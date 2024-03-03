import { octokit, repoOwner } from "~/server/config";

export default defineEventHandler(async event => {
    const { repo } = await getQuery(event);

    const { data } = await octokit.request('GET /repos/{owner}/{repo}/deployments', {
        owner: repoOwner,
        repo: repo as string,
        environment: 'production',
    });

    return data;
});