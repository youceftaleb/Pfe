import { useEffect, useState } from "react";
import httpCommon from "../utils/http-common";
import { Commentbox } from "./Commentbox";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export const Comments = ({ add = true }) => {
  const { id } = useParams();
  const { register, handleSubmit, watch } = useForm();
  const [comments, setComments] = useState([]);
  const onSubmit = (data) => {
    httpCommon
      .post(`/avis/${id}`, { ...data })
      .then((res) => comments.push(data));
  };
  const selected = watch("rating");
  useEffect(() => {
    httpCommon
      .get(`/avis/${id}`)
      .then((res) => (res.status === 200 ? setComments(res.data.data) : null));
  }, [comments]);
  const type = localStorage.getItem("user_type");
  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Avis ({comments.length})
          </h2>
        </div>
        {type === "parent" && (
          <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <div className="rating">
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  {...register("rating")}
                  value={1}
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  {...register("rating")}
                  value={2}
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  {...register("rating")}
                  value={3}
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  {...register("rating")}
                  value={4}
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  {...register("rating")}
                  value={5}
                />
              </div>
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows={6}
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Ecrire un commentaire..."
                required
                defaultValue={""}
                {...register("comment")}
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Ajouter commentaire
            </button>
          </form>
        )}
        {comments?.map((comment, index) => (
          <Commentbox comment={comment} />
        ))}
      </div>
    </section>
  );
};
