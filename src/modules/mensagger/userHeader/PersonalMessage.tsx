function PersonalMessage() {
  return (
    <div className="flex">
      <input
        readOnly={true}
        type="text"
        placeholder="<Type a personal message>"
        value="asd"
        className="text-msngray text-xs bg-transparent w-8 "
      />
      <button className="text-[6px]">▼</button>
    </div>
  );
}

export default PersonalMessage;
