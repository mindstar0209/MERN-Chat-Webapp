import React, { useRef, useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import useImageProcessing from "../hooks/useImageProcessing";
import { useForm } from "react-hook-form";
import { countries } from "countries-list";
import ISO6391 from "iso-639-1";
import {
  UserRound,
  Mail,
  Lock,
  ContactRound,
  BriefcaseBusiness,
} from "lucide-react";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";

export default function Profile() {
  const [authUser, setAuthUser] = useAuth();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { processImage, isProcessing } = useImageProcessing();
  const defaultAvatar =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const [previewImage, setPreviewImage] = useState(
    authUser?.user.profileImage || defaultAvatar
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      fullname: authUser?.user.fullname || "",
      username: authUser?.user.username || "",
      email: authUser?.user.email || "",
      gender: authUser?.user.gender || "",
      occupation: authUser?.user.occupation || "",
      country: authUser?.user.country || "",
      nation: authUser?.user.nation || "",
      summary: authUser?.user.summary || "",
      hobbies: authUser?.user.hobbies || "",
      birthday: authUser?.user.birthday
        ? authUser.user.birthday.slice(0, 10)
        : "",
    },
  });

  useEffect(() => {
    if (authUser) {
      reset({
        fullname: authUser.user.fullname || "",
        username: authUser.user.username || "",
        email: authUser.user.email || "",
        gender: authUser.user.gender || "",
        occupation: authUser.user.occupation || "",
        country: authUser.user.country || "",
        nation: authUser.user.nation || "",
        summary: authUser.user.summary || "",
        hobbies: authUser.user.hobbies || "",
        birthday: authUser.user.birthday
          ? authUser.user.birthday.slice(0, 10)
          : "",
      });
    }
  }, [authUser, reset]);

  const password = watch("password", "");
  const summary = watch("summary", "");
  const hobbies = watch("hobbies", "");
  const occupation = watch("occupation", "");
  const MAX_SUMMARY_LENGTH = 1000;
  const MAX_HOBBIES_LENGTH = 500;
  const MAX_OCCUPATION_LENGTH = 100;

  // Convert countries object to array and sort by name
  const countryList = Object.entries(countries)
    .map(([code, country]) => ({
      code,
      name: country.name,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const languageList = ISO6391.getAllCodes().map((code) => ({
    code,
    name: ISO6391.getName(code),
  }));

  const onSubmit = async (data) => {
    try {
      let base64Image = "";

      if (selectedFile) {
        try {
          base64Image = await processImage(selectedFile);
        } catch (error) {
          toast.error(error.message);
          return;
        }
      } else {
        base64Image = authUser?.user.profileImage || defaultAvatar;
      }

      const updatedUserData = {
        fullname: data.fullname,
        username: data.username,
        occupation: data.occupation,
        email: data.email,
        profileImage: base64Image,
        gender: data.gender,
        country: data.country,
        nation: data.nation,
        summary: data.summary || "",
        hobbies: data.hobbies || "",
        birthday: data.birthday,
      };

      const response = await axiosInstance.put(
        "/user/profile",
        updatedUserData,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Profile updated successfully");
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      }
    } catch (error) {
      if (error.response) {
        toast.error("Error: " + error.response.data.error);
      }
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="flex justify-center p-10 gap-20">
        {/* Display user info */}
        {authUser && (
          <div className="flex flex-col">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <img
              src={previewImage}
              alt="Profile"
              className="w-40 h-40 object-cover rounded-md mb-2 cursor-pointer hover:opacity-80 transition"
              onClick={handleImageClick}
              title="Click to change image"
            />
            <p className="label text-sm">Click to change image</p>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            {/* Fullname */}
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">What is your name?</legend>
                <label className="input h-8 w-full">
                  <input
                    type="text"
                    placeholder="Full Name"
                    {...register("fullname", {
                      required: "Full name is required",
                      minLength: {
                        value: 2,
                        message: "Full name must be at least 2 characters",
                      },
                      maxLength: {
                        value: 25,
                        message: "Full name cannot exceed 25 characters",
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

            {/* Username */}
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  What is your username?
                </legend>
                <label className="input h-8 w-full">
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
                    disabled
                  />
                </label>
                {!authUser?.user.username && (
                  <p className="label">* Required</p>
                )}
                {errors.username && (
                  <span className="text-red-500 text-xs font-semibold">
                    {errors.username.message}
                  </span>
                )}
              </fieldset>
            </div>

            {/* Gender */}
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
                {errors.gender && (
                  <span className="text-red-500 text-xs font-semibold">
                    {errors.gender.message}
                  </span>
                )}
              </fieldset>
            </div>

            {/* Occupation */}
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  What is your occupation?
                </legend>
                <label className="input h-8 w-full">
                  <input
                    type="text"
                    placeholder="Occupation"
                    {...register("occupation", {
                      maxLength: {
                        value: MAX_OCCUPATION_LENGTH,
                        message: "Occupation cannot exceed 50 characters",
                      },
                    })}
                  />
                </label>
                <div className="flex justify-between items-center">
                  <div className="label">Optional</div>
                  <div
                    className={`text-xs ${
                      occupation.length > MAX_OCCUPATION_LENGTH
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    {occupation.length}/{MAX_OCCUPATION_LENGTH}
                  </div>
                </div>
                {errors.occupation && (
                  <span className="text-red-500 text-xs font-semibold">
                    {errors.occupation.message}
                  </span>
                )}
              </fieldset>
            </div>

            {/* Summary */}
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Summary</legend>
                <textarea
                  className="textarea h-24 w-full"
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
                    {summary.length}/{MAX_SUMMARY_LENGTH}
                  </div>
                </div>
                {errors.summary && (
                  <span className="text-red-500 text-xs font-semibold">
                    {errors.summary.message}
                  </span>
                )}
              </fieldset>
            </div>

            {/* hobbies */}
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Hobbies</legend>
                <textarea
                  className="textarea h-24 w-full"
                  placeholder="Tell us about yourself..."
                  {...register("hobbies", {
                    maxLength: {
                      value: MAX_HOBBIES_LENGTH,
                      message: "Hobbies cannot exceed 500 characters",
                    },
                  })}
                ></textarea>
                <div className="flex justify-between items-center">
                  <div className="label">Optional</div>
                  <div
                    className={`text-xs ${
                      hobbies.length > MAX_HOBBIES_LENGTH
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    {hobbies.length}/{MAX_HOBBIES_LENGTH}
                  </div>
                </div>
                {errors.hobbies && (
                  <span className="text-red-500 text-xs font-semibold">
                    {errors.hobbies.message}
                  </span>
                )}
              </fieldset>
            </div>

            {/* Email */}
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">What is your email?</legend>
                <label className="input h-8 w-full">
                  <input
                    type="email"
                    required
                    disabled
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
                {!authUser?.user.email && <p className="label">* Required</p>}
                {errors.email && (
                  <span className="text-red-500 text-xs font-semibold">
                    {errors.email.message}
                  </span>
                )}
              </fieldset>
            </div>

            {/* Country */}
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Country of residence
                </legend>
                <select
                  className="select h-8 w-full cursor-pointer"
                  {...register("country", {
                    required: "Country is required",
                  })}
                  defaultValue={""}
                  disabled={!!authUser?.user.country}
                >
                  <option value="" disabled>
                    Select your country
                  </option>
                  {countryList.map(({ code, name }) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
                {!authUser?.user.country && <p className="label">* Required</p>}
                {errors.country && (
                  <span className="text-red-500 text-xs font-semibold">
                    {errors.country.message}
                  </span>
                )}
              </fieldset>
            </div>

            {/* Native Language */}
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  What is your native language?
                </legend>
                <select
                  className="select h-8 w-full cursor-pointer"
                  {...register("nation", {
                    required: "Native language is required",
                  })}
                  defaultValue={""}
                  disabled={!!authUser?.user.nation}
                >
                  <option value="" disabled>
                    Select your nation language
                  </option>
                  {languageList.map(({ code, name }) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
                {!authUser?.user.nation && <p className="label">* Required</p>}
                {errors.nation && (
                  <span className="text-red-500 text-xs font-semibold">
                    {errors.nation.message}
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
                  className="input h-8 w-full"
                  {...register("birthday", {
                    required: "Birthday is required",
                  })}
                  disabled={!!authUser?.user.birthday}
                />
                {!authUser?.user.birthday && (
                  <p className="label">* Required</p>
                )}
                {errors.birthday && (
                  <span className="text-red-500 text-xs font-semibold">
                    {errors.birthday.message}
                  </span>
                )}
              </fieldset>
            </div>
          </div>

          {/* Text & Button */}
          <div className="flex justify-center">
            <input
              type="submit"
              value="Save"
              className="btn btn-info w-full text-white py-2 mt-4"
            ></input>
          </div>
        </form>
      </div>
    </>
  );
}
