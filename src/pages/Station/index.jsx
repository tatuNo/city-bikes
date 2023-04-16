import { useParams } from "react-router-dom";

const Station = () => {
  const id = useParams().id;
  return <div>Hello {id}</div>;
};

export default Station;
