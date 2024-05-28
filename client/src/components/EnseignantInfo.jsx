import { Link, useParams } from "react-router-dom";
import httpCommon from "../utils/http-common";
import { useEffect, useState } from "react";


function f(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}



export const EnseignantInfo = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [avis, setAvis] = useState(null);
  useEffect(() => {
    httpCommon.get(`/user/${id}`).then((res) => {
      setUser(res.data.data);
      httpCommon
        .get(`/avis/${user._id}`)
        .then((res) => setAvis(res.data.data))
        .catch((err) => console.log(err));
    });
  }, []);
  return (
    <div className="w-full">
      <div
        style={{
          background: `linear-gradient(${f(0, 360)}deg, rgba(${f(0, 255)},${f(
            0,
            255
          )},${f(0, 255)},${Math.floor(Math.random() * 10) / 10}), rgba(${f(
            0,
            255
          )},${f(0, 255)},${f(0, 255)},${
            Math.floor(Math.random() * 10) / 10
          }))`,
        }}
        className="py-5 flex-col flex items-center lg:flex-row gap-6 lg:justify-center"
      >
        <div className="avatar text-center">
          <div className="w-40 rounded-full">
            <img src={user?.profilePic} />
          </div>
        </div>
        <div>
          <h1 className="text-5xl font-bold">{user?.userName}</h1>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-yellow-500 w-9 h-auto fill-current"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            <span className="text-2xl ml-2">{user?.avis}</span>
          </div>
          {user?.experience > 0 ? (
            <p>{user?.experience} ans d'experience</p>
          ) : (
            <p>pas d'experience</p>
          )}
          <div className="flex justify-between">
            <a target="_blank" href={user?.CV} className="underline">
              Cv -&gt;
            </a>
            <a target="_blank" href={user?.indentite} className="underline">
              identite -&gt;
            </a>
          </div>
        </div>
      </div>
      <p className="mt-5 text-xl text-center">
        Adresse: {user?.adresse?.wilaya}, {user?.adresse?.ville},{" "}
        {user?.adresse?.adresse}
      </p>
      <br />
      <div className="text-center">
        <span className="text-xl mr-2">matières :</span>
        {user?.modules.map((obj, index) => (
          <div key={index} className="mr-2 badge badge-outline">
            {obj}
          </div>
        ))}
      </div>
      <br />
      <br />
      <br />
      <h1 className="text-2xl text-center mr-2">horaires :</h1>
      <div className="my-7 flex justify-center">
        <table className="table w-2/3">
          <thead>
            <tr>
              <th>Jour</th>
              <th>Debut</th>
              <th>Fin</th>
            </tr>
          </thead>
          <tbody>
            {user?.availability.map((obj, index) => (
              <tr className="hover" key={index}>
                <td>{obj.dayName}</td>
                <td>{obj.startTime}</td>
                <td>{obj.endTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
