import { FC } from "react";
import { Loading } from "../../shared/components/Loading";
import { useLabels } from "../hooks/useLabels";

interface Props {
  selectedLabels: string[];
  onChange: (labelName: string) => void;
}

export const LabelPicker: FC<Props> = ({ selectedLabels, onChange }) => {
  const labelsQuery = useLabels();

  /*
        El isLoading es utilizado cuando estamos cargando por primera vez la data
        y no tenemos nada en cache. El isFetching es cuando se están obteniendo los 
        datos nuevamente.
        Usualmente se va a utilizar más el isLoading
    */
  if (labelsQuery.isLoading) {
    return <Loading />;
  }
  return (
    <div>
      {labelsQuery.data?.map((label) => (
        <span
          key={label.id}
          className={`badge rounded-pill m-1 label-picker ${
            selectedLabels.includes(label.name) ? "label-active" : ""
          }`}
          style={{
            border: `1px solid #${label.color}`,
            color: `${label.color}`,
          }}
          onClick={() => onChange(label.name)}
        >
          {label.name}
        </span>
      ))}
    </div>
  );
};
