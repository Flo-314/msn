import Window from "@/lib/common/Window";
import {getContacts, updateUserStatus} from "@/lib/supabase/models";
import {useEffect} from "react";
import usePartySocket from "partysocket/react";
import UserHeader from "./userHeader/UserHeader";
import AddContactButton from "./contactList/addContactButton";
import ContactList from "./contactList/contactList";
import Ad from "./Ad";
import {ChatInstance, Message, User, UserStatus} from "@/types/types";
import {useChatInstances} from "@/lib/hooks/chatsContext";
import {supabase} from "@/lib/utils/supabase/client";
import {RealtimeChannel} from "@supabase/supabase-js";
import {partykitUrl} from "@/lib/utils/partykit/partykitUtils";
import {useContacts} from "@/lib/hooks/contactsContext";
import Image from "next/image";

function Mensagger({user}: {user: User}) {
  const {contacts, setContacts} = useContacts();
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

      console.log(contacts);

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
          (payload) => {
            const {status, user_id} = payload.new as {status: UserStatus; user_id: string};

            setContacts((prevContacts) => {
              const newContacts = prevContacts.map((contact) => {
                if (contact.contactId === user_id) {
                  contact.status = status;
                }

                return contact;
              });

              return newContacts;
            });
          },
        )
        .subscribe();
    };

    fetchContacts();

    return () => {
      statusChannel?.unsubscribe();
    };
  }, [user, setContacts]);

  const contactNotificationSocket = usePartySocket({
    host: partykitUrl,
    party: "notifications",
    room: user.id,
    id: user.id,

    onMessage(messageEvent) {
      const message: Message = JSON.parse(messageEvent.data);
      const notificationSound = new Audio("/incomingMessage.mp3");

      if (message.type === message.type) {
        notificationSound.play();
      }
    },
  });

  const handleOpenChat = (contactId: string) => {
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

      contactNotificationSocket.send(
        JSON.stringify({
          type: "chatToggle",
          opened: false,
          contactId: contactId,
        }),
      );
    }
  };

  // set initial state and cange the status in db
  useEffect(() => {
    const savedStatus = localStorage.getItem("status") as UserStatus;

    if (savedStatus) {
      updateUserStatus(user.id, savedStatus);
    }
  }, [user.id]);

  return (
    <Window windowHeaderName="MSN Messenger">
      <div className="bg-gray-light min-w-64 w-[500px] ">
        <UserHeader></UserHeader>

        <div className="grid grid-cols-[7%_93%]   ">
          {/* aside separator */}
          <div className="bg-[#ecf0f5]">
            <Image
              src="/png/mensaggerWindow/contactAsideShape.png"
              width={35}
              height={61}
              alt=""
              className=""
            ></Image>
          </div>

          <div className=" border-black  bg-msnLightGray">
            <AddContactButton userId={user.id}></AddContactButton>
            <div className="">
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
