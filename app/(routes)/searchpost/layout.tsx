import React from "react";
import CategorySideBar from "./_components/CategorySideBar";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 mt-8">
        <div className=" md:block">
          <CategorySideBar />
        </div>
        <div className="md:col-span-3">{children}</div>
      </div>
    </div>
  );
};

export default layout;
