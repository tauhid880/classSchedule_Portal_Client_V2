import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthProvider";
import { toast } from "react-hot-toast";
import useRole from "../Hook/UseRole";

const Login = () => {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  // const { user } = useContext(AuthContext);
  // const [role, isRoleLoading] = useRole(user?.email);
  // const location = useLocation();
  // const from = location?.state?.pathname || "/dashboard";
  const { userSignIn } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const userSignInHandle = (data) => {
    setLoad(true);
    const email = data.email;
    const password = data.password;
    userSignIn(email, password)
      .then((result) => {
        navigate("/dashboard");
        reset();
      })
      .catch((error) => {
        setLoad(false);
        toast.error(error.message, { duration: 1600 });
      });
  };

  return (
    <div className="relative h-[950px] md:h-[1500px] lg:h-screen bg-gradient-to-t from-[#0A1E34] to-[#0a1e34c2]">
      <section className="h-screen">
        <div className="px-6 h-full">
          <div className="flex xl:justify-center lg:justify-center justify-center items-center flex-wrap h-full g-6">
            <div className="xl:w-1/3 lg:w-1/4 md:w-8/12 mb-12 md:mb-0 bg-[#20262eca] p-8 shadow-lg rounded-md border-t-2 border-b-2 border-[#BDCDD6]">
              <h1 className="text-2xl text-white text-center py-5 font-bold">
                Login
              </h1>
              <form onSubmit={handleSubmit(userSignInHandle)}>
                <div className="mb-6">
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Email is not valid!",
                      },
                    })}
                    type="text"
                    className="text-lg form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Email address"
                  />
                  {errors?.email && (
                    <p className="text-red-500">{errors?.email.message}</p>
                  )}
                </div>

                <div className="mb-6">
                  <input
                    {...register("password", {
                      required: "Password is required!",
                    })}
                    type="password"
                    className="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Password"
                  />
                  {errors?.password && (
                    <p className="text-red-500">{errors?.password.message}</p>
                  )}
                </div>
                <div className="text-center lg:text-left">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full h-12 px-6 font-semibold tracking-wide text-gray-800 transition duration-200 rounded shadow-md bg-button"
                  >
                    {load ? (
                      <span className="border-2 border-dashed border-white animate-spin w-7 h-7 rounded-full"></span>
                    ) : (
                      "Login"
                    )}
                  </button>
                  <p className="text-sm text-white font-semibold mt-2 pt-1 mb-0">
                    Don't have an account?
                    <Link
                      to="/signup"
                      className="text-[#BDCDD6] hover:text-primary focus:text-primary transition duration-200 ease-in-out"
                    >
                      {" "}
                      Sign Up
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

export default Login;
