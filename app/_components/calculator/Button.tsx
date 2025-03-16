import { ButtonProps } from "../../types/index";

export default function Button({
  children,
  disabled,
  className,
  onClick,
}: ButtonProps) {
  return (
    <>
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={`disabled:bg-gray-500 mt-5 disabled:cursor-not-allowed w-full rounded-md p-3 text-white transition hover:bg-opacity-90  ${className}`}
      >
        {children}
      </button>
    </>
  );
}
