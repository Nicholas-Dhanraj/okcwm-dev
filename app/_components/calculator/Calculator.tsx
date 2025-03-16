"use client";
import Textfield from "./Textfield";
import Button from "./Button";
import { toNumber } from "../../utils/index";
import { ChangeEvent, FocusEvent, useState } from "react";
import { InitialFormState } from "../../types/index";
export default function Calculator() {
  const [form, setForm] = useState(InitialFormState);
  const { weight, height, age, activityFactor, output } = form;
  const [gender, setGender] = useState("male");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  //on focus lost, toNumber will format to value of textfirld. to validate the numbers
  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: toNumber(value),
    });
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
  };

  const onReset = () => {
    setForm(InitialFormState);
  };

  return (
    <div>
      <h1 className="text-gray-6000 mt-10 mb-1 text-base leading-relaxed">
        Your total Daily Energy Expenditure (TDEE) is an estimation of how many
        calories you burn per day taking exercise into account. Please fill out
        the form below and the field `&quot;`TDEE`&quot;` will automatically
        fill in.
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
            onChange={(e) => setGender(e.target.value)}
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
        <Button className="bg-green-600" onClick={onCalculate}>
          Calculate
        </Button>

        <Button className="bg-slate-800" onClick={onReset}>
          Reset
        </Button>

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
  );
}
