import React, { useEffect, useState } from "react";
import ParentAccountLayout from "../layout/ParentAccountLayout";
import httpCommon from "../utils/http-common";
import { useSelector } from "react-redux";
import { register, format } from "timeago.js";
import { FaCheckCircle, FaTrashAlt } from "react-icons/fa";
import fr from "timeago.js/lib/lang/fr";

export const ParentDemandes = () => {
  register("mylocal", fr);
  const [demandes, setDemandes] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    httpCommon.get(`/demande/parent`).then((res) => {
      setDemandes(res.data.data);
    });
  }, []);
  const deleteDem = (id) => {
    httpCommon.delete(`/demande/${id}`).then((res) => {
      location.reload();
    });
  };
  return (
    <ParentAccountLayout>
      <div className="px-7 py-7">
        {demandes.map((demande, index) => (
          <div
            key={index}
            className="border mt-4 border-gray-400 rounded-b p-4 flex justify-between items-center"
          >
            <pre className="text-gray-700 text-base mb-8">
              {demande.message}
            </pre>

            {demande.checked ? (
              demande?.acceptee ? (
                <div className="badge badge-lg badge-outline badge-success">
                  Demande acceptée
                </div>
              ) : (
                <div className="badge badge-lg badge-outline badge-error">
                  Demade refusée
                </div>
              )
            ) : (
              <div
                onClick={() => deleteDem(demande._id)}
                className="btn btn-error btn-outline"
              >
                <FaTrashAlt /> supprimer
              </div>
            )}
          </div>
        ))}
      </div>
    </ParentAccountLayout>
  );
};
