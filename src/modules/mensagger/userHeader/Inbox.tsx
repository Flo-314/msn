import Image from "next/image";

function Inbox() {
  return (
    <div className="flex z-10 gap-5 mt-2 ">
      <Image
        src={"/icons/userHeader/mailIcon.png"}
        width={15}
        height={15}
        className=""
        alt="lettericon"
      ></Image>
      <div className="flex gap-1">
        <Image
          src={"/icons/userHeader/msnTodayIcon.png"}
          width={15}
          height={15}
          className=""
          alt="lettericon"
        ></Image>
        <p className="text-blueText text-xs ">MSN Today</p>
      </div>
    </div>
  );
}

export default Inbox;
