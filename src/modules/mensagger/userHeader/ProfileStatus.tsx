import {useUser} from "@/lib/hooks/userContext";
import {updateUserStatus} from "@/lib/supabase/models";
import {UserStatus} from "@/types/types";
import Image from "next/image";

function ProfileStatus() {
  const {user} = useUser();

  return (
    <div className="flex gap-4">
      <div className="w-16 h-16 relative  border border-dark rounded-lg">
        <Image alt="profile image" src="/dog.webp" fill className="rounded-lg"></Image>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex">
          <p className="font-bold">{user?.email}</p>

          <select
            onChange={(event) => {
              const status = event.currentTarget.value as UserStatus;

              if (user) {
                updateUserStatus(user?.id, status);
              }
            }}
            id="status"
            className=" bg-transparent text-msnGray text-xs"
          >
            <option value={UserStatus.Online}>Online</option>
            <option value={UserStatus.Busy}>Busy</option>
            <option value={UserStatus.Away}>Away</option>
            <option value={UserStatus.Offline}>Appear Offline</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default ProfileStatus;
