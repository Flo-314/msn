import { ZIndexProvider } from "@/lib/hooks/ZIndexContext";
import { UserProvider } from "@/lib/hooks/userContext";
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
      <UserProvider>
        <ZIndexProvider>
          <MsnMensaggerApp></MsnMensaggerApp>
        </ZIndexProvider>
      </UserProvider>
    </div>
  );
}
