import isEqual from "lodash.isequal";
import { useEffect, useState, useContext } from "react";
import { toast } from "sonner";
import { AuthContext } from "../../Context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { updateUserProfile } from "../../apis/userApis";

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
    Role = "",
  } = user || {};

  const [formState, setFormState] = useState({
    name: name,
    phoneNumber: phoneNumber,
    state: state,
    address: address,
    zipCode: zipCode,
    company: company,
    Role: Role,
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
    <div className="bg-white/90 rounded-xl text-black p-8 flex flex-col gap-4 justify-between w-full">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex gap-4 flex-wrap ">
          <div className="flex flex-col relative grow">
            <label
              className="text-xs tracking-tight peer-focus:text-emerald-500 text-black px-1 font-bold bg-white absolute z-20 left-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formState.name === null ? "" : formState.name}
              onChange={handleChange("name")}
              placeholder="Rahul K.M"
              className="px-3 py-2 mt-2 rounded-md peer border text-sm border-slate-300 bg-transparent focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div className="flex flex-col relative grow">
            <label
              className="text-xs tracking-tight text-black px-1 font-bold absolute bg-white z-20 left-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              readOnly
              placeholder="Your@email.com"
              className="px-3 py-2 mt-2 rounded-md text-sm border border-slate-300 bg-transparent focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>
        <div className="flex gap-4 flex-wrap ">
          <div className="flex flex-col relative grow">
            <label
              className="text-xs tracking-tight text-black px-1 font-bold bg-white absolute z-20 left-2"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="text"
              value={
                formState.phoneNumber === null ? "" : formState.phoneNumber
              }
              onChange={handleChange("phoneNumber")}
              placeholder="86905-41514"
              className="px-3 py-2 mt-2 rounded-md border text-sm border-slate-300 bg-transparent focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div className="flex flex-col relative grow">
            <label
              className="text-xs tracking-tight text-black px-1 font-bold absolute bg-white z-20 left-2"
              htmlFor="state/region"
            >
              State/Region
            </label>
            <input
              id="state/region"
              type="text"
              value={formState.state === null ? "" : formState.state}
              onChange={handleChange("state")}
              placeholder="Virginia, USA"
              className="px-3 py-2 mt-2 rounded-md text-sm border border-slate-300 bg-transparent focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="flex gap-4 flex-wrap ">
          <div className="flex flex-col relative grow">
            <label
              className="text-xs tracking-tight text-black px-1 font-bold bg-white absolute z-20 left-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              value={formState.address === null ? "" : formState.address}
              onChange={handleChange("address")}
              placeholder="1234, Main Street, Apt 2B"
              className="px-3 py-2 mt-2 rounded-md border text-sm border-slate-300 bg-transparent focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div className="flex flex-col relative grow">
            <label
              className="text-xs tracking-tight text-black px-1 font-bold absolute bg-white z-20 left-2"
              htmlFor="zip/code"
            >
              Zip/Code
            </label>
            <input
              id="zip/code"
              type="text"
              value={formState.zipCode === null ? "" : formState.zipCode}
              onChange={handleChange("zipCode")}
              placeholder="758-221"
              className="px-3 py-2 mt-2 rounded-md text-sm border border-slate-300 bg-transparent focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>
        <div className="flex gap-4 flex-wrap ">
          <div className="flex flex-col relative grow">
            <label
              className="text-xs tracking-tight text-black px-1 font-bold bg-white absolute z-20 left-2"
              htmlFor="company"
            >
              Company
            </label>
            <input
              type="text"
              id="company"
              value={formState.company === null ? "" : formState.company}
              onChange={handleChange("company")}
              placeholder="Goggle, Microsoft, Airbnb...."
              className="px-3 py-2 mt-2 rounded-md border text-sm border-slate-300 bg-transparent focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div className="flex flex-col relative grow">
            <label
              className="text-xs tracking-tight text-black px-1 font-bold absolute bg-white z-20 left-2"
              htmlFor="role"
            >
              Role
            </label>
            <input
              id="role"
              type="text"
              value={formState.Role === null ? "" : formState.Role}
              onChange={handleChange("Role")}
              placeholder="Full-Stack Developer, etc.."
              className="px-3 py-2 mt-2 rounded-md text-sm border border-slate-300 bg-transparent focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>
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
