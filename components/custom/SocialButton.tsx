import { IconType } from "react-icons";

interface SocialButtonProps {
  icon: IconType;
  size?: number;
  onClick?: () => void;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  icon: Icon,
  size = 25,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex
        w-full 
        justify-center 
        rounded-md 
        bg-white 
        px-4 
        py-2 
        text-gray-500 
        shadow-sm 
        ring-1 
        ring-inset 
        ring-gray-300 
        hover:bg-gray-50 
        transition
        duration-500
        ease-in-out
        focus:outline-offset-0
      "
    >
      <Icon size={size} />
    </button>
  );
};

export default SocialButton;
