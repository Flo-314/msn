import {STATUS_ICONS, UserStatus} from "@/types/types";
import Image from "next/image";

export function StatusIcon({userStatus}: {userStatus: UserStatus | undefined}) {
  if (!userStatus) return null; // Si no hay un userStatus, retorna null.

  const iconSrc = STATUS_ICONS[userStatus];

  return iconSrc ? <Image height={14} width={14} alt="contact icon" src={iconSrc} /> : null;
}
