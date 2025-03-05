import Window from "@/lib/common/Window";

import Image from "next/image";
import {useState} from "react";
import AddContactWindow from "./AddContactWindow";

function AddContactButton() {
  const [isAddingContact, setIsAddingContact] = useState<boolean>(false);

  return (
    <div
      className="text-xs gap-1 items center flex text-darkLabel  border-b border-msnDarkGray bg-normal-gradient "
      style={{
        background: "linear-gradient(to top, #E6EBF4 0%, #E6EBF4 30%,  #ACC4EA 100%)",
      }}
    >
      <Image
        width={18}
        height={18}
        alt="addFriendIcon"
        src="/icons/contact/addContactIcon.png"
      ></Image>
      <p
        onClick={() => {
          setIsAddingContact(true);
        }}
      >
        Add a Contact
      </p>
      {isAddingContact && (
        <Window
          onClose={() => {
            setIsAddingContact(false);
          }}
        >
          <AddContactWindow closeWindow={() => setIsAddingContact(false)} />
        </Window>
      )}
    </div>
  );
}

export default AddContactButton;
