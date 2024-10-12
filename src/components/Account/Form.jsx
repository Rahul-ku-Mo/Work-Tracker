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
    <div className="dark:bg-zinc-900 dark:text-white bg-white/90 rounded-md text-black p-8 flex flex-col gap-4 justify-between w-full">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <FormInput
            id="name"
            type="text"
            htmlFor="name"
            formStateValue={formState.name}
            handleChange={handleChange}
            placeholder="Rahul K.M"
            value="Name"
            description="This is the name that will be displayed on your profile and in emails."
          />
          <FormInput
            id="email"
            type="email"
            htmlFor="email"
            formStateValue={formState.email}
            placeholder="Rahu@km.com"
            handleChange={handleChange}
            readOnly
            value="Email"
            description="You cannot change your email since it's unique."
          />
        </div>
        <div className="grid gap-4 grid-cols-2">
          <FormInput
            id="phoneNumber"
            type="tel"
            htmlFor="phoneNumber"
            formStateValue={formState.phoneNumber}
            handleChange={handleChange}
            placeholder="12345-67890"
            value="Phone Number"
            description="Update your phone number if it has changed. Leave it as is if it's still current."
          />
          <FormInput
            id="state"
            type="text"
            htmlFor="state"
            formStateValue={formState.state}
            handleChange={handleChange}
            placeholder="Karnataka"
            value="State"
            description="Enter your state of residence. This helps us provide location-specific services."
          />
        </div>

        <div className="grid gap-4 grid-cols-2">
          <FormInput
            type="text"
            id="address"
            htmlFor="address"
            formStateValue={formState.address}
            handleChange={handleChange}
            placeholder="1234, Main Street, Apt 2B"
            value="Address"
            description="Enter your full address including street, apartment number, city, and state if applicable."
          />
          <FormInput
            id="zipCode"
            type="text"
            htmlFor="zipCode"
            formStateValue={formState.zipCode}
            handleChange={handleChange}
            placeholder="560001"
            value="Zip Code"
            description="Enter your postal code. This helps us provide location-specific services if needed."
          />
        </div>
        <div className="grid gap-4 grid-cols-2">
          <FormInput
            id="company"
            type="text"
            htmlFor="company"
            formStateValue={formState.company}
            handleChange={handleChange}
            placeholder="Company Name"
            value="Company"
            description="Enter the name of your current employer or your own company if you're self-employed."
          />
          <FormInput
            id="role"
            type="text"
            htmlFor="role"
            formStateValue={formState.role}
            handleChange={handleChange}
            placeholder="Software Developer"
            value="Role"
            description="Enter your current job title or role within your company. This helps us assign you task to your professional needs."
          />
        </div>
      </form>
      <button
        onClick={handleSubmit}
        disabled={isEqual(formState, initialState)}
        className="dark:bg-zinc-100 dark:text-black bg-zinc-800 self-end disabled:opacity-50 disabled:cursor-not-allowed font-bold text-sm w-fit text-white rounded-lg px-4 cursor-pointer py-2 hover:opacity-80 transition-all ease-in-out"
      >
        Save Changes
      </button>
    </div>
  );
};

export default Form;
