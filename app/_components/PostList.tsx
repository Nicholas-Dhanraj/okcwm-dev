"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
interface ModalProps {
  postList: any;
  title: string;
}
const PostList: React.FC<ModalProps> = ({ postList, title }) => {
  return (
    <div className="m-5">
      <h2 className="font-bold text-[22px]">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
        {postList.length > 0 && title !== "All"
          ? postList.map((post: any, index: number) => (
              <Link
                href={"/blogs/" + post.id}
                key={index}
                className=" shadow-md rounded-lg hover:shadow-md hover:shadow-primary hover:scale-105 transition-all ease-in-out cursor-pointer"
              >
                <Image
                  src={post?.images[0].url}
                  alt={post.name}
                  width={500}
                  height={200}
                  className="h-[150px] md:h-[200px] object-cover rounded-xl"
                />
                <div className="flex flex-col items-baseline p-3 gap-1">
                  <h2
                    // style={{
                    //   backgroundColor: `rgba(${post.category.bgColor.rgba.r},${post.category.bgColor.rgba.g},${post.category.bgColor.rgba.b},${post.category.bgColor.rgba.a})`,
                    // }}
                    className="p-1 bg-purple-200 text-primary rounded-full px-2 text-[12px]"
                  >
                    {post.topics.name}
                  </h2>
                  <h2 className="font-bold text-lg">{post.name}</h2>
                  <h2 className="text-primary">{post.contactPerson}</h2>
                  <h2 className="text-gray-500 text-sm">{post.address}</h2>
                  <Button className="rounded-lg mt-3">Book Now</Button>
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

export default PostList;
