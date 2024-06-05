import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerParentSchema } from "../helpers/validation";
import { signUpParent } from "../services/auth";

export const ParentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerParentSchema) });
  const onSubmit = (data) => {
    signUpParent({ ...data });
  };
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="card-body">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          placeholder="email"
          required
          className={
            "input input-bordered" +
            " " +
            (!!errors?.email ? "input-error" : null)
          }
          {...register("email")}
        />
        {errors?.email ? (
          <p className="text-red-500">{errors.email.message}</p>
        ) : null}
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Nom</span>
        </label>
        <input
          type="text"
          placeholder="name"
          required
          className={
            "input input-bordered" +
            " " +
            (!!errors?.userName ? "input-error" : null)
          }
          {...register("userName")}
        />
        {errors?.userName ? (
          <p className="text-red-500">{errors.userName.message}</p>
        ) : null}
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Mot de passe</span>
        </label>
        <input
          type="password"
          placeholder="password"
          required
          className={
            "input input-bordered" +
            " " +
            (!!errors?.password ? "input-error" : null)
          }
          {...register("password")}
        />
        {errors?.password ? (
          <p className="text-red-500">{errors.password.message}</p>
        ) : null}
      </div>
      <div className="form-control mt-6">
        <button className="btn btn-primary">Sign up</button>
      </div>
    </form>
  );
};
