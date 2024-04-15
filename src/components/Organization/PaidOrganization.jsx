import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMountainCity } from "@fortawesome/free-solid-svg-icons";

const PaidOrganization = () => {
  return (
    <>
      <div className="bg-white/90 grow rounded-md p-8 pb-4 lg:max-w-md max-w-full  flex flex-col justify- items-center gap-8 min-h-72 max-h-fit">
        <FontAwesomeIcon
          icon={faMountainCity}
          className="h-52 w-52 transition-all ease-linear hover:text-emerald-600 bg-zinc-400/10 rounded-full object-contain"
        />
        <div className="text-xs font-bold text-emerald-600">
          You are a Paid User. You can create and manage organizations.
        </div>
      </div>
    </>
  );
};

export default PaidOrganization;
