import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import httpCommom from "../utils/http-common";
export const Cours = ({ cours = null }) => {
  const { register, handleSubmit } = useForm();
  const { currentUser } = useSelector((state) => state.user);
  if (!cours) cours = currentUser.cours;
  const onSubmit = (data) => {
    httpCommom
      .post("/enseignant/cour", { ...data })
      .then()
      .catch((err) => console.log(err.message));
    location.reload();
  };
  return (
    <div>
      <div className="grid lg:grid-cols-3 gap-2 p-3 md:grid-cols-1">
        {cours &&
          cours.map((cour, index) => (
            <div key={index} className="h-fit card shadow-xl">
              <div className="card-body">
                <h2 className="card-title">
                  Shoes!
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{cour?.description}</p>
                <div className="card-actions justify-end">
                  <div>Prix : </div>
                  <div className="badge badge-outline">Products</div>
                </div>
              </div>
            </div>
          ))}
        <div
          onClick={() => document.getElementById("my_modal_2").showModal()}
          className="text-xl text-center py-20 btn-ghost btn card shadow-xl"
        >
          + Ajouter un cour de soutien
        </div>
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
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Description:</span>
                </div>
                <textarea
                  className="textarea textarea-bordered h-24"
                  placeholder="Description"
                  required
                  {...register("description")}
                ></textarea>
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Prix:</span>
                </div>
                <input
                  type="number"
                  placeholder="prix"
                  className="input input-bordered w-full mb-3"
                  required
                  {...register("prix")}
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
