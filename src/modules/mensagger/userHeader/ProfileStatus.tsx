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
    <div className="flex gap-2 z-10 relative px-2.5 pt-1 ">
      <div className="  flex flex-col items-center ">
        <Image
          width={54}
          height={54}
          alt="profile image"
          src="/dog.webp"
          className=" border border-blue-dark rounded-xl "
        />
        <Image
          width={50}
          height={54}
          alt="profile image shadow"
          src="/png/mensaggerWindow/profilePhotoShadow.png"
        />
      </div>

      <div className="flex flex-col    ">
        <ProfileDropdown />

        <PersonalMessage></PersonalMessage>

        <Inbox></Inbox>
      </div>
    </div>
  );
}

export default ProfileStatus;
