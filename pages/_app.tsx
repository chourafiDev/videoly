// import { store } from "../redux/store";
import type { AppProps } from "next/app";
import { wrapper } from "../redux/store";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return <Component {...pageProps} />;
}

// export default MyApp;
export default wrapper.withRedux(MyApp);
