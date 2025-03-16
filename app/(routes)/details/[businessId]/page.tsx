"use client";

import GlobalApi from "@/app/_services/GlobalApi";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import BusinessInfo from "../_components/BusinessInfo";
import BusinessDescription from "../_components/BusinessDescription";
import SuggestedBusinessList from "../_components/SuggestedBusinessList";

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
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
function BusinessDetail({ params }: any) {
  const { data, status } = useSession();
  const [business, setBusiness] = useState([]);
  const [open, setOpen] = React.useState(true);
  const searchParams = useSearchParams();
  const search = searchParams.get("is_success");
  useEffect(() => {
    params && getbusinessById();
  }, [params]);

  useEffect(() => {
    checkUserAuth();
  }, []);

  const getbusinessById = () => {
    GlobalApi.getBusinessById(params.businessId).then((resp: any) => {
      setBusiness(resp.businessList);
    });
  };

  const checkUserAuth = () => {
    if (status == "loading") {
      return <p>Loading...</p>;
    }

    if (status == "unauthenticated") {
      signIn("descope");
    }
  };

  return (
    status == "authenticated" &&
    business && (
      <div
        className="py-8 md:py-20
    px-10 md:px-36  bg-gray-50"
      >
        <BusinessInfo business={business} />

        <div className="grid grid-cols-3 mt-16">
          <div className="col-span-3 md:col-span-2 order-last md:order-first">
            <BusinessDescription business={business} />
          </div>
          <div className="">
            <SuggestedBusinessList business={business} />
          </div>
        </div>
        {search == "true" && (
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              {/* <Button variant="outline">Show Dialog</Button> */}
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {" "}
                  <div className="bg-green-100 text-green-700 p-2 rounded border mb-2 border-green-700 text-center">
                    Payment Successful
                  </div>
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Almost done! You can now proceed to schedule your session.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}

        {search == "false" && (
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              {/* <Button variant="outline">Show Dialog</Button> */}
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {" "}
                  <div className="bg-red-100 text-red-700 p-2 rounded border mb-2 border-red-700 text-center">
                    Payment Successful
                  </div>
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Oh no! Look like something went wrong. Please try payment
                  again to book your next meeting with me.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    )
  );
}

export default BusinessDetail;
