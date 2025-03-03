import ImageCircularButton from "./ChatImageCircularButton";
import ImageButton from "./ImageButton";

interface ChatHeaderToolbarProps {
  borderRadius?: string;
}

function ChatHeaderToolbar(props: ChatHeaderToolbarProps) {
  const {borderRadius = "6px"} = props;

  return (
    <div
      className={`w-full h-full rounded-t-[${borderRadius}] grid grid-cols-[310px_1fr] relative`}
    >
      <div
        className="grid grid-cols-[40px_56px_44px_40px_54px_44px] justify-end items-center"
        style={{
          background: "url(ui/toolbar-background.png) repeat",
          backgroundSize: "contain",
        }}
      >
        <ImageButton image="invite" text="Invite" bind="I" />
        <ImageButton image="send" text="Send Files" bind="l" />
        <ImageButton image="video" text="Video" bind="o" />
        <ImageButton image="voice" text="Voice" bind="c" />
        <ImageButton image="activities" text="Activities" bind="v" />
        <ImageButton image="games" text="Games" bind="G" />
      </div>

      <div className="grid grid-cols-[50px_50px_37px_28px] h-full">
        <div style={{background: "url(ui/small-toolbar-left-background.png) no-repeat"}}></div>
        <div
          style={{
            background:
              "url(ui/msn-logo.png) top left 4px, url(ui/small-toolbar-center-background.png)",
            backgroundRepeat: "no-repeat, repeat-x",
          }}
        >
          <div className="flex gap-[0_4px] translate-x-[2px] translate-y-[23px]">
            <ImageCircularButton image="small-block" />
            <ImageCircularButton image="small-paint" />
          </div>
        </div>
        <div style={{background: "url(ui/small-toolbar-right-background.png) no-repeat"}}></div>
        <div style={{background: "url(ui/small-toolbar-end-background.png) repeat"}}></div>
      </div>
    </div>
  );
}

export default ChatHeaderToolbar;
