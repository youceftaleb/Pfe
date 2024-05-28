import { useEffect, useState } from "react";
import httpCommon from "../utils/http-common";
import { successNotification } from "../helpers/notifications";
import { Link } from "react-router-dom";

export const UsersTable = () => {
  const [userToDelete, setUserToDelete] = useState(null);
  const toggleActiveAccount = (id) => {
    httpCommon
      .put(`/admin/active/${id}`)
      .catch((err) => console.log(err.message));
  };
  const deleteUser = (id) => {
    httpCommon
      .delete(`/admin/delete/${id}`)
      .then((res) => {
        successNotification(res.data.message);
      })
      .catch((err) => console.log(err.message));
  };
  const type = window.location.pathname.split("/").pop();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (type === "parents") {
      httpCommon
        .get("/admin/parents")
        .then((res) => {
          if (res.status === 200) {
            setUsers(res.data.data);
          }
        })
        .catch((err) => console.log(err));
    } else if (type === "enseignants") {
      httpCommon
        .get("/admin/enseignants")
        .then((res) => {
          if (res.status === 200) {
            setUsers(res.data.data);
          }
        })
        .catch((err) => console.log(err.message));
    }
  }, [users]);
  return (
    <div className="p-3 w-full">
      <table className="table">
        <thead>
          <tr>
            <th>Photo profil</th>
            <th>Nom d'utilisateur</th>
            <th>Email</th>

            {type === "enseignants" && (
              <>
                <th>Avis</th>
                <th>CV</th>
                <th>Piece d'indentite</th>
              </>
            )}
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {type === "parents"
            ? users.map((obj, index) => (
                <tr className="hover" key={index}>
                  <td>
                    <img src={obj.profilePic} alt={obj.userName} />
                  </td>
                  <td>{obj.userName}</td>
                  <td>{obj.email}</td>
                  <td>
                    
                    <button
                      onClick={() => {
                        document.getElementById("my_modal_1").showModal();
                        setUserToDelete(obj._id);
                      }}
                      className="btn btn-error"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            : type === "enseignants"
            ? users.map((obj, index) => (
                <tr className="hover" key={index}>
                  <td>
                    <Link to={`/admin/dashboard/enseignants/${obj._id}`}>
                      <img src={obj.profilePic} alt={obj.userName} />
                    </Link>
                  </td>
                  <td>{obj.userName}</td>
                  <td>{obj.email}</td>
                  <td>{obj.avis}</td>
                  <td>
                    <a
                      className="underline hover:text-blue-400"
                      target="_blank"
                      href={obj.CV}
                    >
                      ouvrir -&gt;
                    </a>
                  </td>
                  <td className="underline hover:text-blue-400">
                    <a
                      className="underline hover:text-blue-400"
                      target="_blank"
                      href={obj.identite}
                    >
                      ouvrir -&gt;
                    </a>
                  </td>
                  <td className="grid grid-rows-1 grid-cols-3 gap-2">
                    {obj.activated ? (
                      <button
                        onClick={() => toggleActiveAccount(obj._id)}
                        className="btn btn-warning"
                      >
                        Desactiver
                      </button>
                    ) : (
                      <button
                        onClick={() => toggleActiveAccount(obj._id)}
                        className="btn btn-success"
                      >
                        Activer
                      </button>
                    )}
                    <button
                      onClick={() => {
                        document.getElementById("my_modal_1").showModal();
                        setUserToDelete(obj._id);
                      }}
                      className="btn btn-error"
                    >
                      Supprimer
                    </button>
                    <button className="btn btn-primary">Modifier</button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h2 className="text-3xl m-auto w-fit py-10">
            supprimer utilisateur ?
          </h2>
          <div className="modal-action">
            <form method="dialog" className="w-full flex justify-between">
              <button className="btn btn-accent ">Annuler</button>
              <button
                onClick={() => {
                  deleteUser(userToDelete);
                  setUserToDelete(null);
                }}
                className="btn btn-error"
              >
                supprimer
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};
