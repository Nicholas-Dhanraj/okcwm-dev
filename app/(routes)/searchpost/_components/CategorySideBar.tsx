"use client";

import GlobalApi from "@/app/_services/GlobalApi";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
const CategorySideBar = () => {
  const [topicList, setTopicList] = useState([]);
  const [businessList, setBusinessList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const params: any = usePathname();

  // const category = params.split("/")[2];
  useEffect(() => {
    getTopicList();
  }, []);

  useEffect(() => {
    params && setSelectedCategory(params.split("/")[2]);
  }, [params]);

  const getTopicList = () => {
    GlobalApi.getTopic().then((resp: any) => {
      setTopicList(resp.topics);
    });
  };

  return (
    <div>
      <h2 className="font-bold mb-3 text-lg text-primary">Categories</h2>
      <div className="flex md:flex-row lg:flex-col items-baseline gap-7 lg:gap-0">
        {topicList.map(
          (
            category: {
              bgColor: any;
              name: ReactNode;
              icon: { url: string | StaticImport };
            },
            index
          ) => (
            <Link
              href={"/searchpost/" + category.name}
              key={index}
              // style={{
              //   backgroundColor: `rgba(${category.bgColor.rgba.r},${category.bgColor.rgba.g},${category.bgColor.rgba.b},${category.bgColor.rgba.a})`,
              // }}
              className={`flex gap-2 p-3 
                border rounded-lg mb-3
                md:mr-10 cursor-pointer
                hover:bg-purple-50
                hover:shadow-md
                items-center
                hover:text-primary
                 hover:border-primary
                 ${
                   selectedCategory == category.name &&
                   "translate-x-2 border-l-2 border-primary text-primary shadow-md scale-105"
                 }
                 transition-all ease-in-out 
                 `}
            >
              {/* <Image
                src={category.icon.url}
                alt="icon"
                width={30}
                height={30}
              /> */}
              <h2>{category.name}</h2>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default CategorySideBar;
