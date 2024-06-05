import { useEffect, useState } from "react";
import httpCommon from "../utils/http-common";
import { Demande } from "./";

export const Demandes = () => {
  const [demandes, setDemandes] = useState(null);
  useEffect(() => {
    httpCommon
      .get("/demande")
      .then((res) => (res.status === 200 ? setDemandes(res.data.data) : null))
      .catch((err) => console.log(err.message));
  }, []);
  console.log(demandes);
  return (
    <div className="w-3/4 px-10">
      {demandes?.map((demande, index) => (
        <div key={index} className="mt-4">
          <Demande demande={demande} />
        </div>
      ))}
    </div>
  );
};
