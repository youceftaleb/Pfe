import { useParams } from "react-router-dom";
export const EnseignantInfo = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>EnseignantInfo</h1>
      <p>enseignant id is: {id}</p>
    </div>
  );
};
