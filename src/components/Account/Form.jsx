import isEqual from "lodash.isequal";
import { useEffect, useState, useContext } from "react";
import { toast } from "sonner";
import { AuthContext } from "../../Context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "../../apis/userApis";
import FormInput from "../shared/Input/FormInput";

const Form = ({ user }) => {
  const { accessToken } = useContext(AuthContext);

  const {
    name = "",
    email = "",
    phoneNumber = "",
    state = "",
    address = "",
    zipCode = "",
    company = "",
    role = "",
  } = user || {};

  const [formState, setFormState] = useState({
    name,
    email,
    phoneNumber,
    state,
    address,
    zipCode,
    company,
    role,
  });

  const handleChange = (prop) => (event) => {
    setFormState({ ...formState, [prop]: event.target.value });
  };

  const [initialState, setInitialState] = useState(formState);

  const queryClient = useQueryClient();

  useEffect(() => {
    setInitialState(formState);
  }, [user]);

  const updateProfileMutation = useMutation({
    mutationFn: async (data) => {
      return await updateUserProfile(accessToken, data);
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEqual(formState, initialState)) {
      toast.info("No changes to save");
      return;
    }

    updateProfileMutation.mutate(formState);
  };

  return (
    <div className="bg-white/90 rounded-xl text-black p-8 flex flex-col gap-4 justify-between w-full">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-4">
          <FormInput
            id="name"
            type="text"
            htmlFor="name"
            formStateValue={formState.name}
            handleChange={handleChange}
            placeholder="Rahul K.M"
            value="Name"
          />
          <FormInput
            id="email"
            type="email"
            htmlFor="email"
            formStateValue={formState.email}
            handleChange={handleChange}
            placeholder="Rahu@km.com"
            readOnly
            value="Email"
          />
        </div>
        <div className="flex gap-4 flex-wrap ">
          <FormInput
            id="phoneNumber"
            type="tel"
            htmlFor="phoneNumber"
            formStateValue={formState.phoneNumber}
            handleChange={handleChange}
            placeholder="12345-67890"
            value="Phone Number"
          />
          <FormInput
            id="state"
            type="text"
            htmlFor="state"
            formStateValue={formState.state}
            handleChange={handleChange}
            placeholder="Karnataka"
            value="State"
          />
        </div>

        <div className="flex gap-4 flex-wrap ">
          <FormInput
            type="text"
            id="address"
            htmlFor="address"
            formStateValue={formState.address}
            handleChange={handleChange}
            placeholder="1234, Main Street, Apt 2B"
            value="Address"
          />
          <FormInput
            id="zipCode"
            type="text"
            htmlFor="zipCode"
            formStateValue={formState.zipCode}
            handleChange={handleChange}
            placeholder="560001"
            value="Zip Code"
          />
        </div>
        <div className="flex gap-4 flex-wrap ">
          <FormInput
            id="company"
            type="text"
            htmlFor="company"
            formStateValue={formState.company}
            handleChange={handleChange}
            placeholder="Company Name"
            value="Company"
          />
          <FormInput
            id="role"
            type="text"
            htmlFor="role"
            formStateValue={formState.role}
            handleChange={handleChange}
            placeholder="Software Developer"
            value="Role"
          />
        </div>
      </form>
      <button
        onClick={handleSubmit}
        disabled={isEqual(formState, initialState)}
        className="bg-slate-800 self-end disabled:opacity-50 disabled:cursor-not-allowed font-bold text-sm w-fit text-white rounded-lg px-4 cursor-pointer py-2 hover:opacity-80 transition-all ease-in-out"
      >
        Save Changes
      </button>
    </div>
  );
};

export default Form;
