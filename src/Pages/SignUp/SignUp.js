import React, { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./SignUp.css";
import { AuthContext } from "../../Contexts/AuthProvider";
import { imageUpload } from "../../API/imageUpload";
import { dbUser } from "../../API/user";

const SignUp = () => {
  const [load, setLoad] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { createUser, updateUserProfile } = useContext(AuthContext);

  const createUserHandle = (data) => {
    setLoad(true);
    const name = data.name;
    const image = data.image[0];
    const email = data.email;
    const password = data.password;
    const role = data.role;
    const facultyId = data.facultyId;
    const designation = data.designation;

    const formData = new FormData();
    formData.append("image", image);
    imageUpload(formData)
      .then((data) => {
        if (data.success) {
          const photo = data.data.display_url;
          createUser(email, password)
            .then((result) => {
              reset();
              navigate("/dashboard");
              const profile = {
                displayName: name,
                photoURL: photo,
              };
              updateUserProfile(profile)
                .then((result) => {
                  const user = {
                    name,
                    designation: designation,
                    email,
                    password: password,
                    facultyId: facultyId,
                    image: photo,
                    role: role,
                  };
                  dbUser(user)
                    .then((result) => {
                      // console.log(result);
                    })
                    .catch((error) => {
                      setLoad(false);
                    });
                })
                .catch((error) => {
                  setLoad(false);
                });
            })
            .catch((error) => {
              setLoad(false);
              toast.error(error.message, { duration: 1200 });
            });
        }
      })
      .catch((error) => {
        setLoad(false);
      });
  };

  return (
    <div className="relative h-screen md:h-screen lg:h-screen bg-gradient-to-t from-[#0A1E34] to-[#0a1e34c2]">
      <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-center justify-center items-center flex-wrap h-full g-3">
            <div className=" my-2 xl:w-1/3 lg:w-1/4 md:w-8/12 mb-12 md:mb-0 p-8 bg-[#20262eca] shadow-lg rounded-md border-t-2 border-b-2 border-[#BDCDD6] ">
              <h1 className="text-2xl text-center py-5 font-bold text-white">
                Sign Up
              </h1>
              <form onSubmit={handleSubmit(createUserHandle)}>
                <div className="flex flex-row gap-5 justify-evenly items-center">
                  <div className="mb-6 w-full">
                    <input
                      {...register("name", { required: "Name is required" })}
                      type="text"
                      name="name"
                      className="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Name"
                    />
                    {errors?.name && (
                      <p className="text-red-500">{errors.name?.message}</p>
                    )}
                  </div>
                  <div className="mb-6 w-full">
                    <input
                      {...register("designation", {
                        required: "Designation is required",
                      })}
                      type="text"
                      name="designation"
                      className="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Designation"
                    />
                    {errors?.designation && (
                      <p className="text-red-500">
                        {errors.designation?.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-6 w-full">
                  <input
                    {...register("facultyId", {
                      required: "Faculty ID is required",
                      minLength: {
                        value: 9,
                        message: "Faculty ID should be must 9 digits",
                      },
                    })}
                    type="number"
                    className="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Faculty ID"
                  />
                  {errors?.facultyId && (
                    <p className="text-red-500">{errors.facultyId?.message}</p>
                  )}
                </div>
                <div className="flex flex-row gap-5 justify-evenly items-center">
                  <div className="mb-6 w-full">
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Email is not valid!",
                        },
                      })}
                      type="email"
                      name="email"
                      className="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Email address"
                      id="abc
                      "
                    />
                    {errors?.email && (
                      <p className="text-red-500">{errors?.email.message}</p>
                    )}
                  </div>
                </div>
                <div className="mb-6 w-full">
                  <input
                    {...register("password", {
                      required: "Password is required!",
                      pattern: {
                        value: /(?=.*[!@#$&*])/,
                        message:
                          "password should be minimum one special character",
                      },
                      minLength: {
                        value: 6,
                        message: "password should be must 6 characters",
                      },
                    })}
                    name="password"
                    type="password"
                    className="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Password"
                  />
                  {errors?.password && (
                    <p className="text-red-500">{errors?.password.message}</p>
                  )}
                </div>
                <div className="mb-6 w-full">
                  <input
                    {...register("image", { required: "Image is required!" })}
                    type="file"
                    name="image"
                    id="imgUpload"
                    className="file-input  file-input-bordered w-full text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                  {errors?.image && (
                    <p className="text-red-500">{errors?.image.message}</p>
                  )}
                </div>

                <div className="space-y-1 text-lg">
                  <label
                    htmlFor="role"
                    className="block mb-1 font-medium text-[16px] text-white"
                  >
                    Select Role
                  </label>
                  <div className="flex items-center text-white space-x-6 w-full mt-1">
                    <input
                      type="radio"
                      required
                      {...register("role")}
                      className="radio mr-2 bg-[#BDCDD6] checked:bg-[#82AAE3] checked:hover:bg-[#82AAE3] checked:active:bg-[#82AAE3] checked:focus:bg-[#82AAE3]"
                      value={"Admin"}
                    />
                    Admin
                    <input
                      type="radio"
                      required
                      {...register("role")}
                      style={{ marginRight: "10px" }}
                      className="radio bg-[#BDCDD6] checked:bg-[#82AAE3] checked:hover:bg-[#82AAE3] checked:active:bg-[#82AAE3] checked:focus:bg-[#82AAE3]"
                      value={"Faculty"}
                    />
                    Faculty
                  </div>
                </div>

                <div className="text-center lg:text-left mt-3">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full h-12 px-6 font-semibold tracking-wide text-gray-800 transition duration-200 rounded shadow-md bg-button"
                  >
                    {load ? (
                      <span className="border-2 border-dashed border-white animate-spin w-7 h-7 rounded-full"></span>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0 text-white">
                    Already have an account?
                    <Link
                      to="/"
                      className="text-[#BDCDD6] hover:text-primary focus:text-primary transition duration-200 ease-in-out"
                    >
                      {" "}
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
