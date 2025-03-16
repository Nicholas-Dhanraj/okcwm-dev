import React, { useEffect, useState } from "react";
import { checkout } from "./checkout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
export interface DateRange1 {
  from: Date;
  to: Date | undefined;
}
const bookedDays = [
  // new Date(2024, 0, 1),
  // new Date(2024, 5, 9),
  // new Date(2024, 12, 10),

  { from: new Date(2024, 1, 5), to: new Date(2024, 1, 5) },
  // { from: new Date(2024, 1, 15), to: new Date(2024, 1, 20) },
];
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import GlobalApi from "@/app/_services/GlobalApi";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import moment from "moment";
import { DayMouseEventHandler } from "react-day-picker";

function BookingSection({ children, business }: any) {
  // const data1 = [{ from: new Date(2024, 0, 5), to: new Date(2024, 0, 9) }];
  const [timeOffList, settimeOffList] = useState([]);

  const [date, setDate] = useState(new Date() as any);
  const [timeSlot, setTimeSlot] = useState([] as any);
  const [selectedTime, setSelectedTime] = useState();
  const [bookedSlot, setBookedSlot] = useState([] as any);
  const { data } = useSession();
  const [open, setOpen] = React.useState(true);

  const getDateAdjustedForTimezone = (dateInput: Date | string): Date => {
    if (typeof dateInput === "string") {
      // Split the date string to get year, month, and day parts
      const parts = dateInput.split("-").map((part) => parseInt(part, 10));
      // Create a new Date object using the local timezone
      // Note: Month is 0-indexed, so subtract 1 from the month part
      const date = new Date(parts[0], parts[1] - 1, parts[2]);
      return date;
    } else {
      // If dateInput is already a Date object, return it directly
      return dateInput;
    }
  };

  useEffect(() => {
    getTimeOffList();
    // console.log("resp.timeOffs");
    // console.log(timeOffList);
    // timeOffList.map((data: { from: Date; to: Date }) => bookedDays.push(data));
  }, []);
  const getTimeOffList = () => {
    GlobalApi.getTimeOffs().then((resp: any) => {
      let list = resp.timeOffs.map((data: DateRange1) => ({
        from: getDateAdjustedForTimezone(data.from),
        to: getDateAdjustedForTimezone(data.to!),
      }));

      // https://stackoverflow.com/questions/72644873/response-map-is-not-a-function-type-error

      // console.log(resp.timeOffs);
      // bookedDays.push(list);

      // settimeOffList(resp);
      list.map((data: { from: Date; to: Date }) => bookedDays.push(data));

      console.log(bookedDays);
    });
  };
  useEffect(() => {
    {
      // data1.map((data) => bookedDays.push(data));
    }
  }, []);

  const handleDayClick: DayMouseEventHandler = (day, { booked }) => {
    // alert(
    //   `Sorry, you selected ${day.toLocaleDateString()}, I am off this day.`
    // );
  };
  useEffect(() => {
    getTime();
  }, []);

  useEffect(() => {
    date && BusinessBookedSlot();
  }, [date]);

  /**
   * Get Selected Date Business Booked Slot
   */
  const BusinessBookedSlot = () => {
    GlobalApi.BusinessBookedSlot(
      business.id,
      moment(date).format("DD-MMM-yyyy")
    ).then((resp: any) => {
      console.log(resp);
      setBookedSlot(resp.bookings);
    });
  };

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      // timeList.push({
      //   time: i + ":30 AM",
      // });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      // timeList.push({
      //   time: i + ":30 PM",
      // });
    }

    setTimeSlot(timeList);
  };

  const saveBooking = () => {
    // checkout(
    //   {
    //     lineItems: [
    //       {
    //         price: "price_1PNMGyP1cuejz2kzttZrj10a",
    //         quantity: 1,
    //       },
    //     ],
    //   },
    //   business.id
    // );

    GlobalApi.createNewBooking(
      business.id,
      moment(date).format("DD-MMM-yyyy"),
      selectedTime!,
      data!.user!.email!,
      data!.user!.name!
    ).then(
      (resp) => {
        console.log(resp);
        if (resp) {
          // setDate();
          // setSelectedTime("");
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

  const isSlotBooked = (time: any) => {
    return bookedSlot.find((item: { time: any }) => item.time == time);
  };
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Book an Service</SheetTitle>
            <SheetDescription>
              Select Date and Time slot to book an service
              {/* Date Picker  */}
              <div className="flex flex-col gap-5 items-baseline">
                <h2 className="mt-5 font-bold">Select Date</h2>

                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={bookedDays}
                  // hidden={(date) => date < new Date()}
                  modifiers={{ booked: bookedDays }}
                  modifiersClassNames={{ booked: "booked" }}
                  onDayClick={handleDayClick}
                  className="rounded-md border"
                />
              </div>
              {/* Time Slot Picker  */}
              <div>
                <h2 className="font-bold">Select Time Slot</h2>
              </div>
              <div className="mt-3 flex flex gap-8">
                <div className="flex">
                  <div className="w-5 h-5 bg-red-400 rounded-full"></div>
                  <div className="ml-1 items-center">Slot Taken</div>
                </div>
                <div className="flex">
                  <div className="mb-5 w-5 h-5 bg-green-400 rounded-full"></div>
                  <div className="ml-1 items-center">Available</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {timeSlot.map((item: any, index: any) => (
                  <Button
                    key={index}
                    disabled={isSlotBooked(item.time)}
                    variant="outline"
                    className={`border rounded-full 
                p-2 px-3 hover:bg-primary
                 hover:text-white border-green-500
                 ${selectedTime == item.time && "bg-primary text-white"}
                 ${isSlotBooked(item.time) && " border-rose-500"}`}
                    onClick={() => setSelectedTime(item.time)}
                  >
                    {item.time}
                  </Button>
                ))}
              </div>
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className="mt-5">
            <SheetClose asChild>
              <div className="flex gap-5">
                <Button variant="destructive" className="">
                  Cancel
                </Button>

                <Button
                  disabled={!(selectedTime && date)}
                  // onClick={() => {
                  //   checkout(
                  //     {
                  //       lineItems: [
                  //         {
                  //           price: "price_1PNMGyP1cuejz2kzttZrj10a",
                  //           quantity: 1,
                  //         },
                  //       ],
                  //     },
                  //     business.id
                  //   );
                  // }}

                  onClick={() => saveBooking()}
                >
                  Book & pay
                </Button>
              </div>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default BookingSection;
