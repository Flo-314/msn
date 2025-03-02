import Window from "@/lib/common/Window";
import {useContacts} from "@/lib/hooks/contactsContext";
import {addContact} from "@/lib/supabase/models";
import Image from "next/image";
import {useState} from "react";

function AddContactButton({userId}: {userId: string}) {
  const [isAddingContact, setIsAddingContact] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const {setContacts} = useContacts();

  return (
    <div
      className="text-xs gap-1 items center flex text-darkLabel  border-b border-msnDarkGray bg-normal-gradient "
      style={{
        background: "linear-gradient(to top, #E6EBF4 0%, #E6EBF4 30%,  #ACC4EA 100%)",
      }}
    >
      <Image width={18} height={18} alt="addFriendIcon" src="/addContactIcon.png"></Image>
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
          <p
            onClick={async () => {
              const contact = await addContact(userId, email);

              if (contact) {
                setContacts((prev) => [...prev, contact]);
              }
            }}
          >
            Add a contact
          </p>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Window>
      )}
    </div>
  );
}

export default AddContactButton;
