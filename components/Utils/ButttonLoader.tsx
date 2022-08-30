import { NextPage } from "next";
import Image from "next/image";

interface IProps {
  text: string;
}

const ButttonLoader: NextPage<IProps> = ({ text }) => {
  return (
    <button
      disabled={true}
      className="btn btn-primary flex gap-2 items-center justify-center"
    >
      <Image src={"/assets/sm-loder.svg"} alt="loader" width="20" height="20" />
      {text}
    </button>
  );
};

export default ButttonLoader;
