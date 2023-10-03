import {gitHubApi} from "../../api/gitHubApi";
import {sleep} from "../../helpers/sleep";
import {Label} from "../interfaces/label";
import {useQuery} from "@tanstack/react-query";

const getLabels = async (): Promise<Label[]> => {
    await sleep(2);
    const {data} = await gitHubApi.get<Label[]>("/labels");
    return data;
};

export const useLabels = () => {
    const labelsQuery = useQuery(["labels"], getLabels, {
        //1 hora
        staleTime: 1000 * 60 * 60
    });

    return labelsQuery;
};
