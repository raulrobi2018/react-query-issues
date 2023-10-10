import axios from "axios";

const TOKEN =
    "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";

export const gitHubApi = axios.create({
    baseURL: "https://api.github.com/repos/facebook/react",
    headers: {Authorization: `Bearer ${TOKEN}`}
});
