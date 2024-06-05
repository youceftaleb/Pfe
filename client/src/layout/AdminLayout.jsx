import { Outlet, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userReducer";
const AdminLayout = () => {
  const dispatch = useDispatch();
  return (
    <>
      <nav className="navbar bg-slate-200 sticky top-0 z-[5]">
        <div className="navbar-start">
          <div className="btn btn-ghost text-xl">
            <span className="text-orange-600 -mr-2 font-bold text-3xl">A</span>
            dmin Dashboard
          </div>
        </div>
        <div className="navbar-end">
          <button
            onClick={() => {
              dispatch(logout());
              localStorage.removeItem("token");
              localStorage.removeItem("user_type");
              window.location = "/";
            }}
            className="btn btn-error"
          >
            Logout
          </button>
        </div>
      </nav>
      <main className="flex flex-grow">
        <aside className="w-1/4 h-screen scroll sticky left-0 border-r-2">
          <div className="flex flex-col p-4">
            <Link to={"/admin/dashboard/enseignants"}>
              <div className="btn btn-ghost text-xl w-full">Enseignants</div>
            </Link>
            <Link to={"/admin/dashboard/parents"}>
              <div className="btn btn-ghost text-xl w-full">
                Parents d'eleve
              </div>
            </Link>
          </div>
        </aside>
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
