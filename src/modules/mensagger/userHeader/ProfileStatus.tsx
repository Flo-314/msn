import {useUser} from "@/lib/hooks/userContext";
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

          <select id="status" className=" bg-transparent text-msnGray text-xs">
            <option value="online">Online</option>
            <option value="busy">Busy</option>
            <option value="away">Away</option>
            <option value="offline">Appear Offline</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default ProfileStatus;
