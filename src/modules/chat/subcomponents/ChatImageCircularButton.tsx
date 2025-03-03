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
      <img
        src={`toolbar/${image}.png`}
        alt={image}
        style={{
          width: "var(--image-size, 16px)",
          height: "var(--image-size, 16px)",
        }}
      />
    </div>
  );
}

export default ImageCircularButton;
