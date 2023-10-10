import React from "react";
import {useQuery} from "@tanstack/react-query";
import {Issue} from "../interfaces";
import {gitHubApi} from "../../api/gitHubApi";
import {sleep} from "../../helpers/sleep";

export const getIssueInfo = async (issueNumber: number): Promise<Issue> => {
    //Esta demora es intencional
    await sleep(2);
    const {data} = await gitHubApi.get<Issue>(`/issues/${issueNumber}`);
    return data;
};

export const getIssueComments = async (
    issueNumber: number
): Promise<Issue[]> => {
    //Esta demora es intencional
    await sleep(2);
    const {data} = await gitHubApi.get<Issue[]>(
        `/issues/${issueNumber}/comments`
    );
    return data;
};

export const useIssue = (issueNumber: number) => {
    const issueQuery = useQuery(["issue", issueNumber], () =>
        getIssueInfo(issueNumber)
    );

    //En este caso esta query solo se va a ejecutar cuando el issueQuery traiga datos
    //Se hace mediante el atributo enabled y funciona como una dependencia
    const commentsQuery = useQuery(
        ["issue", issueNumber, "comments"],
        () => getIssueComments(issueNumber),
        //hasta que no se convierta esta condición en true, no se hace la petición
        {enabled: issueQuery.data !== undefined}
    );

    return {issueQuery, commentsQuery};
};
