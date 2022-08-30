import React from "react";
import { footerList1, footerList2, footerList3 } from "../../utils/data";

const Footer = () => {
  const List = ({ items }: { items: string[] }) => (
    <div className="flex flex-wrap gap-2 mt-5">
      {items.map((item) => (
        <p
          key={item}
          className="text-gray-400 text-sm hover:underline cursor-pointer"
        >
          {item}
        </p>
      ))}
    </div>
  );

  return (
    <div className="mt-6 hidden xl:block">
      <List items={footerList1} />
      <List items={footerList2} />
      <List items={footerList3} />
      <p className="text-gray-400 text-sm mt-5">2022 TOKTOK</p>
    </div>
  );
};

export default Footer;
