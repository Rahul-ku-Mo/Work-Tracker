import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMountainCity } from "@fortawesome/free-solid-svg-icons";

const OrganizationCard = ({ name = "", count = "1" }) => {
  return (
    <div className="bg-white/90 grow shrink-0 rounded-md p-8 pb-4 lg:max-w-sm  items-start  h-80 max-h-fit">
      <FontAwesomeIcon
        icon={faMountainCity}
        className="h-52 w-52 transition-all ease-linear hover:text-emerald-600 bg-zinc-400/10 rounded-full object-contain"
      />
      <div className=" text-emerald-600 font-black text-3xl tracking-tight">
        {name}
      </div>
      <div className="text-sm opacity-50 tracking-tight font-medium leading-5">
      {count} members
      </div>
    </div>
  );
};

export default OrganizationCard;
