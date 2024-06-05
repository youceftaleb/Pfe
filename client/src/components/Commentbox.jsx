import { useEffect, useState } from "react";
import httpCommon from "../utils/http-common";
import { format, register } from "timeago.js";
import fr from "timeago.js/lib/lang/fr";

export const Commentbox = ({ comment = null }) => {
  register("mylocal", fr);
  const [user, setUser] = useState(null);
  useEffect(() => {
    httpCommon
      .get(`/user/${comment.parentId}`)
      .then((res) => (res.status === 200 ? setUser(res.data.data) : null))
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
            <img
              className="mr-2 w-6 h-6 rounded-full"
              src={user?.profilePic}
              alt={user?.userName}
            />
            {user?.userName}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <time pubdate dateTime="2022-02-08" title="February 8th, 2022">
              {format(comment?.createdAt, "mylocal")}
            </time>
          </p>
        </div>
        <button
          id="dropdownComment1Button"
          data-dropdown-toggle="dropdownComment1"
          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          type="button"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
          <span className="sr-only">Comment settings</span>
          {/* //TODO: SUPPRIMER COMMENTAIRE */}
        </button>
      </footer>
      <p className="text-gray-500 dark:text-gray-400">{comment?.comment}</p>
      <div className="flex items-center mt-4 space-x-4">
        <div className="rating">
          {[...Array(comment?.rating)].map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    </article>
  );
};
