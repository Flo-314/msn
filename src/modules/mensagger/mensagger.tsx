import Window from "@/lib/common/Window";
import { addContact, getContacts } from "@/lib/supabase/models";
import Image from "next/image";
import { useEffect, useState } from "react";
import Chat from "../chat/chat";
import usePartySocket from "partysocket/react";

function Mensagger({ user }) {
  const [contacts, setContacts] = useState([]);
  const [TESTEMAIL, SETTESTEMAIL] = useState("");
  const [isOpenChat, setIsOpenChat] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      getContacts(user.id).then((contacts) => {
        setContacts(contacts);

        console.log(contacts)
      });
    }
  }, [user]);

  const contactNotificationSocket = usePartySocket({
    host: "localhost:1999", // or localhost:1999 in dev
    party: "notifications",
    room: user.id,
    id: user.id,

    onMessage(messageEvent) {
      const message = JSON.parse(messageEvent.data);
      console.log(message);

      window.alert("TE LLEGO UN MENSAJE:" + message.message);
    },
  });

  return (
    <Window>
      <div
        style={{
          background:
            "linear-gradient(to top, #EFF5FF 0%, #EFF5FF 80%, #ACC4EA 100%)",
        }}
      >
        {/* header */}
        <div>
          {/* profile header  */}
          <div className="flex gap-4">
            <div className="w-16 h-16 relative  border border-dark rounded-lg">
              <Image
                alt="profile image"
                src="/dog.webp"
                fill
                className="rounded-lg"
              ></Image>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex">
                <p className="font-bold">flo_el_mas_kpo_jeje</p>

                <select
                  id="status"
                  className=" bg-transparent text-msnGray text-xs"
                >
                  <option value="online">Online</option>
                  <option value="busy">Busy</option>
                  <option value="away">Away</option>
                  <option value="offline">Appear Offline</option>
                </select>
              </div>

              <input
                type="text"
                placeholder="<Type a personal message>"
                className="text-msngray text-xs bg-transparent "
              />
            </div>
          </div>
          {/* inbox header */}

          <div
            className="p-2 rounded-t-xl"
            style={{
              background: "linear-gradient(to top, #DFE8F6 0%,  #ACC4EA 100%)",
            }}
          >
            <Image
              src={"/cardIcon.PNG"}
              width={22}
              height={16}
              className="ml-[19%]"
              alt="lettericon"
            ></Image>
          </div>
        </div>

        {/* main panel */}
        <div className="grid grid-cols-[15%_85%]">
          {/* barra separadora aesthetic */}
          <div className="bg-msnGray pb-20 "></div>
          <div className="py-1 border-black border-l border-b  my-1 bg-msnLightGray">
            <div>
              <div>
                {/* primer rectangulo de contactos */}
                <div
                  className="text-sm text-darkLabel pt-5 border-b border-msnLightGray"
                  style={{
                    background:
                      "linear-gradient(to top, #EFF5FF 0%, #EFF5FF 15%, #ACC4EA 100%)",
                  }}
                >
                  <p
                    onClick={() => {
                      addContact(user.id, TESTEMAIL);
                    }}
                  >
                    Add a contact
                  </p>
                  <input
                    type="text"
                    value={TESTEMAIL}
                    onChange={(e) => SETTESTEMAIL(e.target.value)}
                  />
                  {/* imagen */}
                  <div></div>
                </div>
                <div className="ml-1">
                  {/*  rectangulo de contactos*/}
                  <div className="overflow-y-scroll max-h-96 bg-white">
                    {contacts.map((contact, index) => (
                      <div key={index + 1}>
                        <p>user id {contact.contactId}</p>
                      </div>

                      /*    <div
                        key={index}
                        className="flex items-center gap-2 p-1  rounded"
                      >
                        <Image
                          src="/contactIcon.PNG"
                          alt="Contact"
                          width={16}
                          height={16}
                        />
                        <div className="text-sm">
                          <span className="text-gray-800">{contact.email}</span>
                          <span className="text-gray-500 ml-1">
                            {contact.username}
                          </span>
                        </div>
                      </div> */
                    ))}

                    {isOpenChat && (
                      <Chat
                        userId={user.id}
                        contactId={contacts[0].contactId}
                      ></Chat>
                    )}
                    <button
                      onClick={() => {
                        contactNotificationSocket.send(
                          JSON.stringify({
                            type: "chatToggle",
                            opened: !isOpenChat,
                            contactId: contacts[0].contactId,
                          }),
                        );
                        setIsOpenChat(!isOpenChat);
                      }}
                    >
                      open{" "}
                    </button>
                  </div>

                  {/* cuadrado de propaganda */}
                  <div className="m-1.5">
                    <div className="  border border-black     relative w-full h-20">
                      <Image
                        className="py-2"
                        src="/msnPropaganda.PNG"
                        fill
                        alt="msn propaganda"
                      ></Image>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}

export default Mensagger;
