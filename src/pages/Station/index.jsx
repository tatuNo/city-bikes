import { useParams } from "react-router-dom";
import useStation from "../../hooks/useStation";

const Station = () => {
  const id = useParams().id;
  const { isLoading, station } = useStation(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>Hello {id}</div>;
};

export default Station;
