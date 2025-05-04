import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Lock, Mail, UserRound } from "lucide-react";
import useImageProcessing from "../../hooks/useImageProcessing";
import { countries } from "countries-list";

function Signup() {
  const [authUser, setAuthUser] = useAuth();
  const fileInputRef = useRef(null);
  const { processImage, isProcessing } = useImageProcessing();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");
  const summary = watch("summary", "");
  const MAX_SUMMARY_LENGTH = 500;

  // Convert countries object to array and sort by name
  const countryList = Object.entries(countries)
    .map(([code, country]) => ({
      code,
      name: country.name,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const onSubmit = async (data) => {
    console.log("data:", data);
    try {
      let base64Image = "";
      if (data.profileImage?.[0]) {
        try {
          base64Image = await processImage(data.profileImage[0]);
        } catch (error) {
          toast.error(error.message);
          return;
        }
      }

      const userData = {
        fullname: data.fullname,
        email: data.email,
        password: data.password,
        profileImage: base64Image,
        gender: data.gender,
        country: data.country,
        summary: data.summary || "",
        birthday: data.birthday,
      };

      const response = await axios.post("/api/user/signup", userData);

      if (response.data) {
        toast.success("Signup successful");
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      }
    } catch (error) {
      if (error.response) {
        toast.error("Error: " + error.response.data.error);
      }
    }
  };

  const renderFileInput = () => (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">Pick your image</legend>
      <input
        type="file"
        className="file-input h-8"
        accept="image/*"
        disabled={isProcessing}
        {...register("profileImage")}
      />
      <label className="label">
        {isProcessing
          ? "Processing image..."
          : "Please upload 250 x 250 Image. (Optional)"}
      </label>
    </fieldset>
  );

  return (
    <>
      <div className="flex items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <h1 className="text-2xl items-center text-blue-600 font-bold">
            Messenger
          </h1>

          <h2 className="text-2xl items-center">
            Create a new{" "}
            <span className="text-blue-600 font-semibold">Account</span>
          </h2> */}

          <div className="flex flex-col gap-2">
            {/* Fullname */}
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">What is your name?</legend>
                <label className="input h-8">
                  <UserRound className="h-4 opacity-50" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    {...register("fullname", {
                      required: "Full name is required",
                      minLength: {
                        value: 3,
                        message: "Full name must be at least 3 characters",
                      },
                      maxLength: {
                        value: 50,
                        message: "Full name cannot exceed 50 characters",
                      },
                      pattern: {
                        value: /^[A-Za-z\s'-]+$/,
                        message:
                          "Full name can only contain letters, spaces, hyphens, and apostrophes",
                      },
                    })}
                  />
                </label>
                <p className="label">* Required</p>
                {errors.fullname && (
                  <span className="text-red-500 text-xs font-semibold">
                    {errors.fullname.message}
                  </span>
                )}
              </fieldset>
            </div>

            {/* Email */}
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">What is your email?</legend>
                <label className="input h-8">
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
                <p className="label">* Required</p>
                {errors.email && (
                  <span className="text-red-500 text-xs font-semibold">
                    {errors.email.message}
                  </span>
                )}
              </fieldset>
            </div>

            {/* Profile Image Upload */}
            {renderFileInput()}

            {/* Gender Section */}
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  What is your gender?
                </legend>
                <div className="flex gap-8">
                  <div className="flex items-center gap-2">
                    Male
                    <input
                      type="radio"
                      value="male"
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                      className="radio w-5 h-5"
                      defaultChecked
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    Female
                    <input
                      type="radio"
                      value="female"
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                      className="radio w-5 h-5"
                    />
                  </div>
                </div>
                <p className="label">* Required</p>
                {errors.gender && (
                  <span className="text-red-500 text-xs font-semibold">
                    {errors.gender.message}
                  </span>
                )}
              </fieldset>
            </div>

            {/* Country */}
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Where are you from?</legend>
                <select
                  className="select h-8"
                  {...register("country", {
                    required: "Country is required",
                  })}
                >
                  <option value="">Select your country</option>
                  {countryList.map(({ code, name }) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
                <p className="label">* Required</p>
                {errors.country && (
                  <span className="text-red-500 text-xs font-semibold">
                    {errors.country.message}
                  </span>
                )}
              </fieldset>
            </div>

            {/* Summary */}
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Summary</legend>
                <textarea
                  className="textarea h-24"
                  placeholder="Tell us about yourself..."
                  {...register("summary", {
                    maxLength: {
                      value: MAX_SUMMARY_LENGTH,
                      message: "Summary cannot exceed 500 characters",
                    },
                  })}
                ></textarea>
                <div className="flex justify-between items-center">
                  <div className="label">Optional</div>
                  <div
                    className={`text-xs ${
                      summary.length > MAX_SUMMARY_LENGTH
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    {summary.length}/{MAX_SUMMARY_LENGTH} characters
                  </div>
                </div>
                {errors.summary && (
                  <span className="text-red-500 text-xs font-semibold">
                    {errors.summary.message}
                  </span>
                )}
              </fieldset>
            </div>

            {/* Birthday */}
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  What is your birthday?
                </legend>
                <input
                  type="date"
                  className="input h-8"
                  {...register("birthday", {
                    required: "Birthday is required",
                    // You can add more validation here if needed
                  })}
                />
                <p className="label">* Required</p>
                {errors.birthday && (
                  <span className="text-red-500 text-xs font-semibold">
                    {errors.birthday.message}
                  </span>
                )}
              </fieldset>
            </div>

            {/* Password */}
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Create a password</legend>
                <label className="input h-8">
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
                <p className="label">* Required</p>
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
                <label className="input h-8">
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
                <p className="label">* Required</p>
                {errors.confirmPassword && (
                  <span className="text-red-500 text-xs font-semibold">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </fieldset>
            </div>
          </div>

          {/* Text & Button */}
          <div className="flex justify-center">
            <input
              type="submit"
              value="Signup"
              className="text-white bg-blue-600 cursor-pointer w-full rounded-lg py-2"
            ></input>
          </div>
          <p>
            Have any Account?{" "}
            <Link
              to={"/login"}
              className="text-blue-500 underline cursor-pointer ml-1"
            >
              {" "}
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Signup;
