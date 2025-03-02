function WindowButton({
  type,
  onClick,
}: {
  type: "close" | "minimize" | "maximize";
  onClick?: () => void;
}) {
  let buttonContent;

  switch (type) {
    case "close":
      buttonContent = "X"; // Use an icon or text for close
      break;
    case "minimize":
      buttonContent = "_"; // Use an icon or text for minimize
      break;
    case "maximize":
      buttonContent = "□"; // Use an icon or text for maximize
      break;
  }

  return (
    <button
      aria-label={type}
      onClick={onClick}
      className={`h-xpButton w-xpButton border-1 ${type === "close" ? "bg-negative-dark" : ""}  rounded-sm border-white flex items-center justify-center`}
    >
      {buttonContent}
    </button>
  );
}

export default WindowButton;
