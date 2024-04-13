import { Link } from "react-router-dom";

export const ProfessorForm = () => {
  return (
    <form className="card-body">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          placeholder="email"
          className="input input-bordered"
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Username</span>
        </label>
        <input
          type="text"
          placeholder="name"
          className="input input-bordered"
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="password"
          className="input input-bordered"
          required
        />
        <label className="label">
          <span className="label-text">Confirm Password</span>
        </label>
        <input
          type="password"
          placeholder="password"
          className="input input-bordered"
          required
        />
        <label className="label">
          <Link
            to={"/login"}
            className="label-text-alt link link-hover hover:underline"
          >
            Already have an account?
          </Link>
        </label>
      </div>
      <div className="form-control mt-6">
        <button className="btn btn-primary">Sign up</button>
      </div>
    </form>
  );
};
