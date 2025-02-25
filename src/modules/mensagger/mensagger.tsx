import Window from "@/lib/common/Window";
import {getContacts} from "@/lib/supabase/models";
import {useEffect, useState} from "react";
import usePartySocket from "partysocket/react";
import UserHeader from "./userHeader/UserHeader";
import AddContactButton from "./contactList/addContactButton";
import ContactList from "./contactList/contactList";
import Ad from "./Ad";
import Inbox from "./Inbox";
import {ChatInstance, Contact, User} from "@/types/types";
import {UUID} from "crypto";
import {useChatInstances} from "@/lib/hooks/chatsContext";
import {supabase} from "@/lib/utils/supabase/client";
import {RealtimeChannel} from "@supabase/supabase-js";

function Mensagger({user}: {user: User}) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const {setChatInstances, chatInstances} = useChatInstances();

  useEffect(() => {
    if (!user) return;

    let statusChannel: RealtimeChannel | null = null;

    const fetchContacts = async () => {
      const contacts = await getContacts(user.id);

      if (!contacts) return;

      setContacts(contacts);
      const contactsIds = contacts.map((contact) => contact.contactId);
      const filter = `user_id=in.(${contactsIds.join(",")})`;

      statusChannel = supabase
        .channel("statusChanges")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "user_status",
            filter,
          },
          (payload) => console.log(payload.new),
        )
        .subscribe();
    };

    fetchContacts();

    return () => {
      statusChannel?.unsubscribe();
    };
  }, [user]);

  const contactNotificationSocket = usePartySocket({
    host: partykitUrl,
    party: "notifications",
    room: user.id,
    id: user.id,

    onMessage(messageEvent) {
      const message = JSON.parse(messageEvent.data);

      window.alert("TE LLEGO UN MENSAJE:" + message.message);
    },
  });

  const handleOpenChat = (contactId: UUID | string) => {
    const chatInstance: ChatInstance = {userId: user.id, contactId};
    const isChatOpen = chatInstances.some((cInstance) => {
      return cInstance.userId === chatInstance.userId && cInstance.contactId === contactId;
    });

    //if the chat isnt open, it opens one and send a notification of the event to the websocket.
    if (!isChatOpen) {
      setChatInstances([...chatInstances, chatInstance]);
      contactNotificationSocket.send(
        JSON.stringify({
          type: "chatToggle",
          opened: true,
          contactId: contactId,
        }),
      );
    } else {
      //if the chat is open we close the chat. the event notification is sended in the component ondestroy
      setChatInstances(
        chatInstances.filter(
          (cInstance) =>
            cInstance.userId !== chatInstance.userId || cInstance.contactId !== contactId,
        ),
      );
    }
  };

  return (
    <Window>
      <div
        style={{
          background: "linear-gradient(to top, #EFF5FF 0%, #EFF5FF 80%, #ACC4EA 100%)",
        }}
      >
        <UserHeader></UserHeader>
        <Inbox></Inbox>

        <div className="grid grid-cols-[15%_85%]">
          {/* aside separator */}
          <div className="bg-msnGray pb-20 "></div>

          <div className="py-1 border-black border-l border-b  my-1 bg-msnLightGray">
            <AddContactButton userId={user.id}></AddContactButton>
            <div className="ml-1">
              <ContactList contacts={contacts} handleOpenChat={handleOpenChat}></ContactList>
              <Ad></Ad>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}

export default Mensagger;
