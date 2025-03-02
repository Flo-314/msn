function PersonalMessage() {
  return (
    <div className="flex">
      <input
        readOnly={true}
        type="text"
        placeholder="<Type a personal message>"
        value="  Type a personal message  "
        className="text-msngray text-xs bg-transparent w-44 "
      />
      <button className="text-xs">▼</button>
    </div>
  );
}

export default PersonalMessage;
