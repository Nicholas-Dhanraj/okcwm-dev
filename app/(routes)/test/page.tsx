"use client";

import {
  DateRangePicker,
  DateRangePickerProps,
} from "@/app/_components/date/date-range-picker";
import Unique from "@/app/_components/date/unique";
import GlobalApi from "@/app/_services/GlobalApi";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";
// import { Unique } from "@/app/_components/date/unique";
const Page = () => {
  const [val, setVal] = useState<any>();
  const date = new Date();

  const saveTimeOff = () => {
    GlobalApi.createTimeOff(
      val.from?.toISOString(),
      val.to?.toISOString() ? val.to?.toISOString() : val.from?.toISOString()
    ).then(
      (resp) => {
        console.log(resp);
        if (resp) {
          toast("Service Booked successfully!");
          // Toast Msg
        }
      },
      (e) => {
        toast("Error while creating booking");
        //Error Toast Msg
      }
    );
  };

  useEffect(() => {
    val && console.log(val.from.toISOString());
    val && console.log(val.to?.toISOString());
    val && saveTimeOff();
  }, [val]);
  return (
    <div>
      <DateRangePicker
        initialDateFrom={new Date(date.getFullYear(), date.getMonth(), 1)}
        onUpdate={(values) => setVal(values.range)}
      />
      {/* <Unique /> */}
      {/* <div>{val}</div> */}
      {/*  */}
    </div>
  );
};

export default Page;
//https://react-day-picker.js.org/advanced-guides/custom-components
//https://date-range-picker-for-shadcn-demo.vercel.app/
