import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import useAuthProvider from "../hooks/useAuthProvider";
import axios from "axios";

import { Link } from "react-router-dom";

import Google from "../assets/google.svg";
import Github from "../assets/github.svg";

import AuthFormInput from "../components/shared/Input/AuthFormInput";

import Cookies from "js-cookie";
import { AuthContext } from "../Context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { LogoBar } from "../components/shared/LogoBar";

const Auth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [signupStatus, setSignupStatus] = useState(false);
  const { setIsLoggedIn, setAccessToken, isLoggedIn } = useContext(AuthContext);

  const {
    values,
    handleChange,
    signinUser,
    signupUser,
    signInAsGuest,
    username,
    handleNameChange,
    errors,
    isLoading,
  } = useAuthProvider();

  const signinWithGoogle = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      const tokenResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/oauth2/google`,
        {
          code: codeResponse.code,
        }
      );

      setIsLoggedIn(true);
      setAccessToken(tokenResponse.data.token);
      Cookies.set("accessToken", tokenResponse.data.token);

      queryClient.setQueryData(["user"], tokenResponse.data.data);
      navigate("/boards");
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <div className="absolute inset-0 flex flex-col">
      <nav className="bg-transparent py-3 px-4 flex justify-between items-center bg-zinc-100 dark:bg-zinc-800 shadow-lg fixed top-0 z-10 w-full">
        <LogoBar />
      </nav>
      <main className="flex grow items-center justify-center bg-zinc-100 dark:bg-zinc-900">
        <div className="flex flex-col gap-4 bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-100 text-zinc-800 px-10 pt-10 pb-6 rounded-lg w-full max-w-sm shadow-md ">
          <form
            className="flex flex-col gap-3 h-fit"
            onSubmit={(e) => e.preventDefault()}
          >
            {signupStatus && (
              <AuthFormInput
                label="Username"
                value={username}
                type="text"
                autocomplete
                placeholder="eg. Rahul@KMxa.."
                onHandleChange={handleNameChange}
                error={errors.username}
              />
            )}
            <AuthFormInput
              label="Email"
              value={values.email}
              type="text"
              placeholder="test@gmail.com"
              onHandleChange={handleChange("email")}
              error={errors.email}
            />
            <AuthFormInput
              label="Password"
              isPassword
              value={values.password}
              type="password"
              placeholder="Not your name@123"
              onHandleChange={handleChange("password")}
              error={errors.password}
            />

            {signupStatus ? (
              <button
                type="submit"
                onClick={() => signupUser()}
                disabled={isLoading}
                className="text-sm inline-flex justify-center cursor-pointer items-center rounded-lg transition-all ease-in-out duration-300 hover:opacity-80 text-zinc-100 w-full bg-emerald-600 p-2 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing up..." : "New user"}
              </button>
            ) : (
              <>
                <button
                  type="submit"
                  onClick={() => signinUser()}
                  disabled={isLoading}
                  className="text-sm inline-flex justify-center cursor-pointer items-center rounded-lg transition-all ease-in-out duration-300 hover:opacity-80 text-zinc-100 w-full bg-emerald-600 p-2 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Logging in..." : "Log in"}
                </button>
                <button
                  type="submit"
                  onClick={() => signInAsGuest()}
                  disabled={isLoading}
                  className="text-sm inline-flex justify-center cursor-pointer items-center rounded-lg transition-all ease-in-out duration-300 bg-red-600 text-zinc-100 w-full hover:opacity-80 p-2 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Signing in..." : "Sign in as Guest"}
                </button>
              </>
            )}
          </form>

          <div className="flex gap-4 items-center">
            <div className="w-full border-t-2 border-black" />
            <span className="text-sm leading-3">or</span>
            <div className="w-full border-t-2 border-black" />
          </div>

          <div className="flex items-center justify-center gap-2 ">
            <div className="w-full flex items-center gap-2 justify-center py-2 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-100 p-2 rounded-lg cursor-pointer hover:opacity-70 transition-all ease-in-out duration-300">
              <img
                onClick={() => signinWithGoogle()}
                src={Google}
                className="w-4 h-4"
                alt="Google logo"
              />
              <span className="text-sm dark:text-white text-zinc-800 font-semibold">
                Sign in with Google
              </span>
            </div>
          </div>

          <div className="text-sm text-center">
            {signupStatus ? "Returning Explorer?" : "First time here?"}{" "}
            <span
              className="font-bold cursor-pointer hover:underline transition duration-300 ease-in-out"
              onClick={() => setSignupStatus((prev) => !prev)}
            >
              {signupStatus ? "Log in" : "Sign up"}
            </span>
          </div>
        </div>
      </main>
      <footer className="bg-zinc-100 dark:bg-zinc-800 shadow-lg py-3 px-4 flex justify-end items-center fixed bottom-0 w-full">
        <Link
          to="https://github.com/Rahul-ku-Mo/Work-Tracker"
          className="text-sm text-zinc-600 dark:text-white dark:hover:text-zinc-200 hover:text-zinc-400 font-bold flex gap-2 items-center "
          target="_blank"
        >
          <img src={Github} className="w-4 h-4" alt="GitHub logo" />
          Check out this page
        </Link>
      </footer>
    </div>
  );
};

export default Auth;
