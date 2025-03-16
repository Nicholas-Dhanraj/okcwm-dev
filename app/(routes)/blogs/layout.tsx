import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-8 bg-gray-50">
        <div className="hidden md:block">{/* <CategorySideBar /> */}</div>
        <div className="md:col-span-3">{children}</div>
      </div>
    </div>
  );
};

export default layout;
