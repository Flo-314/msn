import TriangleIcon from "@/lib/common/TriangleIcon";
import PersonalMessageInput from "./PersonalMessageInput";

function PersonalMessage() {
  return (
    <div className="flex items-center justify-center   w-fit border border-transparent hover:border-blue-dark   hover:bg-gray-light  ">
      <PersonalMessageInput></PersonalMessageInput>

      <button className="flex items-center justify-center w-4">
        <TriangleIcon></TriangleIcon>
      </button>
    </div>
  );
}

export default PersonalMessage;
