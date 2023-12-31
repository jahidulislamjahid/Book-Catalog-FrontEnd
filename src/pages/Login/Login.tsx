/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import { toast } from "react-hot-toast";
import { loginUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { LoginSvg } from "../../assets/Icons";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { userEmail, loading } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const result = await dispatch(
        loginUser({ email: data.email, password: data.password })
      );

      if (result.payload?.statusCode) {
        toast.success("Successfully Logged In !! ");
        reset();
      } else {
        toast.error("Incorrect Password");
      }
    } catch (error) {
      toast.error("Login error:");
    }
  };
  useEffect(() => {
    if (userEmail && !loading) {
      navigate(from, { replace: true });
    }
  }, [loading, userEmail]);

  return (
    <div className="main-container  p-4 py-20 md:hero min-h-screen   justify-items-center">
      <div className="hero hero-content flex-col lg:flex-row-reverse">
        <div className=" text-center">
          <h1 className="text-4xl font-bold ml-20 mb-5">
            Login <span className="text-curiousCyan">Here !</span>{" "}
          </h1>

          <div className="w-1/8 mb-10 md:mb-0 mx-auto ml-20">
            <LoginSvg />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="md:hero font-bold ">
          <div className="card flex-shrink-0 w-full max-w-screen-sm  shadow-2xl ">
            <div className="card-body">
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

                {errors.email && (
                  <small className="text-red-600">
                    {errors.email.message as ReactNode}
                  </small>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password : </span>
                </label>
                <input
                  {...register("password", { required: true })}
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                />
                {errors.password?.type === "required" && (
                  <span className="text-red-600">Password is required!</span>
                )}
              </div>

              <label className="label">
                <Link
                  to="/forgot-password"
                  className="label-text-alt text-curiousCyan "
                >
                  Forgot password?
                </Link>
              </label>

              <div className="form-control mt-6">
                <button className="btn bg-curiousCyan rounded-md text-white font-semibold hover:bg-gray-900">Login</button>
                <p className="text-sm font-bold mt-4">
                  Don't Have Any Account ?{" "}
                  <Link to="/signup" className="text-curiousCyan ">
                    Register
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

export default Login;
