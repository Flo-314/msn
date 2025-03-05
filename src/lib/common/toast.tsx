import Image from "next/image";

interface MSNToastProps {
  username: string;
  closeToast?: () => void;
}

export default function NotificationToast({
  username = "flop@escargot.chat",
  closeToast,
}: MSNToastProps) {
  return (
    <div className="text-xs text-darkLabel border border-blueToast-100 p-[1px] bg-white">
      {/* Header */}
      <div className="bg-backforth-gradient flex justify-between py-0.5 items-center px-1">
        <div className="flex gap-2">
          <Image height={16} width={16} alt="windowIcon" src="/icons/windowsIcon.png" />
          <p>MSN Mensagger</p>
        </div>

        <button name="close" onClick={closeToast} className="">
          <Image
            width={12}
            height={12}
            alt="close notification"
            src="/icons/toast/closeIcon.png"
          ></Image>
        </button>
      </div>

      <div className="bg-backforth-gradient border border-blueToast-200 ">
        <div className="flex justify-end">Options</div>
        <div className="flex items-center justify-center pl-1 pr-2 gap-1.5 mb-1">
          <div className="w-12 h-12 relative border border-w rounded-xl ">
            <Image
              alt="profile image"
              src="/dog.webp"
              fill
              className="rounded-xl border-blueToast-300 "
            ></Image>
          </div>
          <div>
            <p className="break-words max-w-32">{username} </p>
            <p>has just signed in</p>
          </div>
        </div>
        <div className="flex justify-end">
          <Image src={"/png/msnLogo.png"} width={60} height={27} alt="msn logo"></Image>
        </div>
      </div>
    </div>
  );
}
