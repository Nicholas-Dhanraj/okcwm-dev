"use client";
import React, { useEffect, useState } from "react";
import CategorySideBar from "./_components/CategorySideBar";
import CategoryList from "@/app/_components/CategoryList";
import GlobalApi from "@/app/_services/GlobalApi";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);
  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp: any) => {
      setCategoryList(resp.categories);
    });
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-row-4 mt-8">
        <div className="md:block">
          {
            /* <CategorySideBar /> */ <CategoryList
              categoryList={categoryList}
            />
          }
        </div>
        <div className="md:col-span-3">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
