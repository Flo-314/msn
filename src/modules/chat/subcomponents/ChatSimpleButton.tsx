import Image from "next/image";

interface SimpleButtonProps {
  image: string;
  label?: string;
  arrow?: boolean;
}

function SimpleButton(props: SimpleButtonProps) {
  const {image, label = "", arrow = false} = props;

  return (
    <div className="flex items-center px-[6px] h-full">
      <Image src={`/simple/${image}.png`} alt={image} height={16} width={16} />

      {label && (
        <span className="font-[Verdana] text-[10px] text-[#444] inline-block w-[50px] pl-[3px]">
          {label}
        </span>
      )}
      {arrow && <button className="border-0 bg-transparent scale-[0.6] p-0">⯆</button>}
    </div>
  );
}

export default SimpleButton;
