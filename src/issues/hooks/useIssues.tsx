import React from "react";
import {Issue} from "../interfaces";
import {gitHubApi} from "../../api/gitHubApi";
import {useQuery} from "@tanstack/react-query";

const getIssues = async (): Promise<Issue[]> => {
    const {data} = await gitHubApi.get<Issue[]>("/issues");

    return data;
};

export const useIssues = () => {
    const issuesQuery = useQuery(["issues"], getIssues);

    return {issuesQuery};
};
