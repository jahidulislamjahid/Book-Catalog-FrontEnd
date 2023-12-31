/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { LoginSvg } from "../../assets/Icons";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isSuccess, error } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (isSuccess && !error) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Signup Successful",
        showConfirmButton: true,
        timer: 2500,
      });
      reset();
      navigate("/login");
    }
    if (error) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Signup Failed ! please try again!",
        showConfirmButton: true,
        timer: 2500,
      });
      reset();
    }
  }, [error, isSuccess, reset]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(
      createUser({
        email: data.email,
        password: data.password,
        lastName: data.lastName,
        firstName: data.firstName,
      })
    );
  };

  return (
    <div className="main-container px-20 py-16 md:hero min-h-screen   justify-items-center">
      <div className="hero-content flex-col lg:flex-row-reverse  ">
        <div className="text-center ">
          <h1 className="text-5xl font-bold mb-5">
            SignUp <span className="text-curiousCyan">Now!</span>{" "}
          </h1>

          <div className="w-1/8 mb-10 md:mb-0 mx-auto">
            <LoginSvg />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="md:hero font-bold ">
          <div className="card flex-shrink-0  w-full max-w-screen-md shadow-2xl ">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text"> First Name: </span>
                </label>

                <input
                  {...register("firstName", { required: true })}
                  name="firstName"
                  placeholder="First Name"
                  className="input input-bordered"
                  aria-invalid={errors.firstName ? "true" : "false"}
                />
                {errors.firstName?.type === "required" && (
                  <small className="text-red-600">
                    First name is required!
                  </small>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name:</span>
                </label>

                <input
                  {...register("lastName", { required: true })}
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  className="input input-bordered"
                />
                {errors.lastName?.type === "required" && (
                  <small className="text-red-600">Last name is required!</small>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email:</span>
                </label>

                <input
                  {...register("email", {
                    required: "Email is required",
                    validate: {
                      maxLength: (v) =>
                        v.length <= 50 ||
                        "The email should have at most 50 characters",
                      matchPattern: (v) =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                        "Email address must be a valid address",
                    },
                  })}
                  name="email"
                  placeholder="Email"
                  className="input input-bordered"
                />

                {typeof errors.email?.message === "string" && (
                  <small className="text-red-600">{errors.email.message}</small>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password: </span>
                </label>
                <input
                  {...register("password", {
                    required: "Password is required",
                    validate: {
                      maxLength: (v) =>
                        v.length <= 15 ||
                        "The Password have at most 15 characters",
                      minLength: (v) =>
                        v.length >= 6 ||
                        "The Password have at least 6 characters",
                    },
                  })}
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                />
                {typeof errors.password?.message === "string" && (
                  <small className="text-red-600">
                    {errors.password.message}
                  </small>
                )}
              </div>

              <div className="form-control mt-6">
                <button className="btn bg-curiousCyan text-white font-semibold rounded-md hover:bg-gray-900">Register</button>
                <p className="text-sm font-bold mt-4">
                  Already Have An Account?{" "}
                  <Link to="/login" className="text-curiousCyan ">
                    Login
                  </Link>{" "}
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
