import Window from "@/lib/common/Window";
import UserHeader from "./userHeader/UserHeader";
import AddContactButton from "./contactList/addContactButton";
import ContactList from "./contactList/contactList";
import Ad from "./Ad";
import {ChatInstance, User} from "@/types/types";
import {useChatInstances} from "@/lib/hooks/chatsContext";
import {useContacts} from "@/lib/hooks/contactsContext";
import Image from "next/image";
import {useChatNotification, useUserStatusSubscription} from "@/lib/hooks/notifications";

function Mensagger({user}: {user: User}) {
  const {contacts} = useContacts();
  const {setChatInstances, chatInstances} = useChatInstances();
  const {toggleChat} = useChatNotification(user);

  useUserStatusSubscription(user);
  const handleOpenChat = (contactId: string) => {
    const chatInstance: ChatInstance = {userId: user.id, contactId};
    const isChatOpen = chatInstances.some((cInstance) => {
      return cInstance.userId === chatInstance.userId && cInstance.contactId === contactId;
    });

    //if the chat isnt open, it opens one and send a notification of the event to the websocket.
    if (!isChatOpen) {
      setChatInstances([...chatInstances, chatInstance]);
      toggleChat(contactId, isChatOpen);
    } else {
      //if the chat is open we close the chat. the event notification is sended in the component ondestroy
      setChatInstances(
        chatInstances.filter(
          (cInstance) =>
            cInstance.userId !== chatInstance.userId || cInstance.contactId !== contactId,
        ),
      );

      toggleChat(contactId, isChatOpen);
    }
  };

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
