import NavbarButton from "../shared/Button/Button";
import {
  faLock,
  faBolt,
  faRocket,
  faBarsProgress,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";

const SubNavbar = () => {
  return (
    <nav className="flex text-lg justify-between font-semibold text-white items-center py-2 bg-gray-200 z-20 fixed top-0 w-full">
      <div className="flex justify-between flex-1">
        <div className="flex items-center">
          <div className="px-2 border-x-2 hidden md:block">
            <NavbarButton icon={faLock} btnInput={"Private"} />
          </div>
          <div className="px-2 hidden md:block">
            <NavbarButton icon={faClipboardList} btnInput={"Board"} />
          </div>
        </div>
        <div className="md:flex mr-2 items-center hidden md:justify-end">
          <div>
            <NavbarButton icon={faBolt} btnInput={"Automation"} />
          </div>
          <div className="px-2 ">
            <NavbarButton icon={faRocket} btnInput={"Power-Ups"} />
          </div>
          <div className="px-2 border-x-2">
            <NavbarButton icon={faBarsProgress} btnInput={"Filters"} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SubNavbar;
