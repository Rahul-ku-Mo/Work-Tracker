import { useState } from "react";
import FormInput from "../shared/Input/FormInput";
import { createOrganization } from "../../apis/OrganizationApis";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "sonner";

const OrganizationForm = ({ teamLeader = "" }) => {
  const [formState, setFormState] = useState({
    orgname: "",
    teamLeader: teamLeader,
  });

  const accessToken = Cookies.get("accessToken");

  const handleChange = (prop) => (event) => {
    setFormState({ ...formState, [prop]: event.target.value });
  };

  const createOrganizationMutation = useMutation({
    mutationFn: async (data) => await createOrganization(accessToken, data),

    onSuccess: (data) => {
      toast.success("Organization created successfully");
    },
  });

  return (
    <>
      <h2 className="text-sm font-bold">Create Organization</h2>
      <form
        className="flex flex-col max-h-36 gap-2"
        onSubmit={async (e) => {
          e.preventDefault();

          createOrganizationMutation.mutate(formState);
        }}
      >
        <FormInput
          id="orgname"
          formStateValue={formState.orgname}
          handleChange={handleChange}
          type="text"
          htmlFor="orgname"
          value="Organization Name"
        />
        <FormInput
          id="teamLeader"
          formStateValue={formState.teamLeader}
          handleChange={handleChange}
          type="text"
          htmlFor="teamLeader"
          value="Team Leader"
          readOnly
        />
        <button
          disabled={formState.orgname === "" ? true : false}
          className="text-sm bg-black text-slate-50 px-4 disabled:opacity-50 disabled:cursor-not-allowed py-2 rounded-md my-2 font-semibold transition-all ease-linear"
        >
          Create Organization
        </button>
      </form>
    </>
  );
};

export default OrganizationForm;
