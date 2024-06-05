import { CardGroup } from "../components";
import ParentAccountLayout from "../layout/ParentAccountLayout";
import { Wilaya } from "../data/wilaya";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import httpCommon from "../utils/http-common";

const FilterPage = () => {
  useEffect(() => {
    httpCommon
      .post("/enseignant")
      .then((res) =>
        res.status === 200 ? setEnseignants(res.data.data) : null
      )
      .catch((err) => errorNotification(err.response.data.message));
  }, []);
  const [enseignants, setEnseignants] = useState();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    let structuredData = {};

    if (data.wilaya || data.ville) {
      structuredData.location = {};
      if (data.wilaya) structuredData.location.wilaya = data.wilaya;
      if (data.ville) structuredData.location.ville = data.ville;
    }

    if (data.jour || data.time) {
      structuredData.disponibilite = {};
      if (data.jour) structuredData.disponibilite.dayName = data.jour;
      if (data.time) structuredData.disponibilite.startTime = data.time;
    }

    if (data.module) {
      structuredData.module = data.module;
    }
    data = structuredData;
    console.log(structuredData);
    httpCommon
      .post("/enseignant", structuredData)
      .then((res) => {
        res.status === 200 ? setEnseignants(res.data.data) : null;
      })
      .catch((err) => console.log(err.response.data.message));
  };

  return (
    <ParentAccountLayout>
      <main className="flex">
        <aside className="w-1/4 h-screen scroll sticky left-0 border-r-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 flex flex-col justify-center"
          >
            <h1 className="text-2xl">Filtrer les enseignants:</h1>
            <ul className="menu menu-horizontal px-1">
              <li>
                <select
                  defaultValue=""
                  className="select select-bordered w-full max-w-xs"
                  {...register("wilaya")}
                >
                  <option value="" disabled>
                    Wilaya
                  </option>
                  {Wilaya.map((wilaya, index) => (
                    <option value={parseInt(wilaya.Code)} key={index}>
                      {wilaya.Code} - {wilaya.Wilaya}
                    </option>
                  ))}
                </select>
              </li>
              <li>
                <input
                  type="text"
                  placeholder="Ville"
                  className="input input-bordered w-full max-w-xs"
                  {...register("ville")}
                />
              </li>
              <li>
                <input
                  type="text"
                  placeholder="Matiere"
                  className="input input-bordered w-full max-w-xs"
                  {...register("module")}
                />
              </li>
              <li>
                <input
                  type="text"
                  placeholder="Jour"
                  className="input input-bordered w-full max-w-xs"
                  {...register("jour")}
                />
              </li>
              <li>
                <input
                  type="time"
                  className="input input-bordered w-full max-w-xs"
                  {...register("time")}
                />
              </li>
            </ul>
            <button type="submit" className="btn btn-primary">
              Filter
            </button>
          </form>
        </aside>

        <CardGroup enseignats={enseignants} />
      </main>
    </ParentAccountLayout>
  );
};

export default FilterPage;
