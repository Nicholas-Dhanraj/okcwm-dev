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
import Link from "next/link";
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
                <p>1.0.0</p>
              </span>
            </div>
            <div>
              {/* <span>
                <h3>socials</h3>
              </span> */}

              <Magnetic>
                <Link
                  target="_blank"
                  href={"https://youtube.com/@ollakaisi?si=mi856FP75CKwX5Zc"}
                >
                  <Image src="/yt.svg" width={30} height={30} alt="youtube" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  target="_blank"
                  href={
                    "https://www.tiktok.com/@ollaalkaisi?_t=ZM-8uMBdknVwNb&_r=1"
                  }
                >
                  <Image src="/tt.svg" width={30} height={30} alt="tik tok" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  target="_blank"
                  href={
                    "https://www.instagram.com/ollaalkaisi?igsh=MTNqM2pyOXltMzR2dw=="
                  }
                >
                  <Image src="/ig.svg" width={30} height={30} alt="instagram" />
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
