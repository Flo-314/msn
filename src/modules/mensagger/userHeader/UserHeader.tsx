import ProfileStatus from "./ProfileStatus";

function UserHeader() {
  return (
    <div
      className="relative border border-msnDarkGray rounded-lg mb-0.5 py-0.5  "
      style={{
        background: "linear-gradient(to top, #E6EBF4 0%, #E6EBF4 80%,  #ACC4EA 100%)",
      }}
    >
      <ProfileStatus></ProfileStatus>
      <div
        className="p-2 rounded-t-xl h-6 absolute w-full -mt-6 "
        style={{
          background: "linear-gradient(to top, #E6EBF4 0%, #E6EBF4 30%,  #ACC4EA 100%)",
        }}
      />
    </div>
  );
}

export default UserHeader;
