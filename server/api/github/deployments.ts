import { octokit } from "~/server/config";

export default defineEventHandler(async event => {
    const { owner, repo } = await getQuery(event);

    const { data } = await octokit.request('GET /repos/{owner}/{repo}/deployments', {
        owner: owner as string,
        repo: repo as string,
        environment: 'production',
    });

    return data;
});