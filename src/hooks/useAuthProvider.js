import { useCallback, useState } from "react";
import { auth } from "../Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const useAuthProvider = () => {
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const signinWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        toast.success("🎉 Goggle Sign In Successful 🎉");
        navigate("/dashboard");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        toast.error(errorMessage);
        // ...
      });
  };

  const signInWithGithub = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...

        toast.success("🎉 Github Sign In Successful 🎉");
        navigate("/dashboard");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);

        toast.error(errorCode);
      });
  };

  const [name, setName] = useState("");

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleNameChange = (e) => setName(e.target.value);

  const signupUser = useCallback(async () => {
    if (values.email !== "" && values.password !== "" && name !== "") {
      await createUserWithEmailAndPassword(auth, values.email, values.password)
        .then(() => {
          toast.success("🎉 Success! User Created Successfully 🎉");
          navigate("/dashboard");
        })
        .catch((error) => {
          toast.error(error.message);
        });

      if (name !== "") {
        await updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            toast.success("🎉 username added Successfully 🎉");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [values.email, values.password, name]);

  const signinUser = useCallback(() => {
    if (values.email !== "" && values.password !== "") {
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in
          toast.success("🎉 Success! Signed In Successfully 🎉");
          // ...Clear fields
          setValues({ email: "", password: "" });
          //...Navigate on success
          navigate("/dashboard");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, [values.email, values.password]);

  return {
    signinUser,
    signupUser,
    signinWithGoogle,
    signInWithGithub,
    values,
    handleChange,
    name,
    handleNameChange,
  };
};

export default useAuthProvider;
