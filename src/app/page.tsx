import {SessionProvider} from "@/lib/hooks/SessionContext";
import {ZIndexProvider} from "@/lib/hooks/ZIndexContext";
import {ChatsInstancesProvider} from "@/lib/hooks/chatsContext";
import {ContactsProvider} from "@/lib/hooks/contactsContext";
import {UserProvider} from "@/lib/hooks/userContext";
import MsnMensaggerApp from "@/modules/msnMensaggerApp";

export default function Home() {
  /* radial-gradient(circle at center, #A0BAFD 0%, #1A3BE4 100%) */

  return (
    <div
      className="min-h-screen w-full "
      style={{
        background: `gray`,
      }}
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
