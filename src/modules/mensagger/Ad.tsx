import Image from "next/image";

function Ad() {
  return (
    <div className="m-1.5">
      <div className="  border border-black     relative w-full h-20">
        <Image className="py-2" src="/msnPropaganda.PNG" fill alt="msn propaganda"></Image>
      </div>
    </div>
  );
}

export default Ad;
