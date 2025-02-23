import PersonalMessage from "./PersonalMessage";
import ProfileStatus from "./ProfileStatus";

function UserHeader() {
  return (
    <div>
      <ProfileStatus></ProfileStatus>
      <PersonalMessage></PersonalMessage>
    </div>
  );
}

export default UserHeader;
