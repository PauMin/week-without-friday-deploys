import { octokit, repoOwner } from "~/server/config";

export default defineEventHandler(async event => {
    const { data } = await octokit.request('GET /orgs/{org}/repos', {
        org: repoOwner,
    })

    return data;
});