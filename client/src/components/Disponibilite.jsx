import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import httpCommon from "../utils/http-common";
import { FaTrashAlt } from "react-icons/fa";

export const Disponibilite = () => {
  const [disp, setDisp] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const { register, handleSubmit } = useForm();
  useEffect(() => {
    httpCommon.get(`/user/${currentUser._id}`).then((res) => {
      setDisp(res.data.data.disponibilite);
    });
  }, []);

  const onSubmit = (data) => {
    httpCommon
      .post("/enseignant/disp", { ...data })
      .then((res) => {
        location.reload();
      })
      .catch((err) => console.log(err.message));
  };
  const deleteDisp = (id) => {
    httpCommon.post(`/enseignant/disp/${id}`).then(res => {
      console.log(res.data);
      location.reload()
    })
  }
  return (
    <div className="w-3/4">
      <h1 className="text-center text-3xl my-4">Tableau de disponibilite</h1>
      <div className="my-7">
        <table className="table w-3/4 mx-auto">
          <thead>
            <tr>
              <th>Jour</th>
              <th>Debut</th>
              <th>Fin</th>
            </tr>
          </thead>
          <tbody>
            {disp?.map((obj, index) => (
              <tr className="hover" key={index}>
                <td>{obj.dayName}</td>
                <td>{obj.startTime}</td>
                <td className="flex justify-between items-center">
                  <h1>{obj.endTime}</h1>
                  <div
                    onClick={() => deleteDisp(obj._id)}
                    className="btn btn-ghost"
                  >
                    <FaTrashAlt />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() => document.getElementById("my_modal_2").showModal()}
          className="btn btn-accent"
        >
          ajouter
        </button>
      </div>

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="modal-action">
            <form
              onSubmit={handleSubmit(onSubmit)}
              method="dialog"
              className="w-full"
            >
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Jour:</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full mb-3"
                  required
                  {...register("dayName")}
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">temps de debut:</span>
                </div>
                <input
                  type="time"
                  className="input input-bordered w-full mb-3"
                  required
                  {...register("startTime")}
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">temps de debut:</span>
                </div>
                <input
                  type="time"
                  className="input input-bordered w-full mb-3"
                  required
                  {...register("endTime")}
                />
              </label>
              <input type="submit" className="btn btn-accent float-right" />
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};
