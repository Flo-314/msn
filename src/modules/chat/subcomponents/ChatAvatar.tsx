import Image from "next/image";

interface ChatAvatarProps {
  image?: string;
}

function ChatAvatar(props: ChatAvatarProps) {
  const {image = "msn"} = props;

  return (
    <div className="w-[114px] h-[114px] flex justify-center items-center flex-col border border-[#586170] rounded-[8px] relative">
      <Image
        className=" border border-[#586170] rounded-[8px] translate-y-[4px]"
        width={96}
        height={96}
        src={`/avatars/${image}.png`}
        alt="Avatar"
      />
      <button className="border-0 bg-transparent text-[#4D5967] scale-y-[0.5] self-end">⯆</button>
      <Image
        width={8}
        height={35}
        className="absolute top-[4px] right-[-9px]"
        src="/ui/expand-left.png"
        alt="expand arrow"
      />
    </div>
  );
}

export default ChatAvatar;
