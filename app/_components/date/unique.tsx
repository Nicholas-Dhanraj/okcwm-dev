import { useState } from "react";

import { isSameDay } from "date-fns";
import { DayMouseEventHandler, DayPicker } from "react-day-picker";

const Unique = () => {
  const [value, setValue] = useState<Date[]>([]);

  const handleDayClick: DayMouseEventHandler = (day, modifiers) => {
    const newValue = [...value];
    if (modifiers.selected) {
      const index = value.findIndex((d) => isSameDay(day, d));
      newValue.splice(index, 1);
    } else {
      newValue.push(day);
    }
    setValue(newValue);
    console.log(value);
  };

  const handleResetClick = () => setValue([]);

  let footer = <>Please pick one or more days.</>;

  if (value.length > 0)
    footer = (
      <>
        You selected {value.length} days.{" "}
        <button onClick={handleResetClick}>Reset</button>
        <div></div>
      </>
    );
  return (
    <DayPicker
      onDayClick={handleDayClick}
      modifiers={{ selected: value }}
      footer={footer}
    />
  );
};

export default Unique;
