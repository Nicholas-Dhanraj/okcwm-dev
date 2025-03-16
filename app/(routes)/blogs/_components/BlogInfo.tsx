import { Button } from "@/components/ui/button";
import {
  CircleDollarSign,
  Clock,
  Mail,
  MapPin,
  Share,
  User,
} from "lucide-react";
import Image from "next/image";
import React from "react";

function BusinessInfo({ blog }: any) {
  return (
    blog?.name && (
      <div className="p-0 lg:p-1 border-0 lg:border-4 ">
        <div
          className={`shadow-none lg:shadow-md rounded-sm bg-[url('/backgorund.webp')] bg-fixed bg-center bg-no-repeat pt-96`}
          style={{ backgroundImage: `url('${blog?.images[0]?.url}')` }}
        ></div>
        <div className="md:flex gap-4 items-center p-5  lg:pr-20 lg:pl-20">
          {/* <Image
          src={blog?.images[0]?.url}
          alt={blog.name}
          width={150}
          height={200}
          className="rounded-full h-[150px]
        object-cover"
        /> */}

          <div className="lg:flex lg:justify-between items-center w-full ">
            <div className="flex flex-col mt-4 md:mt-0 items-baseline gap-3">
              {/* <Image
              src={blog.image.url}
              alt="image"
              width={700}
              height={200}
              className="rounded-lg"
            /> */}

              <h2 className="font-bold lg:text-[50px] text-[35px] ">
                {blog.name}
              </h2>
              <h2 className="text-[25px] lg:text-[30px] text-gray-700">
                {blog.subheading}
              </h2>

              <h2 className="flex gap-2 text-lg text-gray-700 mt-4 lg-mt-0">
                <Clock /> {blog.readTime}
              </h2>
              {/* <h2 className="flex gap-2 text-lg text-gray-500">
              {blog?.readTime}
            </h2> */}
            </div>
            <div className="flex  lg:flex-col flex-row gap-5 items-end justify-center mt-10 lg:mt-0">
              <Button>
                <Share />
              </Button>
              {/* <h2 className="flex gap-2 text-xl text-primary">
              <Clock /> {blog.contactPerson}{" "}
            </h2> */}

              <h2
                className="text-primary p-1 px-3
        text-lg 
        bg-purple-100 rounded-full"
              >
                {blog?.topic.name}
              </h2>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default BusinessInfo;
