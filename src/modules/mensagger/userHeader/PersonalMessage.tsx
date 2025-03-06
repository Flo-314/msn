import TriangleIcon from "@/lib/common/TriangleIcon";

function PersonalMessage() {
  return (
    <div className="flex px-1 border  border-transparent hover:border-blue-dark">
      <input
        readOnly={true}
        type="text"
        placeholder="<Type a personal message>"
        value="asd"
        className="text-msngray text-xs bg-transparent w-8 "
      />
      <TriangleIcon></TriangleIcon>
    </div>
  );
}

export default PersonalMessage;
