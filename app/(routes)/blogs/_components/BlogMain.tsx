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
const { htmlToText } = require("html-to-text");

// import BookingSection from "./BookingSection";
// import { checkout } from "./checkout";
function BlogMain({ blog }: any) {
  return (
    blog?.name && (
      <div>
        {/* <h2 className="font-bold text-[25px] ">Description</h2> */}
        <span
          dangerouslySetInnerHTML={{ __html: blog.body.html }}
          className="mt-4 text-xl text-gray-600"
        >
          {/* {htmlToText(blog.body.html)} */}
        </span>

        <h2 className="font-bold text-[25px] mt-8">Gallary</h2>
        <div
          className="grid grid-cols-2 md:grid-cols-2
      lg:grid-cols-2 gap-5 mt-5"
        >
          {blog?.images?.map(
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

export default BlogMain;
