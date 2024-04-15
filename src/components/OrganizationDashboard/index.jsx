import OrganizationCard from "./OrganizationCard";
import Container from "../../layouts/Container";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import OrganizationSidebar from "../Sidebar/OrganizationSidebar";
import { useOrganization } from "../../hooks/useQueries";
import MemberTable from "./MemberTable";
import MemberDialog from "./MemberDialog";
import { useContext, useState } from "react";
import LoadingScreen from "../LoadingScreen";
import OrganizationBoard from "./OrganizationBoard";
import { UserContext } from "../../Context/UserContext";

const OrganizationDashboard = () => {
  const accessToken = Cookies.get("accessToken");

  const { organizationId } = useParams();

  const { user } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const { data: organization, isPending } = useOrganization(
    accessToken,
    organizationId
  );

  if (isPending) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Container background={"bg-slate-100/90"}>
        <h1 className="text-2xl font-bold text-black capitalize tracking-tight my-4 border-l-4 h-6 inline-flex items-center pl-2 border-gray-800 ">
          Manage Organization
        </h1>
        <OrganizationSidebar />
        <div className="flex gap-4 flex-wrap pl-24">
          <div className="flex lg:flex-col gap-2 flex-wrap">
            <OrganizationCard name={organization?.name} />
            <OrganizationBoard boards={organization?.boards} />
          </div>
          <div className="bg-white/90 grow rounded-md min-h-80 max-h-full flex flex-col overflow-x-auto">
            <h2 className="flex justify-between items-center p-2">
              <span className="text-lg font-bold leading-5 border-l-4 px-2 border-l-black">
                Members and Collaborators
              </span>
              {user?.id === organization?.teamLead.id && (
                <button
                  onClick={openModal}
                  className="px-4 py-2 bg-emerald-200 text-emerald-600 hover:bg-emerald-600 hover:text-white font-bold text-sm rounded-md transition-all ease-in-out "
                >
                  Add Member
                </button>
              )}
            </h2>

            {user?.isPaidUser && organization?.members.length !== 0 ? (
              <MemberTable members={organization?.members} />
            ) : organization?.members.length === 0 ? (
              <div className="flex w-full h-full bg-white/90 text-center items-center min-h-96 justify-center text-base font-bold text-black/50 ">
                "No members yet. Add members to your organization."
              </div>
            ) : (
              <div className="flex w-full h-full bg-white/90 text-center items-center min-h-96 justify-center text-base font-bold text-black/50 ">
                "Only Managers can access member and collaborator details."
              </div>
            )}
          </div>
        </div>
      </Container>
      <MemberDialog isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};

export default OrganizationDashboard;
