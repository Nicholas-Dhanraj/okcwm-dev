"use client";
//https://www.linkedin.com/pulse/comprehensive-guide-sending-emails-through-smtp-nextjs-wali-ullah-zrcrf/
// import styles from "../../_components/";
import ContactForm from "../../_components/contactForm";
import styles from "./style.module.scss";
import Rounded from "../../../common/RoundedButton/index";
import { motion, useScroll, useTransform } from "framer-motion";
import Magnetic from "@/common/Magnetic";
import { useRef } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { sendEmail } from "@/app/utils/email";
export type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Home() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);

  const { register, handleSubmit } = useForm<FormData>();

  function onSubmit(data: FormData) {
    // sendEmail(data);
  }

  return (
    <motion.div style={{ y }} ref={container} className={styles.contact}>
      <div className={styles.body}>
        <div className={styles.title}>
          <span>
            <div className={styles.imageContainer}>
              <Image fill={true} alt={"image"} src={`/images/olla_about.png`} />
            </div>
            <h2>Let&apos;s chat.</h2>
            <div className={styles.nav}>
              <Rounded>
                <p>info@okcwm.com</p>
              </Rounded>
              <Rounded>
                <p>+1 (437) 450-6012</p>
              </Rounded>
            </div>
          </span>
          {/* <h2>together</h2> */}
          <motion.div style={{ x }} className={styles.buttonContainer}>
            <Rounded backgroundColor={"#25D366"} className={styles.button}>
              <p>Watsapp (icon)</p>
            </Rounded>
          </motion.div>
          <motion.svg
            style={{ rotate, scale: 2 }}
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <div className={styles.arrow}>
              <path
                d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
                fill="#196b34"
              />
            </div>
          </motion.svg>
        </div>

        <div className="w-full px-4 lg:w-1/2 xl:w-6/12 ml-10">
          <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="mb-3 block text-base font-medium text-black"
              >
                Full Name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                {...register("name", { required: true })}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-3 block text-base font-medium text-black"
              >
                Email Address
              </label>
              <input
                type="email"
                placeholder="example@domain.com"
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                {...register("email", { required: true })}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="subject"
                className="mb-3 block text-base font-medium text-black"
              >
                Subject
              </label>
              <input
                type="text"
                placeholder="subject"
                // value={
                //   output === null
                //     ? stateOfInput.toLowerCase() + " TDEE: " + 0
                //     : stateOfInput.toLowerCase() + " TDEE: " + output
                // }
                // onChange={(e) => setStateOfInput(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                {...register("subject", { required: true })}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="message"
                className="mb-3 block text-base font-medium text-black"
              >
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Type your message"
                className="w-full resize-none rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                {...register("message", { required: true })}
              ></textarea>
            </div>
            <div>
              <button className="hover:shadow-form rounded-md bg-primary py-3 px-8 text-base font-semibold text-white outline-none">
                Submit
              </button>
            </div>
          </form>
        </div>

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
              <p>Facebook</p>
            </Magnetic>
            <Magnetic>
              <p>Youtube</p>
            </Magnetic>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
