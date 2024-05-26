import { Link } from "react-router-dom";
import { useFieldArray, Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerEnseignantSchema } from "../helpers/validation";
import { signUpEnseignant } from "../services/auth";
import { upload } from "../services/fileStorage";
import { useState } from "react";

export const EnseignantForm = () => {
  const [cv, setCV] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [loading, setLoading] = useState(0);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { days: [{ dayName: "", startTime: "", endTime: "" }] },
    resolver: yupResolver(registerEnseignantSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "days",
  });

  const onSubmit = (data) => {
    //TODO: check if email already exists before file upload
    data.modules = data.modules.split(",");
    data.CV = data.CV[0];
    data.identity = data.identity[0];
    data.experience = parseInt(data.experience);

    // uploading files
    const files = [data.CV, data.identity];
    upload(files)
      .then((results) => {
        // Results contain an array of objects with each file and its corresponding download URL
        results.forEach(({ file, downloadURL }) => {
          // Access file and downloadURL here to apply different operations
          // console.log(
          //   `File ${file.name} uploaded successfully. Download URL:`,
          //   downloadURL
          // );
          // Apply different operations based on file identity
          if (file === data.CV) {
            // Apply operation for file1
            data.CV = downloadURL;
          } else if (file === data.identity) {
            // Apply operation for file2
            data.identity = downloadURL;
          }
        });

        // Call your other function here if needed
        signUpEnseignant({...data})
      })
      .catch((error) => {
        // Handle errors
        console.error("Error uploading files:", error);
      });
  };

  return (
    <form className="card-body" noValidate onSubmit={handleSubmit(onSubmit)}>
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
          <span className="label-text">Username</span>
        </label>
        <input
          type="text"
          placeholder="name"
          className="input input-bordered"
          required
          {...register("userName")}
        />
        {errors?.userName ? (
          <p className="text-red-500">{errors.userName.message}</p>
        ) : null}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">
            Modules <span className="text-gray-500">(Seperate with comma)</span>
          </span>
        </label>
        <input
          className="input input-bordered"
          type="text"
          multiple
          {...register("modules")}
        />
        {errors?.modules ? (
          <p className="text-red-500">{errors.modules.message}</p>
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
        <label className="label">
          <Link
            to={"/login"}
            className="label-text-alt link link-hover hover:underline"
          >
            Already have an account?
          </Link>
        </label>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Number of years of experience</span>
        </label>
        <input
          className="input input-bordered"
          type="number"
          multiple
          {...register("experience")}
        />
        {errors?.experience ? (
          <p className="text-red-500">{errors.experience.message}</p>
        ) : null}
      </div>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Upload your CV</span>
        </div>
        <input
          {...register("CV")}
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
        />
        {errors?.CV ? (
          <p className="text-red-500">{errors.CV.message}</p>
        ) : null}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">fournir piece d'itentite</span>
        </div>
        <input
          {...register("identity")}
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
        />
        {errors?.identity ? (
          <p className="text-red-500">{errors.identity.message}</p>
        ) : null}
      </label>

      {fields.map((day, index) => (
        <div key={day.id}>
          <Controller
            name={`days[${index}].dayName`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <input
                  className="input input-bordered w-full max-w-xs"
                  {...field}
                  placeholder="Day Name"
                />
                {errors.days?.[index]?.dayName && (
                  <p className="text-red-500">
                    {errors.days[index].dayName.message}
                  </p>
                )}
              </>
            )}
          />
          <Controller
            name={`days[${index}].startTime`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <input
                  className="input input-bordered"
                  {...field}
                  type="time"
                />
                {errors.days?.[index]?.startTime && (
                  <p className="text-red-500">
                    {errors.days[index].startTime.message}
                  </p>
                )}
              </>
            )}
          />
          <Controller
            name={`days[${index}].endTime`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <input
                  className="input input-bordered"
                  {...field}
                  type="time"
                />
                {errors.days?.[index]?.endTime && (
                  <p className="text-red-500">
                    {errors.days[index].endTime.message}
                  </p>
                )}
              </>
            )}
          />
          {/* //TODO: remove the remove button for the first item */}
          <button type="button" className="btn" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}
      {fields.length < 7 ? (
        <button
          type="button"
          className="btn"
          onClick={() => append({ dayName: "", startTime: "", endTime: "" })}
        >
          Add Day
        </button>
      ) : null}

      <div className="form-control mt-6">
        <button className="btn btn-primary">Sign up</button>
      </div>
    </form>
  );
};
