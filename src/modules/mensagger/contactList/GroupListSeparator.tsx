import {UserStatus} from "@/types/types";
import Image from "next/image";

function ContactGroupSeparator({
  contactStatus,
  isCollapsed,
  toggleGroup,
  count,
}: {
  contactStatus: UserStatus;
  isCollapsed: boolean;
  toggleGroup: (status: UserStatus) => void;
  count: number;
}) {
  return (
    <div
      className="flex gap-1 items-center cursor-pointer"
      onClick={() => toggleGroup(contactStatus)}
    >
      <Image
        height={12}
        width={12}
        alt={isCollapsed ? "expand" : "collapse"}
        src={
          isCollapsed
            ? "/icons/contact/contactGroupMaximize.png"
            : "/icons/contact/contactGroupMinimize.png"
        }
      />
      <p className="text-xs font-bold text-blueText capitalize">
        {contactStatus} ({count})
      </p>
    </div>
  );
}

export default ContactGroupSeparator;
