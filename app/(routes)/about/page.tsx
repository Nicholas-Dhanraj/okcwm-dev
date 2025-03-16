"use client";
// import styles from "../../_components/";
import { projects } from "../../data";
import Card from "../../_components/Card";
import { useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Home() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });
  const pathname = usePathname();
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  const backToTop = () => window.scrollTo({ top: 0 });
  return (
    <main ref={container}>
      {projects.map((project, i) => {
        const targetScale = 1 - (projects.length - i) * 0.05;
        return (
          <Card
            key={`p_${i}`}
            i={i}
            {...project}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
      <div className="bg-[#ebebeb] rounded-lg mb-40 overflow-x-auto ">
        <div className="shadow-md gap-6 bg-fixed  bg-no-repeat ">
          {/* <Image
            src={"/backgorund.webp"}
            alt={"business.name"}
            width={2000}
            height={200}
            className=" object-cover"
          /> */}
          <div className="backdrop-blur-xl bg-white/30 flex flex-col items-center justify-center gap-1 p-10 pt-40 pb-40">
            <h2 className="text-gray-950 text-4xl font-sans font-normal text-center">
              Feel free to reach out with any other questions about me and what
              I do
            </h2>
            <p className="mt-10">
              I am always open to hear about you and how I can meet your needs
            </p>
            <div className="flex flex-row items-center justify-center gap-2">
              <Link
                href={"/contact"}
                className="mt-10 max-w-36 rounded-lg hover:shadow-md hover:shadow-primary hover:scale-105 transition-all ease-in-out cursor-pointer"
              >
                <Button className="">Contact me</Button>
              </Link>

              <Link
                href={"/about"}
                className="mt-10 max-w-36 rounded-lg hover:shadow-md hover:shadow-primary hover:scale-105 transition-all ease-in-out cursor-pointer"
              >
                <Button>Back to top</Button>
              </Link>
            </div>
            {/* <div className="min-h-48"></div> */}
          </div>
        </div>
      </div>
    </main>
  );
}
