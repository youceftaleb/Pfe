import MainLayout from "../layout/MainLayout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../helpers/validation";
import { login } from "../services/auth";
import { useDispatch } from "react-redux";
import background from "../assets/kenny-eliason-zFSo6bnZJTw-unsplash.jpg";

function Login() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });
  const onSubmit = (data) => {
    login({ ...data }, dispatch);
  };
  return (
    <MainLayout>
      <div
        className="hero min-h-screen bg-base-200 bg-opacity-60"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form
              className="card-body"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                  {...register("email")}
                />
                {errors?.email ? (
                  <p className="text-red-500">{errors.email.message}</p>
                ) : null}
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
                  {...register("password")}
                />
                {errors?.password ? (
                  <p className="text-red-500">{errors.password.message}</p>
                ) : null}
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Login;
