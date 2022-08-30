import Image from "next/image";
import React from "react";

const index = () => {
  return (
    <div className="w-[80%] mx-auto">
      <Image
        src="/assets/no-data.svg"
        alt="no-data"
        layout="responsive"
        width={100}
        height={100}
      />
    </div>
  );
};

export default index;
