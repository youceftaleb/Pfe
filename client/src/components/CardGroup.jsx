import { useEffect, useState } from "react";
import httpCommon from "../utils/http-common";
import { EnseignantCard } from ".";

export const CardGroup = () => {
  const [professors, setProfessors] = useState(null);
  useEffect(() => {
    httpCommon
      .get("/enseignant")
      .then((res) => (res.status === 200 ? setProfessors(res.data.data) : null))
      .catch((err) => errorNotification(err.response.data.message));
  }, []);
  return (
    <div className="grid xl:grid-cols-5 lg:grid-cols-4 gap-6 md:grid-cols-2 bg-slate-200 pt-7 text-center">
      {professors?.map((ens, index) => (
        <div key={index}>
          <EnseignantCard enseignat={ens} />
        </div>
      ))}
    </div>
  );
};
