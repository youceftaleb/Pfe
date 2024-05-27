import { useEffect, useState } from "react";
import httpCommon from "../utils/http-common";

export const UsersTable = () => {
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
        .catch((err) => console.log(err));
    }
  }, [users]);
  return (
    <div className="m-7 flex justify-center w-full">
      <table className="table">
        <thead>
          <tr>
            <th>Photo profil</th>
            <th>user-name</th>
            <th>email</th>

            {type === "enseignants" && (
              <>
                <th>avis</th>
                <th>CV</th>
                <th>piece d'indentite</th>
                <th>Adresse</th>
              </>
            )}
            <th>options</th>
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
                    <button className="btn btn-error">Supprimer</button>
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
                    {obj.adresse.wilaya +
                      obj.adresse.ville +
                      obj.adresse.adresse}
                  </td>
                  <td>
                    {obj.activated ? (
                      <button className="btn btn-warning">Desactiver</button>
                    ) : (
                      <button className="btn btn-success">Activer</button>
                    )}
                    <button className="btn btn-error">Supprimer</button>
                    <button className="btn btn-primary">Modifier</button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};
