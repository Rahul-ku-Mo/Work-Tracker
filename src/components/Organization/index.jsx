import Container from "../../layouts/Container";
import { useContext } from "react";

import NonPaidOrganization from "./NonPaidOrganization";
import PaidOrganization from "./PaidOrganization";
import OrganizationSidebar from "../Sidebar/OrganizationSidebar";
import { UserContext } from "../../Context/UserContext";

const Organization = () => {
  const { user, isPending } = useContext(UserContext);

  //1.check for the user is a paid or not
  const paidUser = user?.isPaidUser;

  if (isPending) {
    return (
      <Container>
        <h1 className="text-2xl font-bold text-black capitalize tracking-tight my-4 border-l-4 h-6 inline-flex items-center pl-2 border-gray-800 ">
          Manage Organization
        </h1>
        <div className="absolute z-0 inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-white/50 rounded-md p-4  text-center">
            <h1 className="text-2xl font-bold text-black/50">
              Create your organization
            </h1>
            <p className="text-sm font-medium text-black/40">
              Start by opting for a <strong>paid plan</strong>.
            </p>
          </div>
        </div>
      </Container>
    );
  }
  return (
    <Container background={"bg-slate-100/90"}>
      <h1 className="text-2xl font-bold text-black capitalize tracking-tight my-4 border-l-4 h-6 inline-flex items-center pl-2 border-gray-800 ">
        Manage Organization
      </h1>
      <OrganizationSidebar />
      <div className="flex gap-4 flex-wrap pl-24">
        {paidUser ? <PaidOrganization /> : <NonPaidOrganization />}
        <div className="bg-white/90 grow rounded-md min-h-72">
          <div className="flex w-full h-full  text-center items-center justify-center text-base font-bold text-black/50 ">
            <span className="text-center max-w-md">
              "Choose organization to start managing your team."
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Organization;
