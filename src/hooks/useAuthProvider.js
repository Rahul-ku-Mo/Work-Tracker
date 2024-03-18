import { useContext, useState } from "react";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import Cookies from "js-cookie";

const useAuthProvider = () => {
  const navigate = useNavigate();

  const { setAccessToken } = useContext(AuthContext);

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

      Cookies.set("accessToken", token, { expires: 7 });
      setAccessToken(token);

      toast.success("Login successful 🎉");
      navigate("/boards");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const signupUser = async () => {
    const updatedData = { ...values, username };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/signup`,
        updatedData
      );

      console.log(response.data.accesstoken);
      const token = response.data.accesstoken;

      Cookies.set("accessToken", token, { expires: 7 });

      setAccessToken(token);
      toast.success("Signed up and logged in successfully 🎉");
      navigate("/boards");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleNameChange = (e) => setUserName(e.target.value);

  return {
    signinUser,
    signupUser,
    values,
    handleChange,
    username,
    handleNameChange,
  };
};

export default useAuthProvider;
