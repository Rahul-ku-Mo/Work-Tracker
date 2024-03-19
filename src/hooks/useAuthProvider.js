import { useContext, useState } from "react";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import Cookies from "js-cookie";

const useAuthProvider = () => {
  const navigate = useNavigate();

  const { accessToken, setAccessToken, setIsLoggedIn } =
    useContext(AuthContext);

  const [username, setUserName] = useState("");

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const signinUser = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        values
      );

      const token = response.data.accesstoken;

      if (response.status === 200) {
        setAccessToken(token);

        console.log(token, response.data.accessToken);

        Cookies.set("accessToken", token);

        toast.success("Login successfull 🎉");

        setIsLoggedIn(true);

        navigate("/boards");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const signInAsGuest = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          email: "test@gmail.com",
          password: "test123",
        }
      );

      const token = response.data.accesstoken;

      if (response.status === 200) {
        setAccessToken(token);

        Cookies.set("accessToken", token);

        toast.success("Login successful as Guest🎉");

        setIsLoggedIn(true);

        navigate("/boards");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const signupUser = async () => {
    const updatedData = { ...values, username, name: username };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/signup`,
        updatedData
      );

      const token = response.data.accesstoken;

      Cookies.set("accessToken", token);

      setAccessToken(token);

      toast.success("Signed up and logged in successfully 🎉");

      setIsLoggedIn(true);

      navigate("/boards");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleNameChange = (e) => setUserName(e.target.value);

  return {
    signinUser,
    signupUser,
    signInAsGuest,
    values,
    handleChange,
    username,
    handleNameChange,
  };
};

export default useAuthProvider;
