import { Link } from "react-router-dom";
import background from "../assets/kenny-eliason-zFSo6bnZJTw-unsplash.jpg";

export function Hero() {
  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h5 className="mb-5 text-3xl">
            Les meilleur enseignants pour votre enfant
          </h5>
          <p className="mb-5 text-xl">Inscriver vous comme:</p>
          <div className="flex justify-evenly">
            <Link
              to={"/signup/enseignant"}
              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg hover:bg-orange-600 hover:bg-opacity-70 w-50 bg-orange-600 shadow-xl cursor-pointer"
            >
              <h2 className="text-white">Enseignant</h2>
            </Link>
            <Link
              to={"/signup/parent"}
              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg hover:bg-orange-600 hover:bg-opacity-70 w-50 bg-orange-600 shadow-xl cursor-pointer"
            >
              <h2 className="text-slate-100">Parent</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
