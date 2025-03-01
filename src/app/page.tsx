import {SessionProvider} from "@/lib/hooks/SessionContext";
import {ZIndexProvider} from "@/lib/hooks/ZIndexContext";
import {ChatsInstancesProvider} from "@/lib/hooks/chatsContext";
import {ContactsProvider} from "@/lib/hooks/contactsContext";
import {UserProvider} from "@/lib/hooks/userContext";
import MsnMensaggerApp from "@/modules/msnMensaggerApp";
import "./crtEffect.css";

export default function Home() {
  return (
    <div
      className="min-h-screen w-full crt "
      style={{backgroundImage: "url(https://i.imgur.com/Zk6TR5k.jpeg)"}}
    >
      <ZIndexProvider>
        <UserProvider>
          <SessionProvider>
            <ContactsProvider>
              <ChatsInstancesProvider>
                <MsnMensaggerApp></MsnMensaggerApp>
              </ChatsInstancesProvider>
            </ContactsProvider>
          </SessionProvider>
        </UserProvider>
      </ZIndexProvider>
    </div>
  );
}
