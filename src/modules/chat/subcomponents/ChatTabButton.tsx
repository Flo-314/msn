interface TabButtonProps {
  image: string;
  focus?: boolean;
}

function TabButton(props: TabButtonProps) {
  const {image, focus = false} = props;

  return (
    <div
      className={`
          min-w-[25px] h-[18px] border border-[#ABB0C6] border-t-0 rounded-b-[6px] 
          flex justify-center ${focus ? "bg-white border-b-[3px] border-b-[#E2C47B] -translate-y-[1px]" : "bg-[#EDF2F8]"}
        `}
    >
      <img src={`tabs/${image}.png`} alt={image} className="w-[16px] h-[16px]" />
    </div>
  );
}

export default TabButton;
