import Image from "next/image";

function Inbox() {
  return (
    <div
      className="p-2 rounded-t-xl"
      style={{
        background: "linear-gradient(to top, #DFE8F6 0%,  #ACC4EA 100%)",
      }}
    >
      <Image
        src={"/cardIcon.PNG"}
        width={22}
        height={16}
        className="ml-[19%]"
        alt="lettericon"
      ></Image>
    </div>
  );
}

export default Inbox;
