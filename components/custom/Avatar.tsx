import { IAvatarProps } from "@/types";
import Image from "next/image";

const Avatar = ({ src, name = "Avatar", onClick }: IAvatarProps) => {
  return (
    <div onClick={onClick}>
      <Image
        src={`${src}`}
        alt={name}
        width={100}
        height={100}
        className="w-12 h-12 rounded-full"
      />
    </div>
  );
};

export default Avatar;
