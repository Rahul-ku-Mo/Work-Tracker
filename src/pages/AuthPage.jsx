import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const Auth = () => {
  const navigate = useNavigate();

  const [signupStatus, setSignupStatus] = useState(false);

  const queryClient = useQueryClient();

  const { setIsLoggedIn, setAccessToken } = useContext(AuthContext);

  const {
    values,
    handleChange,
    signinUser,
    signupUser,
    signInAsGuest,
    username,
    handleNameChange,
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
    <>
      <header>
        <nav className="bg-transparent py-3 px-4 flex justify-between items-center bg-slate-100 shadow-lg fixed top-0 w-full">
          <h1 className="font-bold text-xl relative text-slate-800 tracking-tighter">
            Work<span className="text-emerald-500">Tracker</span>
          </h1>
        </nav>
      </header>
      <main className="p-10 flex flex-col gap-4 bg-zinc-100 rounded-lg mx-auto translate-y-1/2 max-w-sm shadow-md">
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          {signupStatus && (
            <label className="text-sm ">
              Username
              <AuthFormInput
                value={username}
                type="text"
                autocomplete
                placeholder="eg. Rahul@KMxa.."
                onHandleChange={handleNameChange}
              />
            </label>
          )}
          <label className="text-sm">
            Email
            <AuthFormInput
              value={values.email}
              type="text"
              autocomplete
              placeholder="test@gmail.com"
              onHandleChange={handleChange("email")}
            />
          </label>

          <label className="text-sm ">
            Password
            <AuthFormInput
              type="password"
              autocomplete
              placeholder={"test123"}
              isPassword={true}
              value={values.password}
              onHandleChange={handleChange("password")}
            />
          </label>

          {signupStatus ? (
            <button
              type="submit"
              onClick={() => signupUser()}
              className="text-sm inline-flex justify-center cursor-pointer items-center rounded-lg transition-all ease-in-out duration-300 hover:opacity-90 hover:text-black text-gray-100 w-full bg-emerald-600 p-2 font-semibold shadow-lg"
            >
              Join now
            </button>
          ) : (
            <>
              <button
                type="submit"
                onClick={() => signinUser()}
                className="text-sm inline-flex justify-center cursor-pointer items-center rounded-lg transition-all ease-in-out duration-300 hover:opacity-90 hover:text-black text-gray-100 w-full bg-emerald-600 p-2 font-semibold shadow-lg"
              >
                Log in
              </button>
              <button
                type="submit"
                onClick={() => signInAsGuest()}
                className="text-sm inline-flex justify-center cursor-pointer items-center rounded-lg transition-all ease-in-out duration-300 bg-red-600 hover:text-black text-gray-100 w-full hover:opacity-90 p-2 font-semibold shadow-lg"
              >
                Sign in as Guest
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
          <img
            onClick={() => signinWithGoogle()}
            src={Google}
            className="w-full h-8 bg-zinc-200 p-2 rounded-lg cursor-pointer hover:bg-zinc-400 transition-all ease-in-out duration-300"
          />
          {/* <img
            src={Github}
            onClick={() => signInWithGithub()}
            className="w-full h-8 bg-zinc-200 p-2 rounded-lg cursor-pointer hover:bg-zinc-400 transition-all ease-in-out duration-300"
          /> */}
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
      </main>
      <footer className="bg-slate-100 shadow-lg py-3 px-4 flex justify-between items-center fixed bottom-0 w-full border-t-slate-200 border-t-2">
        <h1 className="font-bold text-xl relative text-slate-800 tracking-tighter">
          Work<span className="text-emerald-500">Tracker</span>
        </h1>

        <Link
          to="https://github.com/Rahul-ku-Mo/Work-Tracker"
          className="text-sm text-gray-600 hover:text-gray-400 font-bold flex gap-2 items-center "
          target="_blank"
        >
          <img src={Github} className="w-4 h-4" />
          Check out this page
        </Link>
      </footer>
    </>
  );
};

export default Auth;
