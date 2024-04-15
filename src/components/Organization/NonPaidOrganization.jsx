import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMountainCity } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const NonPaidOrganization = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white/90 relative grow rounded-md p-8 pb-4 md:max-w-md max-w-full  flex flex-col justify- items-center gap-8 min-h-72 max-h-fit">
        <FontAwesomeIcon
          icon={faMountainCity}
          className="h-52 w-52 transition-all ease-linear hover:text-emerald-600 bg-zinc-400/10 rounded-full object-contain"
        />
        <span className="text-xs font-semibold text-center text-amber-600 absolute bottom-14 select-none ">
          You are not a Paid User. You can only be a part of organizations
        </span>
        <button
          onClick={() => {
            navigate("/pricing");
          }}
          className="text-center w-fit text-xs text-emerald-600 hover:text-white hover:bg-emerald-600 transition-all ease-linear rounded-md px-4 font-bold py-2 bg-emerald-100"
        >
          Subscribe to Paid Plan
        </button>
      </div>
    </>
  );
};



export default NonPaidOrganization;
