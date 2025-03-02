import {UserStatus} from "@/types/types";
import Image from "next/image";

const statusIcons: Record<UserStatus, string> = {
  [UserStatus.Online]: "/icons/contact/connectedContactIcon.png",
  [UserStatus.Away]: "/icons/contact/awayContactIcon.png",
  [UserStatus.Offline]: "/icons/contact/offlineContactIcon.png",
  [UserStatus.Busy]: "/icons/contact/busyContactIcon.png",
};

export function StatusIcon({userStatus}: {userStatus: UserStatus | undefined}) {
  if (!userStatus) return null; // Si no hay un userStatus, retorna null.

  const iconSrc = statusIcons[userStatus];

  return iconSrc ? <Image height={14} width={14} alt="contact icon" src={iconSrc} /> : null;
}
