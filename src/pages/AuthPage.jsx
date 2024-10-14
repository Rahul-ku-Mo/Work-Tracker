import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import useAuthProvider from "../hooks/useAuthProvider";
import axios from "axios";

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
        <div className="flex flex-col gap-6 bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-100 text-zinc-800 p-8 rounded-xl w-full max-w-sm shadow-lg">
          <div>
            <h2 className="text-2xl font-bold">
              {signupStatus ? "Sign up" : "Login"}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {signupStatus
                ? "Enter your email below to sign up to your account"
                : "Enter your email below to login to your account"}
            </p>
          </div>

          <form
            className="flex flex-col gap-2"
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
              type="email"
              placeholder="m@example.com"
              onHandleChange={handleChange("email")}
              error={errors.email}
            />
            <div>
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-emerald-600 hover:underline dark:text-emerald-400"
                >
                  Forgot your password?
                </Link>
              </div>
              <AuthFormInput
                id="password"
                isPassword
                value={values.password}
                type="password"
                placeholder="••••••••"
                onHandleChange={handleChange("password")}
                error={errors.password}
              />
            </div>

            <button
              type="submit"
              onClick={() => (signupStatus ? signupUser() : signinUser())}
              disabled={isLoading}
              className="text-sm justify-center cursor-pointer items-center rounded-lg transition-all ease-in-out duration-300 hover:opacity-90 text-zinc-100 w-full bg-emerald-600 py-2 font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading
                ? signupStatus
                  ? "Signing up..."
                  : "Logging in..."
                : signupStatus
                ? "Sign up"
                : "Login"}
            </button>
            {!signupStatus && (
              <button
                onClick={() => signInAsGuest()}
                disabled={isLoading}
                className="text-sm justify-center cursor-pointer items-center rounded-lg transition-all ease-in-out duration-300 hover:opacity-90 text-zinc-100 w-full bg-red-600 py-2 font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing in..." : "Login as guest"}
              </button>
            )}
            <button
              onClick={signinWithGoogle}
              className="text-sm flex items-center gap-2 justify-center cursor-pointer  rounded-lg transition-all ease-in-out duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 w-full bg-zinc-100 dark:bg-zinc-800 py-2 font-semibold border border-zinc-300 dark:border-zinc-600 text-zinc-800 dark:text-zinc-100"
            >
              <img src={Google} className="w-4 h-4 mr-2" alt="Google logo" />
              {signupStatus ? "Sign up with Google" : "Login with Google"}
            </button>
          </form>
          <p className="text-sm text-center text-zinc-600 dark:text-zinc-400">
            {signupStatus
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <button
              className="text-emerald-600 hover:underline dark:text-emerald-400 font-medium"
              onClick={() => setSignupStatus((prev) => !prev)}
            >
              {signupStatus ? "Log in" : "Sign up"}
            </button>
          </p>
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
