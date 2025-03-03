import Image from "next/image";

interface ImageButtonProps {
  image: string;
  text: string;
}

function ImageButton(props: ImageButtonProps) {
  const {image, text} = props;

  return (
    <div className="inline-flex flex-col items-center justify-center ">
      <div className="relative h-[32px] w-[32px]">
        <Image fill src={`/toolbar/${image}.png`} alt={text} />
      </div>

      <div className="font-[Verdana] text-[10.5px] tracking-[-0.25px] text-[#434C4B]">{text}</div>
    </div>
  );
}

export default ImageButton;
