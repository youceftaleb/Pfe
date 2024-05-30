import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import httpCommon from "../utils/http-common";
import { Comments } from "../components";

function f(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const Enseignant = () => {
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
  return user ? (
    <>
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
        className="py-10"
      >
        <div className="flex-col flex items-center lg:flex-row gap-6 lg:justify-center">
          <div className="avatar text-center">
            <div className="w-40 rounded-full">
              <img src={user.profilePic} />
            </div>
          </div>
          <div>
            <h1 className="text-5xl font-bold">{user.userName}</h1>
            <span className="text-xl mr-2">modules:</span>
            {user.modules.map((obj, index) => (
              <div className="mr-2 badge badge-outline">{obj}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-7 flex justify-center">
        <table className="table w-1/2">
          <thead>
            <tr>
              <th>Jour</th>
              <th>Debut</th>
              <th>Fin</th>
            </tr>
          </thead>
          <tbody>
            {user.availability.map((obj, index) => (
              <tr className="hover" key={index}>
                <td>{obj.dayName}</td>
                <td>{obj.startTime}</td>
                <td>{obj.endTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-center">cv</p>

      <h1 className="text-3xl text-center my-7">Avis:</h1>

      <div className="flex justify-center gap-2 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-yellow-500 w-9 h-auto fill-current"
          viewBox="0 0 16 16"
        >
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
        </svg>
        <span className="text-slate-400 font-medium">
          {user.avis} out of 5 stars
        </span>
      </div>

      <Comments />

      <div className="flex justify-center relative top-1/3">
        {/* This is an example component */}
        <div className="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg">
          <div className="relative flex gap-4">
            <img
              src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png"
              className="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20"
              alt
              loading="lazy"
            />
            <div className="flex flex-col w-full">
              <div className="flex flex-row justify-between">
                <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">
                  COMMENTOR
                </p>
                <a className="text-gray-500 text-xl" href="#">
                  <i className="fa-solid fa-trash" />
                </a>
              </div>
              <p className="text-gray-400 text-sm">
                20 April 2022, at 14:88 PM
              </p>
            </div>
          </div>
          <p className="-mt-4 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
            Maxime quisquam vero adipisci beatae voluptas dolor ame.
          </p>
        </div>
      </div>

      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="px-10">
          <div className="bg-white max-w-xl rounded-2xl px-10 py-8 shadow-lg hover:shadow-2xl transition duration-500">
            <div className="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center font-bold text-white">
              LOGO
            </div>
            <div className="mt-4">
              <h1 className="text-lg text-gray-700 font-semibold hover:underline cursor-pointer">
                Product Review
              </h1>
              <div className="flex mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="mt-4 text-md text-gray-600">
                But I must explain to you how all this mistaken idea of
                denouncing pleasure and praising pain was born and I will give
                you a complete account of the system, and expound the actual
                teachings of the great explorer of the truth, the master-builder
                of human happines.
              </p>
              <div className="flex justify-between items-center">
                <div className="mt-4 flex items-center space-x-4 py-6">
                  <div className>
                    <img
                      className="w-12 h-12 rounded-full"
                      src="https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1036&q=80"
                      alt
                    />
                  </div>
                  <div className="text-sm font-semibold">
                    John Lucas •{" "}
                    <span className="font-normal"> 5 minutes ago</span>
                  </div>
                </div>
                <div className="p-6 bg-yellow-400 rounded-full h-4 w-4 flex items-center justify-center text-2xl text-white mt-4 shadow-lg cursor-pointer">
                  +
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-10">
          <div className="bg-white max-w-xl rounded-2xl px-10 py-8 shadow-lg hover:shadow-2xl transition duration-500">
            <div className="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center font-bold text-white">
              LOGO
            </div>
            <div className="mt-4">
              <h1 className="text-lg text-gray-700 font-semibold hover:underline cursor-pointer">
                Product Review
              </h1>
              <div className="flex mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="mt-4 text-md text-gray-600">
                But I must explain to you how all this mistaken idea of
                denouncing pleasure and praising pain was born and I will give
                you a complete account of the system, and expound the actual
                teachings of the great explorer of the truth, the master-builder
                of human happines.
              </p>
              <div className="flex justify-between items-center">
                <div className="mt-4 flex items-center space-x-4 py-6">
                  <div className>
                    <img
                      className="w-12 h-12 rounded-full"
                      src="https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1036&q=80"
                      alt
                    />
                  </div>
                  <div className="text-sm font-semibold">
                    John Lucas •{" "}
                    <span className="font-normal"> 5 minutes ago</span>
                  </div>
                </div>
                <div className="p-6 bg-yellow-400 rounded-full h-4 w-4 flex items-center justify-center text-2xl text-white mt-4 shadow-lg cursor-pointer">
                  +
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-10">
          <div className="bg-white max-w-xl rounded-2xl px-10 py-8 shadow-lg hover:shadow-2xl transition duration-500">
            <div className="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center font-bold text-white">
              LOGO
            </div>
            <div className="mt-4">
              <h1 className="text-lg text-gray-700 font-semibold hover:underline cursor-pointer">
                Product Review
              </h1>
              <div className="flex mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="mt-4 text-md text-gray-600">
                But I must explain to you how all this mistaken idea of
                denouncing pleasure and praising pain was born and I will give
                you a complete account of the system, and expound the actual
                teachings of the great explorer of the truth, the master-builder
                of human happines.
              </p>
              <div className="flex justify-between items-center">
                <div className="mt-4 flex items-center space-x-4 py-6">
                  <div className>
                    <img
                      className="w-12 h-12 rounded-full"
                      src="https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1036&q=80"
                      alt
                    />
                  </div>
                  <div className="text-sm font-semibold">
                    John Lucas •{" "}
                    <span className="font-normal"> 5 minutes ago</span>
                  </div>
                </div>
                <div className="p-6 bg-yellow-400 rounded-full h-4 w-4 flex items-center justify-center text-2xl text-white mt-4 shadow-lg cursor-pointer">
                  +
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div>not a real user</div>
  );
};

export default Enseignant;
