import Image from "next/image";

function Inbox() {
  return (
    <div className="flex z-10 gap-2 mt-2  x">
      <div className="border flex items-center py-0.5 px-1 border-transparent hover:border-blue-dark hover:bg-gray-light">
        <Image
          src={"/icons/userHeader/mailIcon.png"}
          width={17}
          height={17}
          className=""
          alt="lettericon"
        ></Image>
      </div>
      <div className="flex items-center gap-1 border py-0.5 px-1 border-transparent hover:border-blue-dark hover:bg-gray-light">
        <Image
          src={"/icons/userHeader/msnTodayIcon.png"}
          width={17}
          height={17}
          alt="lettericon"
        ></Image>
        <span className="text-blueText text-xs ">MSN Today</span>
      </div>
    </div>
  );
}

export default Inbox;
