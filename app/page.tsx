"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./_components/Header";
import Slider from "./_components/SlidingImages/index";
import Hero from "./_components/Hero";
import CategoryList from "./_components/CategoryList";
import GlobalApi from "./_services/GlobalApi";
import { useEffect, useState } from "react";
import BusinessList from "./_components/BusinessList";
import Paralax from "./_components/Paralax";
import styles from "./style.module.scss";
import Magnetic from "@/common/Magnetic";
import { motion } from "framer-motion";
export default function Home() {
  const [categoryList, setCategoryList] = useState([]);
  const [businessList, setBusinessList] = useState([]);

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
      setBusinessList(resp.businessLists);
    });
  };
  return (
    <div>
      <Paralax />
      <Slider />
      <Hero />
      <CategoryList categoryList={categoryList} />
      <BusinessList businessList={businessList} title="All Programs" />

      <motion.div className={styles.contact}>
        <div className={styles.body}>
          {/* <ContactForm /> */}
          {/* <div className={styles.form}>
            <ContactMonthly subject={""} />
          </div> */}

          <div className={styles.info}>
            <div>
              <span>
                <h3>OKCWM</h3>
                <p>Copyright (©) 2024 OKCWM. All Rights Reserved</p>
              </span>
              <span>
                <h3>Version</h3>
                <p>0.0.1</p>
              </span>
            </div>
            <div>
              <span>
                <h3>socials</h3>
                <Magnetic>
                  <p>Instagram</p>
                </Magnetic>
              </span>
              {/* <Magnetic>
              <p>Tiktok</p>
            </Magnetic> */}
              <Magnetic>
                <p>TikTok</p>
              </Magnetic>
              <Magnetic>
                <p>Youtube</p>
              </Magnetic>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
