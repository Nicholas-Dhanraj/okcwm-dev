"use client";
import Test from "../(routes)/test/page";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Alex_Brush } from "next/font/google";
import { MenuIcon } from "lucide-react";
const caligraphy = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
});
const Header = () => {
  const { data } = useSession();

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="p-5 shadow-xl overflow-x-auto">
      <div className="flex items-center grid lg:grid-cols-3">
        <div className="md:flex gap-5 hidden">
          <Link href={"/"}>
            <h2 className="hover:scale-105 hover:text-primary cursor-pointer">
              Home
            </h2>
          </Link>
          <Link href={"/search/All"}>
            <h2 className="hover:scale-105 hover:text-primary cursor-pointer">
              Programs
            </h2>
          </Link>
          <Link href={"/searchpost/All"}>
            <h2 className="hover:scale-105 hover:text-primary cursor-pointer">
              Blog
            </h2>
          </Link>
          {/* <Link href={"/"}>
            <h2 className="hover:scale-105 hover:text-primary cursor-pointer">
              Insta Gallery
            </h2>
          </Link> */}
          <Link href={"/about"}>
            <h2 className="hover:scale-105 hover:text-primary cursor-pointer">
              About
            </h2>
          </Link>
          <Link href={"/contact"}>
            <h2 className="hover:scale-105 hover:text-primary cursor-pointer">
              Contact
            </h2>{" "}
          </Link>
        </div>
        <div className="flex flex-row gap-6 justify-center align-middle">
          <div className="flex items-center justify-center align-middle pl-16">
            <Link href={"/"}>
              <Image src="/logo.png" width={250} height={150} alt="logo" />
            </Link>
            {/* <div>
            <div className={caligraphy.className}>
              <p className="font-medium text-[30px]">{"Olla Al-Kaisi"}</p>
            </div>
            <h2 className="font-medium text-[16px]">{"Nutritionist"}</h2>
          </div> */}
          </div>
          <div className="flex md:hidden ">
            <div>
              {data?.user?.image ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MenuIcon />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuSeparator />
                    {/* <DropdownMenuItem>Profile</DropdownMenuItem> */}
                    <DropdownMenuItem>
                      <Link href={"/"}>
                        <h2 className="hover:scale-105 hover:text-primary cursor-pointer">
                          Home
                        </h2>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                      <Link href={"/search/All"}>
                        <h2 className="hover:scale-105 hover:text-primary cursor-pointer">
                          Programs
                        </h2>
                      </Link>{" "}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={"/searchpost/All"}>
                        <h2 className="hover:scale-105 hover:text-primary cursor-pointer">
                          Blog
                        </h2>
                      </Link>{" "}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={"/about"}>
                        <h2 className="hover:scale-105 hover:text-primary cursor-pointer">
                          About
                        </h2>
                      </Link>{" "}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={"/contact"}>
                        <h2 className="hover:scale-105 hover:text-primary cursor-pointer">
                          Contact
                        </h2>
                      </Link>{" "}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    {/* <DropdownMenuItem>Team</DropdownMenuItem> */}
                    <DropdownMenuSeparator />
                    {/* <DropdownMenuItem>Profile</DropdownMenuItem> */}
                    <DropdownMenuItem>
                      <Link href={"/mybooking"}>My Booking</Link>{" "}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={"/test"}>Time off</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={() => signIn("descope")}>Login/Sign Up</Button>
              )}
            </div>
          </div>
        </div>
        <div className="md:flex justify-end order-last gap-5 hidden">
          <div>
            <div className={caligraphy.className}>
              <p className="font-medium text-[25px]">{"Olla Al-Kaisi"}</p>
            </div>
            <h2 className="font-medium text-[14px]">{"Nutritionist"}</h2>
          </div>
          <div>
            {data?.user?.image ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Image
                    src={data?.user?.image}
                    alt="User"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {/* <DropdownMenuItem>Profile</DropdownMenuItem> */}
                  <DropdownMenuItem>
                    <Link href={"/mybooking"}>My Booking</Link>{" "}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={"/test"}>Time off</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />

                  {/* <DropdownMenuItem>Team</DropdownMenuItem> */}
                  <DropdownMenuItem onClick={() => signOut()}>
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => signIn("descope")}>Login/Sign Up</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
