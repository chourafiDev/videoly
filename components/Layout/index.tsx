import NextNProgress from "nextjs-progressbar";
import React from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "../Navbar";

type Props = {
  children: JSX.Element;
  searchValue: string;
};

const Index = ({ children, searchValue }: Props) => {
  return (
    <div>
      <Navbar searchTerm={searchValue} />
      {children}
      <NextNProgress color="#FE2C55" />
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Index;
