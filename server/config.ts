import { Octokit } from "octokit";

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});
const repoOwner = process.env.REPO_OWNER as string;

export {
    octokit,
    repoOwner,
};