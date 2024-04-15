import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState } from "react";

import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import SelectCategory from "../shared/SelectCategory";
const categories = ["none", "name", "email", "role", "company"];

const MemberTable = ({ members = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const [selected, setSelected] = useState("none");

  const filteredMembers = useMemo(() => {
    return members?.filter((member) => {
      switch (selected) {
        case "name":
          return member.name.toLowerCase().includes(searchQuery.toLowerCase());
        case "email":
          return member.email.toLowerCase().includes(searchQuery.toLowerCase());
        case "role":
          return member.role.toLowerCase().includes(searchQuery.toLowerCase());
        case "company":
          return member.company
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        default:
          return member.name.toLowerCase().includes(searchQuery.toLowerCase());
      }
    });
  }, [searchQuery, members, selected]);

  return (
    <>
      <div className="flex flex-col gap-2 p-2 pt-0 min-h-[50vh]">
        <div className="flex gap-4 items-center">
          <div className="relative flex items-center cursor-pointer">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 w-4 text-slate-500/50"
            />
            <input
              className="pl-9 pr-2 text-sm border-2 font-medium  focus:border-emerald-500 border-slate-500/50 rounded-md py-1  focus:outline-none"
              value={searchQuery}
              placeholder={
                selected === "none"
                  ? `Search by name...`
                  : `Search by ${selected.toLowerCase()}...`
              }
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
          </div>
          <SelectCategory
            selected={selected}
            setSelected={setSelected}
            categories={categories}
          />
        </div>
        <table className="w-full rounded-md">
          <thead className="bg-slate-50 border-b border-slate-200 rounded-md">
            <tr>
              <th
                scope="col"
                className="font-bold  text-center text-sm text-slate-900/60"
              >
                Sr. No.
              </th>
              <th
                scope="col"
                className="font-bold p-2 text-left text-sm text-slate-900/60"
              >
                Name
              </th>

              <th
                scope="col"
                className="font-bold p-2 text-left text-sm text-slate-900/60"
              >
                Email
              </th>
              <th
                scope="col"
                className="font-bold p-2 text-left text-sm text-slate-900/60"
              >
                Company
              </th>
              <th
                scope="col"
                className="font-bold p-2 text-left text-sm text-slate-900/60"
              >
                Role
              </th>
              <th
                scope="col"
                className="font-bold p-2 text-left text-sm text-slate-900/60"
              ></th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member, index) => (
              <tr key={index} className="odd:bg-white even:bg-slate-50">
                <td className="py-3 px-2 font-medium whitespace-nowrap text-black text-sm text-center">
                  {index + 1}
                </td>
                <td className="py-3 px-2 font-medium whitespace-nowrap text-black/80 tracking-tight text-sm ">
                  {member.name}
                </td>
                <td className="py-3 px-2 font-medium whitespace-nowrap text-black/80 tracking-tight text-sm ">
                  {member.email}
                </td>
                <td className="py-3 px-2 font-medium whitespace-nowrap text-black/80 tracking-tight text-sm ">
                  {member.company}
                </td>
                <td className="py-3 px-2 font-medium whitespace-nowrap text-black/80 tracking-tight text-sm ">
                  {member.role}
                </td>
                <td className="py-3 px-2 font-medium whitespace-nowrap text-black/80 tracking-tight text-sm ">
                  <FontAwesomeIcon icon={faEllipsisVertical} className="cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MemberTable;
