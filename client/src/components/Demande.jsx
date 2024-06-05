import { useEffect, useState } from "react";
import httpCommon from "../utils/http-common";
import { format, register } from "timeago.js";
import fr from "timeago.js/lib/lang/fr";
import { MdError } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

export const Demande = ({ demande }) => {
  register("mylocal", fr);
  const [user, setUser] = useState(null);
  useEffect(() => {
    httpCommon
      .get(`/user/${demande.parentId}`)
      .then((res) => (res.status === 200 ? setUser(res.data.data) : null));
  }, []);
  const refuseDem = () => {
    httpCommon.post(`/demande/refuse/${demande._id}`).then((res) => {
      location.reload();
    });
  };
  const acceptDem = () => {
    httpCommon.post(`/demande/accept/${demande._id}`).then((res) => {
      location.reload();
    });
  };
  return (
    <>
      <div className="border  border-gray-400 rounded-b p-4 flex justify-between items-center">
        <pre className="text-gray-700 text-base mb-8">{demande.message}</pre>

        <div className="flex mb-4 items-center">
          <img
            className="w-20 h-20 rounded-full mr-4"
            src={user?.profilePic}
            alt="Avatar of Jonathan Reinink"
          />
          <div className="text-sm">
            <p className="text-gray-900 leading-none">{user?.userName}</p>
            <p className="text-gray-600">
              {format(user?.createdAt, "mylocal")}
            </p>
          </div>
        </div>

        {demande.checked ? (
          demande.acceptee ? (
            <div onClick={acceptDem} className="badge badge-lg badge-outline badge-success">
              Demande acceptée
            </div>
          ) : (
            <div onClick={refuseDem} className="badge badge-lg badge-outline badge-error">
              Demande refusée
            </div>
          )
        ) : (
          <div className="flex flex-col gap-2">
            <div
              onClick={acceptDem}
              className="btn btn-outline btn-accent w-full"
            >
              <FaCheckCircle /> Accepter
            </div>
            <div onClick={refuseDem} className="btn btn-error btn-outline">
              <MdError /> refuser
            </div>
          </div>
        )}
      </div>
    </>
  );
};
