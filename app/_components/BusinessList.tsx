"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
interface ModalProps {
  businessList: any;
  title: string;
}
import { X } from "lucide-react";

const BusinessList: React.FC<ModalProps> = ({ businessList, title }) => {
  return (
    <div className="m-5">
      <h2 className="font-bold text-[22px]">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
        {businessList.length > 0 && title !== "All"
          ? businessList.map((business: any, index: number) => (
              <Link
                href={"/details/" + business.id}
                key={index}
                className=" shadow-md rounded-lg hover:shadow-md hover:shadow-primary hover:scale-105 transition-all ease-in-out cursor-pointer"
              >
                <Image
                  src={business?.images[0].url}
                  alt={business.name}
                  width={500}
                  height={200}
                  className="h-[150px] md:h-[200px] object-cover rounded-xl"
                />
                <div className="flex flex-col items-baseline p-3 gap-1">
                  <h2
                    style={{
                      backgroundColor: `rgba(${business.category.bgColor.rgba.r},${business.category.bgColor.rgba.g},${business.category.bgColor.rgba.b},${business.category.bgColor.rgba.a})`,
                    }}
                    className="p-1 bg-purple-200 text-primary rounded-full px-2 text-[12px]"
                  >
                    {business.category.name}
                  </h2>
                  <h2 className="font-bold text-lg">{business.name}</h2>
                  <h2 className="text-primary">{business.contactPerson}</h2>
                  <h2 className="text-gray-500 text-sm">{business.address}</h2>
                  {business.category.name == "Monthly" ? (
                    <Button className="rounded-lg mt-3">
                      Create your plan
                    </Button>
                  ) : (
                    <Button className="rounded-lg mt-3">Book Now</Button>
                  )}
                </div>
              </Link>
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => (
              <div
                key={index}
                className="h-[120px]
                w-full bg-slate-200 animate-pulse
                rounded-lg"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default BusinessList;
