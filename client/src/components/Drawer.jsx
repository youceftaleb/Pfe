import { Link } from "react-router-dom";
export const Drawer = ({ children }) => {
  return (
    <>
      <div className="drawer h-screen z-10">
        <div className="drawer-content">
          {/* Page content here */}
          <div className="navbar bg-gray-200 shadow-md">{/* navnav */}</div>
          <h1>Page content</h1>
          {/* // Page content down here */}
          {children}
        </div>
        <div className="">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-neutral-500 text-white sticky">
            {/* Sidebar content here */}
            <Link to={"/"} className="btn btn-ghost text-xl">
              daisyUI
            </Link>
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
            <li className="absolute bottom-3 right-1 left-1">
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location = "/";
                }}
                className="btn btn-error bottom-0"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
