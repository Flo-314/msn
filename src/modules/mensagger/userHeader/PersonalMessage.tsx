import TriangleIcon from "@/lib/common/TriangleIcon";
import {useState} from "react";

function PersonalMessage() {
  /* 
  on mouse enter
   */
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="flex items-center justify-center py-0.5 px-1 w-fit  "
    >
      <input
        readOnly={true}
        type="text"
        placeholder="<Type a personal message>"
        value="asd"
        className={`text-msngray text-xs  w-8 bg-transparent border-r  ${isHovering ? "border-blue-dark " : "border-transparent"} `}
      />
      <button className="flex items-center">
        <TriangleIcon></TriangleIcon>
      </button>
    </div>
  );
}

export default PersonalMessage;
