import { TextfieldProps } from "../../types/index";

export default function Textfield({
  label,
  type,
  name,
  value,
  legend,
  placeholder,
  onChange,
  onBlur,
}: TextfieldProps) {
  return (
    <>
      <label className="font-medium flex items-center">{label}</label>
      <input
        type={type || "text"}
        name={name}
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
        onBlur={onBlur}
        className="text-body-color focus:border-primary w-full rounded-md border py-3 mt-2 px-[14px] text-base outline-none focus-visible:shadow-none"
      />
      {/* <p className="mt-2 text-xs text-gray-400">{legend}</p> */}
    </>
  );
}
