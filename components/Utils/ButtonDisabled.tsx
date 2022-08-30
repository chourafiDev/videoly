import { NextPage } from "next";
import Image from "next/image";

interface IProps {
  text: string;
}

const ButttonDisabled: NextPage<IProps> = ({ text }) => {
  return (
    <button className="btn-disabled" disabled={true}>
      {text}
    </button>
  );
};

export default ButttonDisabled;
