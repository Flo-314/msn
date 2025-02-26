import {useContacts} from "@/lib/hooks/contactsContext";
import {addContact} from "@/lib/supabase/models";
import {UUID} from "crypto";
import {useState} from "react";

function AddContactButton({userId}: {userId: UUID | string}) {
  const [email, setEmail] = useState("");
  const {setContacts} = useContacts();

  return (
    <div
      className="text-sm text-darkLabel pt-5 border-b border-msnLightGray"
      style={{
        background: "linear-gradient(to top, #EFF5FF 0%, #EFF5FF 15%, #ACC4EA 100%)",
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
      {/* imagen */}
      <div></div>
    </div>
  );
}

export default AddContactButton;
