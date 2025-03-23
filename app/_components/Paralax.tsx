"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import Lenis from "@studio-freight/lenis";
import { useTransform, useScroll, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const images = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.webp",
  "10.webp",
  "11.webp",
  "12.webp",
];
const Paralax = () => {
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });
  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 2.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: any) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div>
      <div className="bg-[#ebebeb]">
        <div className="shadow-md rounded-sm gap-6 bg-[url('/backgorund.webp')] bg-fixed  bg-no-repeat ">
          {/* <Image
            src={"/backgorund.webp"}
            alt={"business.name"}
            width={2000}
            height={200}
            className=" object-cover"
          /> */}
          <div className="backdrop-blur-xl bg-white/30 flex flex-col items-center justify-center max-w-lg gap-1 lg:ml-36 p-10 pt-40 pb-40">
            <h2 className="text-gray-950 lg:text-4xl font-sans font-normal text-center">
              &quot;Our Food Should Be Our Medicine & Our Medicine Should Be Our
              Food&quot;
            </h2>
            <p className="lg:mt-10 text-center">
              Get started today with a free 30 min consultation
            </p>
            <Link
              href={"/search/Initial"}
              className="mt-10 max-w-36 rounded-lg hover:shadow-md hover:shadow-primary hover:scale-105 transition-all ease-in-out cursor-pointer"
            >
              <Button className="">Book first Session</Button>
            </Link>

            {/* <div className="min-h-48"></div> */}
          </div>
        </div>
      </div>
      <div className="bg-[#e7e6e9]">
        <div className="shadow-md rounded-sm gap-6 flex flex-col md:flex-row h-90% w-screen ">
          <div className="backdrop-blur-xl bg-white/30 flex flex-col items-center justify-center max-w-lg gap-1 lg:ml-36">
            <Image
              src={"olla.jpg"}
              alt={"business.name"}
              width={600}
              height={200}
              className="object-cover"
            />
            {/* <h2 className="text-gray-950 text-4xl font-sans font-normal text-center">
              "Our Food Should Be Our Medicine & Our Medicine Should Be Our
              Food"
            </h2>
            <Button className="rounded-lg mt-14">Book a Session</Button> */}
            {/* <div className="min-h-48"></div> */}
          </div>
          <div className="flex flex-col justify-center max-w-lg gap-1 lg:ml-36">
            <h1 className="text-gray-950 lg:text-3xl font-sans font-semibold mb-10 text-center">
              Meet Olla
            </h1>
            <p className="text-gray-950 lg:text-xl font-sans font-normal text-center">
              &quot;Olla Alkaisi is a passionate Certified Diet and Nutritional
              Therapist, graduated from The College of Health Studies. She is a
              member of the National Association of Holistic Health
              Practitioners&quot;
            </p>
            <b></b>
            <p className="text-gray-950 lg:text-xl font-sans font-normal text-center">
              Her love of nutrition and wellness began at the start of the
              Covid-19 pandemic, she realized that no one was taking care of
              their health and nutrition as much as they used to, and wanted to
              help people overcome their new habits developed during the
              lockdown. She currently works independently as a nutritionist,
              especially with people who are overweight and guides them to reach
              their goals for weight loss and maintaining a healthy diet.
            </p>
            <Link
              href={"/about"}
              className="mt-10 max-w-24 rounded-lg hover:shadow-md hover:shadow-primary hover:scale-105 transition-all ease-in-out cursor-pointer ml-40"
            >
              <Button className="">Read More</Button>
            </Link>
            {/* <div className="min-h-48"></div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
const Column = ({ images, y }: any) => {
  return (
    <motion.div className={styles.column} style={{ y }}>
      {images.map((src: any, i: any) => {
        return (
          <div key={i} className={styles.imageContainer}>
            <Image src={`/${src}`} alt="image" fill />
          </div>
        );
      })}
    </motion.div>
  );
};

export default Paralax;

//  <main className={styles.main}>
//    <div className={styles.spacer}></div>

//    <div ref={gallery} className={styles.gallery}>
//      <Column images={[images[0], images[1], images[2]]} y={y} />
//      <Column images={[images[3], images[4], images[5]]} y={y2} />
//      <Column images={[images[6], images[7], images[8]]} y={y3} />
//      <Column images={[images[9], images[10], images[11]]} y={y4} />
//      <div className="border-4 border border-stone-200 rounded-lg backdrop-blur-xl bg-white/30 flex flex-col items-center justify-center max-w-2xl gap-1 absolute ml-[420px] mt-[350px] ">
//        <h1 className="text-gray-950 text-3xl font-sans font-normal mb-10 mt-10">
//          I'm active quite a lot on instagram!
//        </h1>
//        <h2 className="text-center text-gray-950 text-2xl font-sans font-normal ">
//          I post a lot there so check me out! Lots of resources and fun content.
//          From tips and tricks to daily life, I promise you won't get bored.
//        </h2>
//        <Link
//          href={"/about"}
//          className="mt-10 max-w-24 rounded-lg hover:shadow-md hover:shadow-primary hover:scale-105 transition-all ease-in-out cursor-pointer"
//        >
//          <Button className="mb-10">Take me there!</Button>
//        </Link>

//        {/* <div className="min-h-48"></div> */}
//      </div>
//    </div>

//    <div className={styles.spacer}></div>
//  </main>;
