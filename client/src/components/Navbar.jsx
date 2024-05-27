import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userReducer";
export function Navbar() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  return (
    <nav className="navbar bg-base-100 sticky top-0 z-[5]">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Our services</a>
              <ul className="p-2">
                <li>
                  <a>Service 1</a>
                </li>
                <li>
                  <a>Service 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Contact</a>
            </li>
          </ul>
        </div>
        <Link to={"/"} className="btn btn-ghost text-xl">
         <span className="text-orange-600 font-bold text-3xl">O</span>ustadi
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex ">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Home</a>
          </li>
          <li>
            <details>
              <summary>Our services</summary>
              <ul className="p-2">
                <li>
                  <a>Service 1</a>
                </li>
                <li>
                  <a>Service 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Contact</a>
          </li>
        </ul>
      </div>
      {currentUser ? (
        <div
          onClick={() => {
            dispatch(logout());
            localStorage.removeItem("token");
            localStorage.removeItem("user_type");
            window.location = "/";
          }}
          className="avatar navbar-end"
        >
          <div className="w-10 rounded">
            <img src={currentUser.profilePic} />
          </div>
        </div>
      ) : (
        <div className="navbar-end">
          <Link to={"/login"} className="btn">
            Log in
          </Link>
        </div>
      )}
    </nav>
  );
}
