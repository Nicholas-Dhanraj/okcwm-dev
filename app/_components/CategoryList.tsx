import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
interface ModalProps {
  categoryList: any;
}
const CategoryList: React.FC<ModalProps> = ({ categoryList }) => {
  return (
    <div className="mx-4 md:mx-22 lg:mx-52 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categoryList.length > 0
        ? categoryList.map(
            (
              category: {
                bgColor: any;
                name: ReactNode;
                icon: { url: string | StaticImport };
              },
              index: any
            ) => (
              <Link
                href={"/search/" + category.name}
                key={index}
                style={{
                  backgroundColor: `rgba(${category.bgColor.rgba.r},${category.bgColor.rgba.g},${category.bgColor.rgba.b},${category.bgColor.rgba.a})`,
                }}
                className={`flex flex-col items-center justify-center gap-2 p-1 rounded-lg cursor-pointer hover:scale-110 transition-all ease-in-out`}
              >
                {/* <Image
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="h-auto w-16"
                  alt=""
                  src={category.icon.url}
                /> */}
                <h2 className="text-primary">{category.name}</h2>
              </Link>
            )
          )
        : [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div
              key={index}
              className="h-[120px]
                w-full bg-slate-200 animate-pulse
                rounded-lg"
            ></div>
          ))}
    </div>
  );
};
// ${category.bgColor.hex}
export default CategoryList;
