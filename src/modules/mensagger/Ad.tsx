import Image from "next/image";

function Ad() {
  return (
    <div className="   flex justify-center items-center  w-full h-20 border-t border-msnDarkGray">
      <div className="max-w-72 max-h-16 relative w-full h-full">
        <Image
          className="border border-msnDarkGray"
          src="/png/mensaggerWindow/msnPropaganda.jpg"
          fill
          alt="msn propaganda"
          priority={true}
          sizes="237px"
        ></Image>
      </div>
    </div>
  );
}

export default Ad;
