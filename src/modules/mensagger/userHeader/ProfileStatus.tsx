import {useUser} from "@/lib/hooks/userContext";
import {updateUserStatus} from "@/lib/supabase/models";
import {UserStatus} from "@/types/types";
import Image from "next/image";
import {useEffect, useState} from "react";
import PersonalMessage from "./PersonalMessage";
import Inbox from "./Inbox";

function ProfileStatus() {
  const {user} = useUser();
  const [status, setStatus] = useState<UserStatus>(UserStatus.Online);

  useEffect(() => {
    const savedStatus = localStorage.getItem("status") as UserStatus;

    if (savedStatus) {
      setStatus(savedStatus);
    }
  }, []);

  return (
    <div className="flex gap-4 z-10 relative px-2.5 pt-2.5">
      <div className="w-14 h-14 relative  border border-blue-dark rounded-xl mb-4">
        <Image
          alt="profile image"
          src="/dog.webp"
          sizes={"54px"}
          fill
          className="rounded-xl "
        ></Image>
      </div>

      <div className="flex flex-col gap-1 mt-1 ">
        <div className="flex text-xs gap-3">
          <p className="font-bold">{user?.username}</p>

          <select
            value={status}
            onChange={(event) => {
              const status = event.currentTarget.value as UserStatus;

              if (user) {
                updateUserStatus(user?.id, status);
                setStatus(status);
              }
            }}
            id="status"
            className=" bg-transparent text-msnGray text-xs  font-extralight"
          >
            <option value={UserStatus.Online}>Online</option>
            <option value={UserStatus.Busy}>Busy</option>
            <option value={UserStatus.Away}>Away</option>
            <option value={UserStatus.Offline}>Appear Offline</option>
          </select>
        </div>
        <PersonalMessage></PersonalMessage>

        <Inbox></Inbox>
      </div>
    </div>
  );
}

export default ProfileStatus;
