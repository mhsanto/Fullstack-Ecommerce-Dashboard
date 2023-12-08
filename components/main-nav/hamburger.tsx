type HamburgerProps = {
  handleClick: () => void;
  isOpen: boolean;
};
const Hamburger: React.FC<HamburgerProps> = ({
  handleClick,
  isOpen = false,
}) => {
  return (
    <button
      onClick={handleClick}
      className="flex flex-col justify-center items-center md:hidden absolute right-4 top-[1.8rem] z-50 "
    >
      <span
        className={`dark:bg-white bg-black  block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm ${
                      isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
                    }`}
      ></span>
      <span
        className={`dark:bg-white bg-black block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm my-0.5 ${
                      isOpen ? "opacity-0" : "opacity-100"
                    }`}
      ></span>
      <span
        className={`dark:bg-white bg-black block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm ${
                      isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
                    }`}
      ></span>
    </button>
  );
};

export default Hamburger;
