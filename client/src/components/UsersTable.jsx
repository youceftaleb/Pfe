import { useEffect } from "react";
import httpCommon from "../utils/http-common";

export const UsersTable = () => {
  const type = window.location.pathname.split("/").pop();
  let users = [
    { userName: "moh", email: "lskdjfa" },
    { userName: "moh", email: "lskdjfa" },
    { userName: "moh", email: "lskdjfa" },
    { userName: "moh", email: "lskdjfa" },
    { userName: "moh", email: "lskdjfa" },
    { userName: "moh", email: "lskdjfa" },
    { userName: "moh", email: "lskdjfa" },
    { userName: "moh", email: "lskdjfa" },
  ];
  useEffect(() => {
    if (type === "parents") {
      httpCommon.get();
    } else if (type === "enseignants") {
      httpCommon.get();
    }
  }, []);
  return (
    <div className="m-7 flex justify-center w-full">
      <table className="table">
        <thead>
          <tr>
            <th>user-name</th>
            <th>password</th>
            <th>options</th>
          </tr>
        </thead>
        <tbody>
          {type === "parents"
            ? users.map((obj, index) => (
                <tr className="hover" key={index}>
                  <td>{obj.userName}</td>
                  <td>{obj.email}</td>
                  <td>
                    <button className="btn btn-error">Supprimer</button>
                    <button className="btn btn-primary">Modifier</button>
                  </td>
                </tr>
              ))
            : users.map((obj, index) => (
                <tr className="hover" key={index}>
                  <td>{obj.userName}</td>
                  <td>{obj.email}</td>
                <td>
                  <button className="btn btn-success">Activer</button>
                    <button className="btn btn-error">Supprimer</button>
                    <button className="btn btn-primary">Modifier</button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};
