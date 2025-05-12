import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Hand, Lock, Mail, UserRound } from "lucide-react";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/authSlice";

function Signup() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");

  const onSubmit = async (data) => {
    try {
      const userData = {
        username: data.username,
        email: data.email,
        password: data.password,
      };

      const response = await axios.post("/api/user/signup", userData);

      if (response.data) {
        toast.success("Signup successful");
        localStorage.setItem("Auth", JSON.stringify(response.data));
        dispatch(setUser(response.data));
        // Force socket reconnection after signup
        window.location.reload();
      }
    } catch (error) {
      if (error.response) {
        toast.error("Error: " + error.response.data.error);
      }
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center justify-center px-[15vh]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-4"
          >
            {/* Username */}
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Make your username</legend>
                <label className="input h-10 w-full">
                  <UserRound className="h-4 opacity-50" />
                  <input
                    type="text"
                    placeholder="Username"
                    {...register("username", {
                      required: "Username is required",
                      minLength: {
                        value: 4,
                        message: "Username must be at least 4 characters",
                      },
                      maxLength: {
                        value: 50,
                        message: "Username cannot exceed 20 characters",
                      },
                      pattern: {
                        value: /^[A-Za-z0-9_]+$/,
                        message:
                          "Username can only contain letters, numbers, and underscores",
                      },
                    })}
                  />
                </label>
                {errors.username && (
                  <span className="text-red-500 text-xs font-semibold">
                    {errors.username.message}
                  </span>
                )}
              </fieldset>
            </div>

            {/* Email */}
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">What is your email?</legend>
                <label className="input h-10 w-full">
                  <Mail className="h-4 opacity-50" />
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Please enter a valid email address",
                      },
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
                <legend className="fieldset-legend">Create a password</legend>
                <label className="input h-10 w-full">
                  <Lock className="h-4 opacity-50" />
                  <input
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      maxLength: {
                        value: 32,
                        message: "Password cannot exceed 32 characters",
                      },
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

            {/*Confirm Password */}
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Confirm your password
                </legend>
                <label className="input h-10 w-full">
                  <Lock className="h-4 opacity-50" />
                  <input
                    type="password"
                    placeholder="Confirm password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                  />
                </label>
                {errors.confirmPassword && (
                  <span className="text-red-500 text-xs font-semibold">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </fieldset>
            </div>

            {/* Action */}
            <div className="flex flex-col gap-1">
              <input
                type="submit"
                value="Signup"
                className="btn btn-info w-full text-white py-2 mt-4"
              ></input>

              <div className="flex">
                <p className="label text-sm mt-2">
                  Have any Account?
                  <Link
                    to={"/auth/login"}
                    className="text-blue-500 underline cursor-pointer ml-1"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
        <div className="welcome-section flex flex-col h-[88vh] p-10 bg-gradient-to-br from-blue-50 to-white shadow-md">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-4 flex items-center gap-2">
            Welcome to World Pals{" "}
            <span className="waving-hand text-5xl">👋</span>
          </h1>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Make friends, share cultures, and explore languages — all in one
            place.
          </h3>
          <h5 className="text-base text-gray-600 mb-6">
            World Pals connects curious minds from around the globe for genuine
            cultural exchange and fun conversations.
          </h5>
          <h3 className="text-lg font-bold text-blue-600 mt-4 mb-2">
            Meet Your Match
          </h3>
          <h5 className="text-base text-gray-600 mb-6">
            Whether you're into travel, languages, or just making new friends,
            our smart friend-matching makes it easy to find your vibe.
          </h5>
          <h3 className="text-lg font-bold text-blue-600 mt-4 mb-2">
            Chat Freely, Learn Deeply
          </h3>
          <h5 className="text-base text-gray-600 mb-6">
            Enjoy free access to chats and discover languages and lifestyles
            directly from real people worldwide.
          </h5>
          <h3 className="text-lg font-bold text-blue-600 mt-4 mb-2">
            Join the Global Circle
          </h3>
          <h5 className="text-base text-gray-600">
            Start meaningful conversations today — sign up and be part of a
            world without borders.
          </h5>
        </div>
      </div>
    </>
  );
}

export default Signup;
