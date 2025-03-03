interface ImageButtonProps {
  image: string;
  text: string;
  bind?: string;
}

function ImageButton(props: ImageButtonProps) {
  const {image, text, bind} = props;
  const label = bind ? text.replace(bind, `<span>${bind}</span>`) : text;

  return (
    <div className="inline-flex flex-col items-center justify-center">
      <img src={`toolbar/${image}.png`} alt={text} />
      <div
        className="font-[Verdana] text-[10.5px] tracking-[-0.25px] text-[#434C4B]"
        dangerouslySetInnerHTML={{__html: label}}
      />
    </div>
  );
}

export default ImageButton;
