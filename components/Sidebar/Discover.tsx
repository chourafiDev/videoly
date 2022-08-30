import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { categories } from "../../utils/data";

const Discover = () => {
  const router = useRouter();
  const { topic } = router.query;

  const activeStyle =
    "xl:border hover:bg-light xl:border-primary px-2 lg:py-2 py-3 rounded xl:rounded-full flex items-center justify-center gap-2 cursor-pointer  text-primary";
  const style =
    "xl:border hover:bg-light xl:border-gary-300 px-2 lg:py-2 py-3 rounded xl:rounded-full flex items-center justify-center gap-2 cursor-pointer  text-dark";
  return (
    <div className="xl:border-b xl:border-gray-200 pb-6 pt-2 xl:pt-0">
      <p className="text-dark/50 text-sm my-4 hidden xl:block">Discover</p>
      <div className="lg:block hidden">
        <div className="flex flex-wrap gap-3 justify-start ">
          {categories.map((item) => (
            <Link href={`/?topic=${item.name}`} key={item.name}>
              <div className={topic === item.name ? activeStyle : style}>
                <span className="font-bold text-sm">{item.icon}</span>
                <span className="font-medium text-sm hidden xl:block capitalize">
                  {item.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="lg:hidden block">
        <div className="flex flex-col gap-3 justify-center">
          {categories.map((item) => (
            <Link href={`/?topic=${item.name}`} key={item.name}>
              <div className={topic === item.name ? activeStyle : style}>
                <span className="font-bold text-sm">{item.icon}</span>
                <span className="font-medium text-sm hidden xl:block capitalize">
                  {item.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover;
