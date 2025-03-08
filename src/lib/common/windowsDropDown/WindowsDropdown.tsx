import {UserStatus} from "@/types/types";
import DropDownCard from "./DropdownCard";
const statusOptions: {label: string; status: UserStatus}[] = [
  {label: "Online", status: UserStatus.Online},
  {label: "Busy", status: UserStatus.Busy},
  {label: "Away", status: UserStatus.Away},
  {label: "Appear Offline", status: UserStatus.Offline},
];

function WindowsDropDown() {
  return (
    <ul className="absolute left-0 mt-1  bg-gray-100 border border-input ">
      {statusOptions.map((option, index) => (
        <DropDownCard
          onClick={() => {}}
          key={index}
          iconStatus={option.status}
          text={option.label}
        ></DropDownCard>
      ))}
      <hr className="border-input" />

      <DropDownCard text="Change My Display Picture..." />
      <hr className="border-input  " />

      <DropDownCard text="            Personal Settings..." />
    </ul>
  );
}

export default WindowsDropDown;
