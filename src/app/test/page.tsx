import Login from "@/modules/login/Login";
import { ZIndexProvider } from "@/lib/hooks/ZIndexContext";
import Chat from "@/modules/chat/chat";
import Mensagger from "@/modules/mensagger/mensagger";

export default function Home() {
  return (
    <div
      className="min-h-screen w-full "
      style={{
        background: `radial-gradient(circle at center, #A0BAFD 0%, #1A3BE4 100%)`,
      }}
    >
      <ZIndexProvider>
        {/*     <Login></Login>
        <Mensagger></Mensagger> */}

        <Chat></Chat>
      </ZIndexProvider>
    </div>
  );
}
