import { Link } from "react-router-dom";

export const EnseignantCard = ({ enseignat }) => {
  return (
    <Link to={`/enseignant/${enseignat._id}`} className="inline-block overflow-hidden">
      <div
        className="relative h-60 border-2 border-sky-500"
        style={{ height: 200, width: 200 }}
      >
        <img
          className="w-full h-auto"
          src={enseignat.profilePic}
          alt={enseignat.userName}
        />
        <div className="absolute bottom-0 text-center text-white w-full font-bold text-xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          {enseignat.userName}
          <br />
          {enseignat.modules.map((module, index) => (
            <div className="badge badge-outline" key={index}>
              {module}
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};
