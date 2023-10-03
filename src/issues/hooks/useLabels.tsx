import { gitHubApi } from "../../api/gitHubApi";
import { sleep } from "../../helpers/sleep";
import { Label } from "../interfaces/label";
import { useQuery } from "@tanstack/react-query";

const getLabels = async (): Promise<Label[]> => {
  await sleep(2);
  const { data } = await gitHubApi.get<Label[]>("/labels");
  return data;
};

export const useLabels = () => {
  const labelsQuery = useQuery(["labels"], getLabels, {
    //1 hora
    /* staleTime: 1000 * 60 * 60 */
    //El placeholderData sirve para precargar datos antes de mostrar
    //los datos definitivos, o sea, por mientras se hace la petición,
    //muestra esos datos. No se mostrará el Loading porque hay datos iniciales
    placeholderData: [
      {
        id: 791921801,
        node_id: "MDU6TGFiZWw3OTE5MjE4MDE=",
        url: "https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F",
        name: "❤️",
        color: "ffffff",
        default: false,
      },
      {
        id: 717031390,
        node_id: "MDU6TGFiZWw3MTcwMzEzOTA=",
        url: "https://api.github.com/repos/facebook/react/labels/good%20first%20issue",
        name: "good first issue",
        color: "6ce26a",
        default: true,
      },
    ],
    //Es similar al placeholderData pero mostrará la información que esté
    //fresca. Esto requiere de que se haya definido un staleTime
    //initialData: [],
  });

  return labelsQuery;
};
