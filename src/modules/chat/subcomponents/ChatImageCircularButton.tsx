import Image from "next/image";

interface ImageCircularButtonProps {
  image: string;
  className?: string;
}

function ImageCircularButton(props: ImageCircularButtonProps) {
  const {image, className = ""} = props;

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={{
        width: "var(--size, 24px)",
        height: "var(--size, 24px)",
      }}
    >
      <Image width={16} height={16} src={`/toolbar/${image}.png`} alt={image} />
    </div>
  );
}

export default ImageCircularButton;
