import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userReducer";
import { Link, Outlet } from "react-router-dom";

const EnseignantAccountLayout = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <>
      <nav className="navbar bg-slate-200 sticky top-0 z-[5]">
        <div className="navbar-start">
          <div className="btn btn-ghost text-xl">
            <span className="text-orange-600 -mr-2 font-bold text-3xl">E</span>
            nseignant Panel
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
            <Link to={"/enseignant/dashboard/cours"}>
              <div className="btn btn-ghost text-xl w-full">
                Cours de soutiens
              </div>
            </Link>
            <Link to={"/enseignant/dashboard/demandes"}>
              <div className="btn btn-ghost text-xl w-full">Demandes</div>
            </Link>
            <Link to={"/enseignant/dashboard/disponibilite"}>
              <div className="btn btn-ghost text-xl w-full">Disponibilite</div>
            </Link>
            <Link to={`/enseignant/${currentUser._id}`}>
              <div className="btn btn-ghost text-xl w-full">Mon Profil</div>
            </Link>
          </div>
        </aside>
        <Outlet />
      </main>
    </>
  );
};

export default EnseignantAccountLayout;
