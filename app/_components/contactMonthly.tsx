/**
 * v0 by Vercel.
 * @see https://v0.dev/t/wwLZN1kvFaE
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
// import { useState } from "react";
import { sub } from "date-fns";
import Calculator from "./calculator/Calculator";
import Textfield from "../_components/calculator/Textfield";
import ButtonCal from "../_components/calculator/Button";
import { toNumber } from "../utils/index";
import { ChangeEvent, FocusEvent, useRef, useState } from "react";
import { InitialFormState } from "../types/index";
interface ModalProps {
  subject: any;
}
import { FC } from "react";
import { useForm } from "react-hook-form";
import { sendEmail } from "../utils/email";
import { revalidatePath } from "next/cache";

export type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};
const ContactMonthly: React.FC<ModalProps> = ({ subject }) => {
  const [stateOfInput, setStateOfInput] = useState(subject);
  const [value, setValue] = useState("0.00");
  const [form, setForm] = useState(InitialFormState);
  const { weight, height, age, activityFactor, output } = form;
  const [gender, setGender] = useState("male");
  const [disabled, setDisabled] = useState(true);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDisabled(true);

    setForm({
      ...form,
      [name]: value,
    });
  };

  //on focus lost, toNumber will format to value of textfirld. to validate the numbers
  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDisabled(true);

    setForm({
      ...form,
      [name]: toNumber(value),
    });
  };
  const genderChange = (e: any) => {
    setGender(e.target.value);
    setDisabled(true);
  };
  const onCalculate = () => {
    if (!weight || !height || !age || !activityFactor) return;
    console.log(gender);
    setForm({
      ...form,

      output:
        gender === "male"
          ? (10 * weight + 6.25 * height - 5 * age + 5) * activityFactor
          : (10 * weight + 6.25 * height - 5 * age - 16) * activityFactor,
    });
    setDisabled(false);
    console.log("OUTPUT1" + output);
  };
  const ref = useRef<HTMLFormElement>(null);
  const onReset = () => {
    setForm(InitialFormState);
    setDisabled(true);
  };
  const { register, handleSubmit } = useForm<FormData>();

  function onSubmit(data: FormData) {
    if (!weight || !height || !age || !activityFactor) return;
    console.log(gender);
    setForm({
      ...form,

      output:
        gender === "male"
          ? (10 * weight + 6.25 * height - 5 * age + 5) * activityFactor
          : (10 * weight + 6.25 * height - 5 * age - 16) * activityFactor,
    });
    console.log("OUTPUT2" + output);
    data.subject += " TDEE: " + output;
    data.message = "Phone: " + data.phone + "\n\n" + "Message: " + data.message;
    // revalidatePath("/details/cltfa3i6b64uk08u097trdku3");
    sendEmail(data);
    ref.current?.reset();
    setForm(InitialFormState);
    setDisabled(true);
  }
  return (
    <div className="container mx-auto flex flex-wrap lg:justify-between">
      {/* Left side */}

      {/* {Right section - calculator} */}
      <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
        <div>
          <h1 className="text-gray-6000 mt-5 mb-1 text-base leading-relaxed">
            Your total Daily Energy Expenditure (TDEE) is an estimation of how
            many calories you burn per day taking exercise into account. Please
            fill out the form below and the field `&quot;`subject`&quot;` on the
            right will automatically fill in.
          </h1>
          <div className="grid grid-cols-2 gap-x-2 rounded-md p-8 sm:p-6 shadow-lg">
            {/* <ul className="grid grid-cols-3 gap-x-5 m-10 max-w-md mx-auto"></ul> */}
            <div className="relative">
              <input
                onChange={(e) => {
                  setGender(e.target.value);
                  e.target.checked;
                }}
                className="sr-only peer"
                type="radio"
                value="male"
                name="answer"
                id="male"
                defaultChecked
              />
              <label
                className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-blue-500 peer-checked:ring-2 peer-checked:border-transparent"
                htmlFor="male"
              >
                Male
              </label>

              <div className="absolute hidden w-5 h-5 peer-checked:block top-5 right-3">
                🕺
              </div>
            </div>

            <div className="relative">
              <input
                onChange={genderChange}
                className="sr-only peer"
                type="radio"
                value="female"
                name="answer"
                id="female"
              />
              <label
                className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-pink-500 peer-checked:ring-2 peer-checked:border-transparent"
                htmlFor="female"
              >
                Female
              </label>

              <div className="absolute hidden w-5 h-5 peer-checked:block top-5 right-3">
                💃
              </div>
            </div>
            {/* <div className="mb-6"></div> */}
            <Textfield
              name="weight"
              placeholder="0"
              value={weight}
              onChange={onChange}
              onBlur={onBlur}
              label="Weight (kg)"
              // legend="Legend description Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
            ></Textfield>

            {/* <div className="mb-6"></div> */}
            <Textfield
              name="height"
              placeholder="0"
              value={height}
              onChange={onChange}
              onBlur={onBlur}
              label="height (cm)"
              // legend="Legend description Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
            ></Textfield>

            {/* <div className="mb-6"></div> */}
            <Textfield
              name="age"
              placeholder="0"
              value={age}
              onChange={onChange}
              onBlur={onBlur}
              label="Age (years)"
              // legend="Legend description Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
            ></Textfield>

            <Textfield
              name="activityFactor"
              placeholder="0"
              value={activityFactor}
              onChange={onChange}
              onBlur={onBlur}
              label="Activity Factor"
              // legend="Legend description Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
            ></Textfield>

            <ul className="list-disc ml-4 mb-1 text-xs">
              <li>Sedentary:&nbsp; 1.2</li>
              <li>Lightly active:&nbsp; 1.375</li>
              <li>Moderately active:&nbsp; 1.55</li>
              <li>Very active:&nbsp; 1.725</li>
              <li>Super active:&nbsp; 1.9</li>
            </ul>
            <div className="mb-6"></div>

            {/* <div className="space-y-2"> */}
            <ButtonCal className="bg-green-600" onClick={onCalculate}>
              Calculate
            </ButtonCal>

            <ButtonCal className="bg-slate-800" onClick={onReset}>
              Reset
            </ButtonCal>

            {/* </div> */}
          </div>
          {output && (
            <div className="mt-1 p-4 rounded-md md:p-8 bg-gray-800">
              <h2 className="mb-1 text-3xl font-bold text-white">
                Output: <span className="text-yellow-500">{output}</span>
              </h2>
              {/* <p className="text-gray-400">Legend description of output</p> */}
            </div>
          )}
        </div>
      </div>

      <div className="w-full px-4 lg:w-1/2 xl:w-6/12">
        <form
          // className="mt-5 grayscale"
          ref={ref}
          className={`mt-5 ${disabled == true && "grayscale"}`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-5">
            <label
              htmlFor="name"
              className="mb-3 block text-base font-medium text-black"
            >
              Full Name
            </label>
            <input
              disabled={disabled}
              type="text"
              placeholder="Full Name"
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
              {...register("name", { required: true })}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-3 block text-base font-medium text-black"
            >
              Email Address
            </label>
            <input
              disabled={disabled}
              type="email"
              placeholder="example@domain.com"
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
              {...register("email", { required: true })}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="mb-3 block text-base font-medium text-black"
            >
              Phone
            </label>
            <input
              disabled={disabled}
              type="tel"
              placeholder="123-123-1234"
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
              {...register("phone", { required: true })}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="subject"
              className="mb-3 block text-base font-medium text-black"
            >
              {subject !== ""
                ? "Subject (please include monthly plan title)"
                : "Subject"}
            </label>
            <input
              disabled={disabled}
              type="text"
              placeholder="subject"
              value={
                output === null
                  ? stateOfInput.toLowerCase()
                  : stateOfInput.toLowerCase()
              }
              // onChange={(e) => setStateOfInput(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
              {...register("subject", { required: true })}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="message"
              className="mb-3 block text-base font-medium text-black"
            >
              Message
            </label>
            <textarea
              disabled={disabled}
              rows={4}
              placeholder="Type your message"
              className="w-full resize-none rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
              {...register("message", { required: true })}
            ></textarea>
          </div>
          <div>
            <button
              disabled={disabled}
              className="hover:shadow-form rounded-md bg-primary py-3 px-8 text-base font-semibold text-white outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactMonthly;
