import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import styles from "./style.module.scss";
import Image from "next/image";
import Rounded from "../../../common/RoundedButton/index";
import Link from "next/link";

const slider1 = [
  {
    color: "#7f57f1",
    src: "1.jpg",
  },
  {
    color: "#7f57f1",
    src: "2.jpg",
  },
  {
    color: "#7f57f1",
    src: "3.jpg",
  },
  {
    color: "#7f57f1",
    src: "4.jpg",
  },
];

const slider2 = [
  {
    color: "#7f57f1",
    src: "5.jpg",
  },
  {
    color: "#7f57f1",
    src: "6.jpg",
  },
  {
    color: "#7f57f1",
    src: "7.jpg",
  },
  {
    color: "#7f57f1",
    src: "8.jpg",
  },
];

export default function Index() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  return (
    <div ref={container} className={styles.slidingImages}>
      <h2 className={styles.ha}>
        {" "}
        I post alot on my instagram, check it out for helpful tips and
        insightful talks. 😊
      </h2>
      <div className={styles.more}>
        <p className={styles.pa}>
          Use{" "}
          <span style={{ color: "#7f57f1", fontWeight: 500 }}>
            &nbsp; #okcwm &nbsp;
          </span>{" "}
          to be featured on our insta!{" "}
        </p>

        <div className={styles.round}>
          <Rounded
            backgroundImage={
              "linear-gradient(to right,#833ab4,#fd1d1d,#fcb045)"
            }
            // backgroundColor={"#25D366"}
          >
            <Link
              legacyBehavior
              href={
                "https://www.instagram.com/ollaalkaisi?igsh=MTNqM2pyOXltMzR2dw=="
              }
            >
              <a target="_blank">
                <p>View more posts</p>
              </a>
            </Link>
          </Rounded>
        </div>
      </div>

      <motion.div style={{ x: x1 }} className={styles.slider}>
        {slider1.map((project, index) => {
          return (
            <div
              key={index}
              className={styles.project}
              style={{ backgroundColor: project.color }}
            >
              <div className={styles.imageContainer}>
                <Image fill={true} alt={"image"} src={`/${project.src}`} />
              </div>
            </div>
          );
        })}
      </motion.div>
      <motion.div style={{ x: x2 }} className={styles.slider}>
        {slider2.map((project, index) => {
          return (
            <div
              key={index}
              className={styles.project}
              style={{ backgroundColor: project.color }}
            >
              <div key={index} className={styles.imageContainer}>
                <Image fill={true} alt={"image"} src={`/${project.src}`} />
              </div>
            </div>
          );
        })}
      </motion.div>

      <motion.div style={{ height }} className={styles.circleContainer}>
        <div className={styles.circle}></div>
      </motion.div>
    </div>
  );
}
