import Window from "@/components/common/Window";
import Login from "@/components/ui/Login";
import { ZIndexProvider } from "@/lib/ZIndexContext";
import Image from "next/image";
const contacts = [
  { name: "JK", status: "Online" },
  { name: "Samuel Prashker", status: "Busy" },
  { name: "advisor2@live.co.uk", status: "Offline" },
  { name: "Azn Angel", status: "Offline" },
  { name: "Chitra", status: "Offline" },
  { name: "Chris", status: "Offline" },
  { name: "Dane", status: "Offline" },
  { name: "David", status: "Offline" },
  { name: "Dominic", status: "Offline" },
  { name: "Doris", status: "Offline" },
  { name: "Esteban Monge", status: "Offline" },
  { name: "Chris", status: "Offline" },
  { name: "Dane", status: "Offline" },
  { name: "David", status: "Offline" },
  { name: "Dominic", status: "Offline" },
  { name: "Doris", status: "Offline" },
  { name: "Esteban Monge", status: "Offline" },
  { name: "Harrison", status: "Offline" },
  { name: "Harrison Hoffman", status: "Offline" },
];

export default function Home() {
  return (
    <div
      className="min-h-screen w-full "
      style={{
        background: `radial-gradient(circle at center, #A0BAFD 0%, #1A3BE4 100%)`,
      }}
    >
      <ZIndexProvider>
        {/*       <Window></Window>
      <Window></Window>
 */}
        <Login></Login>
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
                  background:
                    "linear-gradient(to top, #DFE8F6 0%,  #ACC4EA 100%)",
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
                      <p>Add a contact</p>
                      {/* imagen */}
                      <div></div>
                    </div>
                    <div className="ml-1">
                      {/*  rectangulo de contactos*/}
                      <div className="overflow-y-scroll max-h-96 bg-white">
                        {contacts.map((contact, index) => (
                          <div
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
                              <span className="text-gray-800">
                                {contact.name}
                              </span>
                              <span className="text-gray-500 ml-1">
                                ({contact.status})
                              </span>
                            </div>
                          </div>
                        ))}
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
      </ZIndexProvider>
    </div>
  );
}
