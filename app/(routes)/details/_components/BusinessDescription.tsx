import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { NotebookPen } from "lucide-react";
import ContactMonthly from "@/app/_components/contactMonthly";

import BookingSection from "./BookingSection";
import { checkout } from "./checkout";
import { useSearchParams } from "next/navigation";
function BusinessDescription({ business }: any) {
  const searchParams = useSearchParams();
  const search = searchParams.get("is_success");

  useEffect(() => {
    searchParams && console.log(searchParams.get("is_success"));
    searchParams && console.log(searchParams.get("is_success1"));
  }, [searchParams]);
  return (
    business?.name && (
      <div>
        <h2 className="font-bold text-[25px] ">Description</h2>
        <p className="mt-4 text-lg text-gray-600">{business.about}</p>

        {/* <h2 className="font-bold text-[25px] mt-8">Gallary</h2> */}
        <div
          className="grid grid-cols-2 md:grid-cols-2
      lg:grid-cols-2 gap-5 mt-5"
        >
          {/* <Button
            disabled={!(selectedTime && date)}

            // onClick={() => saveBooking()}
          >
            Book & pay
          </Button> */}
          {business.category?.name !== "Monthly" ? (
            <Button
              disabled={search == "true"}
              onClick={() => {
                checkout(
                  {
                    lineItems: [
                      {
                        price: "price_1R21hSP1cuejz2kzxNtRSehQ",
                        quantity: 1,
                      },
                    ],
                  },
                  business.id
                );
              }}
              className="flex gap-2 w-full"
            >
              <NotebookPen />
              Proceed to payment
            </Button>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex gap-2 w-full">
                  <NotebookPen />
                  Create personalized monthly plan
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[1000px] overflow-y-scroll max-h-screen">
                <DialogHeader></DialogHeader>
                <ContactMonthly subject={business.name} />
                {/* <Calculator /> */}
                {/* <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter> */}
              </DialogContent>
            </Dialog>
          )}
          {search == "true" && (
            <div className="bg-green-100 text-green-700 p-2 rounded border mb-2 border-green-700 text-center">
              Payment Successful
            </div>
          )}

          {search == "false" && (
            <div className="bg-red-100 text-red-700 p-2 rounded border mb-2 border-red-700 text-center">
              Payment was not successful
            </div>
          )}
          {business.category?.name !== "Monthly" ? (
            <BookingSection business={business}>
              <Button
                disabled={!(search == "true")}
                className="flex gap-2 w-full"
              >
                <NotebookPen />
                Book Appointment
              </Button>
            </BookingSection>
          ) : (
            <div></div>
            //   <Dialog>
            //     <DialogTrigger asChild>
            //       <Button className="flex gap-2 w-full">
            //         <NotebookPen />
            //         Create personalized monthly plans
            //       </Button>
            //     </DialogTrigger>
            //     <DialogContent className="sm:max-w-[1000px] overflow-y-scroll max-h-screen">
            //       <DialogHeader></DialogHeader>
            //       <ContactMonthly subject={business.name} />
            //       {/* <Calculator /> */}
            //       {/* <DialogFooter>
            //   <Button type="submit">Save changes</Button>
            // </DialogFooter> */}
            //     </DialogContent>
            //   </Dialog>
          )}
          {business?.images?.map(
            (
              item: { url: string | StaticImport },
              index: React.Key | null | undefined
            ) => (
              <Image
                src={item?.url}
                key={index}
                alt="image"
                width={700}
                height={200}
                className="rounded-lg"
              />
            )
          )}
        </div>
      </div>
    )
  );
}

export default BusinessDescription;
