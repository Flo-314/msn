import Image from "next/image";

function Inbox() {
  return (
    <div className="flex z-10">
      <Image src={"/cardIcon.PNG"} width={22} height={16} className="" alt="lettericon"></Image>
    </div>
  );
}

export default Inbox;
