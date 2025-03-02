import Image from "next/image";

function Ad() {
  return (
    <div className="   flex justify-center items-center  w-full h-20 border-t border-msnDarkGray">
      <div className="max-w-60 max-h-16 relative w-full h-full">
        <Image
          className="border border-msnDarkGray"
          src="/msnPropaganda.PNG"
          fill
          alt="msn propaganda"
        ></Image>
      </div>
    </div>
  );
}

export default Ad;
