import { Link } from "react-router-dom";

export function Hero() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h5 className="mb-5 text-3xl">
            Supportive learning that gets results.
          </h5>
          <p className="mb-5">Tell us more about yourself:</p>
          <div className="flex justify-between">
            <Link
              to={"/signup/professor"}
              className="card w-50 bg-primary shadow-xl cursor-pointer"
            >
              <div className="card-body">
                <h2 className="card-title">I'm a Professor</h2>
              </div>
            </Link>
            <Link
              to={"/signup/parent"}
              className="card w-50 bg-primary shadow-xl cursor-pointer"
            >
              <div className="card-body">
                <h2 className="card-title">I'm a Parent</h2>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
