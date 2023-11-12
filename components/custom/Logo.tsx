import Image from "next/image";

const Logo = () => {
  return (
    <>
      <Image
        src="/images/logo.png"
        alt="logo"
        height={50}
        width={50}
        priority
        className="mx-auto w-auto"
      />
    </>
  );
};

export default Logo;
