import OrganizationPopover from "../Organization/OrganizationPopover";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import {
  useOrganizationLead,
  useOrganizationMember,
} from "../../hooks/useQueries";
import Cookies from "js-cookie";
import { UserContext } from "../../Context/UserContext";

const OrganizationSidebar = () => {
  const navigate = useNavigate();

  const accessToken = Cookies.get("accessToken");

  const { user, isPending } = useContext(UserContext);

  const { data: organizationsLead } = useOrganizationLead(
    accessToken,
    user?.id
  );

  const { data: organizationsMember } = useOrganizationMember(
    accessToken,
    user?.id
  );

  const paidUser = user?.isPaidUser;

  const isTeamLeader = user?.name;

  return (
    <div className="absolute h-full bg-white/90 z-10">
      <div className="p-2 w-20 rounded-md flex flex-col gap-2 shadow-md h-full ">
        {organizationsLead?.length !== 0 && (
          <h3 className="text-sm font-bold text-center">Lead</h3>
        )}
        {organizationsLead?.map((org, index) => (
          <div
            key={"tm" + index}
            onClick={() => navigate("/organization/" + org.id)}
            className="p-2 bg-emerald-100 uppercase h-12 text-emerald-500 font-bold text-center text-lg inline-flex items-center justify-center rounded-md cursor-pointer hover:bg-emerald-500 hover:text-white transition-all ease-linear"
          >
            {org.name.slice(0, 2)}
          </div>
        ))}
        {organizationsMember?.length !== 0 && (
          <h3 className="text-sm font-bold text-center">Member</h3>
        )}
        {organizationsMember?.map((org, index) => (
          <div
            key={"me" + index}
            onClick={() => navigate("/organization/" + org.id)}
            className="p-2 bg-emerald-100 uppercase h-12 text-emerald-500 font-bold text-center text-lg inline-flex items-center justify-center rounded-md cursor-pointer hover:bg-emerald-500 hover:text-white transition-all ease-linear"
          >
            {org.name.slice(0, 2)}
          </div>
        ))}
        <OrganizationPopover teamLeader={isTeamLeader} paidUser={paidUser} />
      </div>
    </div>
  );
};

export default OrganizationSidebar;
