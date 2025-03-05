import {SessionProvider} from "@/lib/hooks/SessionContext";
import {ZIndexProvider} from "@/lib/hooks/ZIndexContext";
import {ChatsInstancesProvider} from "@/lib/hooks/chatsContext";
import {ContactsProvider} from "@/lib/hooks/contactsContext";
import {UserProvider} from "@/lib/hooks/userContext";
import MsnMensaggerApp from "@/modules/msnMensaggerApp";
import "./crtEffect.css";
import Image from "next/image";

export default function Home() {
  return (
    <div className="crt h-full w-full  overflow-hidden   ">
      <Image alt="windows xp wallpaper" priority={true} src="/png/xpWallpaper.jpeg" fill></Image>
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
