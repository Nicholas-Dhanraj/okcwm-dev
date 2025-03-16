"use client";

import BusinessList from "@/app/_components/BusinessList";
import GlobalApi from "@/app/_services/GlobalApi";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const BusinessByCategory = ({ params }: any) => {
  const [businessList, setBusinessList] = useState([]);
  const params1: any = usePathname();
  useEffect(() => {
    console.log(params);
    params && getBusinessList();
  }, [params]);

  const getBusinessList = () => {
    GlobalApi.getBusinessByCategory(params.category).then((res: any) => {
      setBusinessList(res?.businessLists);
    });
  };
  useEffect(() => {
    params1 && setSelectedCategory(params1.split("/")[2]);
  }, [params1]);
  const [selectedCategory, setSelectedCategory] = useState();

  const [categoryList, setCategoryList] = useState([]);
  const [businessList1, setBusinessList1] = useState([]);

  useEffect(() => {
    getCategoryList();
    getAllBusinessList();
  }, []);
  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp: any) => {
      setCategoryList(resp.categories);
    });
  };

  const getAllBusinessList = () => {
    GlobalApi.getAllBusinessList().then((resp: any) => {
      setBusinessList1(resp.businessLists);
    });
  };
  return (
    <div>
      {selectedCategory == "All" ? (
        <BusinessList businessList={businessList1} title="All Programs" />
      ) : (
        <BusinessList title={params.category} businessList={businessList} />
      )}
    </div>
  );
};

export default BusinessByCategory;
