import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Lock, Mail } from "lucide-react";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/authSlice";

function Login() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    axios
      .post("/api/user/login", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Login successful");
        }
        localStorage.setItem("Auth", JSON.stringify(response.data));
        dispatch(setUser(response.data));
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error: " + error.response.data.error);
        }
      });
  };
  return (
    <>
      <div className="flex h-[88vh] items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border rounded-md py-4 px-10 space-y-3 w-96"
        >
          {/* Email */}
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <label className="input h-10 w-full">
                <Mail className="h-4 opacity-50" />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
              </label>
              {errors.email && (
                <span className="text-red-500 text-xs font-semibold">
                  {errors.email.message}
                </span>
              )}
            </fieldset>
          </div>

          {/* Password */}
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <label className="input h-10 w-full">
                <Lock className="h-4 opacity-50" />
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
              </label>
              {errors.password && (
                <span className="text-red-500 text-xs font-semibold">
                  {errors.password.message}
                </span>
              )}
            </fieldset>
          </div>

          {/* Action */}
          <div className="flex flex-col gap-1">
            <input
              type="submit"
              value="Login"
              className="btn btn-info w-full text-white py-2 mt-2"
            ></input>

            <div className="flex">
              <p className="label text-sm mt-2">
                Don't have any Account?
                <Link
                  to={"/auth/signup"}
                  className="text-blue-500 underline cursor-pointer ml-1"
                >
                  Signup
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
