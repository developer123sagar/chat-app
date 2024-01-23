import Image from "next/image";

const EmptyState = () => {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 h-full w-full flex justify-center items-center bg-gray-800">
      <div className="text-center flex flex-col items-center">
        <Image
          src={"/jiffy.png"}
          alt="Jiffychat"
          width={200}
          height={100}
          priority
        />
        <h1 className="mt-6 text-xl font-semibold text-white">
          Select any chat to start a conversation
        </h1>
      </div>
    </div>
  );
};

export default EmptyState;
