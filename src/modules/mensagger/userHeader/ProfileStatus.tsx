import Image from "next/image";
import PersonalMessage from "./PersonalMessage";
import Inbox from "./Inbox";

import ProfileDropdown from "./profileStatusDropDown/ProfileDropdown";

function ProfileStatus() {
  /* 
  
   onChange={(event) => {
              const status = event.currentTarget.value as UserStatus;

              if (user) {
                updateUserStatus(user?.id, status);
                setStatus(status);
              }
            }}
  
  */

  return (
    <div className="flex gap-2 z-10 relative px-2.5 pt-2.5 ">
      <div className="w-14 h-14 relative  border border-blue-dark rounded-xl mb-4">
        <Image
          alt="profile image"
          src="/dog.webp"
          sizes={"54px"}
          fill
          className="rounded-xl "
        ></Image>
      </div>

      <div className="flex flex-col gap-1 mt-1  ">
        <ProfileDropdown />

        <PersonalMessage></PersonalMessage>

        <Inbox></Inbox>
      </div>
    </div>
  );
}

export default ProfileStatus;
