import Window from "@/components/common/Window";
import Login from "@/components/ui/Login";
import { ZIndexProvider } from "@/lib/ZIndexContext";

export default function Home() {
  return (
    <div 
    className="min-h-screen w-full "
    style={{
      background: `radial-gradient(circle at center, #A0BAFD 0%, #1A3BE4 100%)`,
 
    }}
  > 
        <ZIndexProvider>
      <Window></Window>
      <Window></Window>
<Login></Login>
      </ZIndexProvider>


      
    </div>
  );
}
