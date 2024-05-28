import { useEffect, useState } from "react";
import httpCommon from "../utils/http-common";
import { successNotification } from "../helpers/notifications";

export const UsersTable = () => {
  const [userToDelete, setUserToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
    <div className="m-7 flex justify-center w-full">
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
                <th>Adresse</th>
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
                        setShowModal(!showModal);
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
            : type === "enseignants"
            ? users.map((obj, index) => (
                <tr className="hover" key={index}>
                  <td>
                    <img src={obj.profilePic} alt={obj.userName} />
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
                  <td>
                    {obj?.adresse?.wilaya +
                      obj?.adresse?.ville +
                      obj?.adresse?.adresse}
                  </td>
                  <td>
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
                        setShowModal(!showModal);
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

      <div
        className={
          "absolute top-1/3 h-1/3 w-1/3 right-1/3 bg-slate-800 rounded-2xl " +
          (showModal || "hidden")
        }
      >
        <h2 className="text-white text-3xl m-auto w-fit h-full py-10">
          supprimer utilisateur ?
        </h2>
        <button
          onClick={() => setShowModal(!showModal)}
          className="btn btn-accent bottom-2 left-2 absolute"
        >
          Annuler
        </button>
        <button
          onClick={() => {
            deleteUser(userToDelete);
            setUserToDelete(null);
            setShowModal(!showModal);
          }}
          className="btn btn-error bottom-2 right-2 absolute"
        >
          supprimer
        </button>
      </div>
    </div>
  );
};
