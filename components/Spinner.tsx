import Image from "next/image";

const Spinner = ({ btn }: { btn?: boolean }) => {
  return (
    <>
      {btn ? (
        <div className="flex items-center justify-center h-[30px] overflow-y-hidden">
          <Image
            src={"/imgs/loader.svg"}
            alt="spinner"
            width={50}
            height={30}
            priority
          />
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <Image
            src={"/imgs/loader.svg"}
            alt="spinner"
            width={50}
            height={30}
            priority
          />
        </div>
      )}
    </>
  );
};

export default Spinner;
