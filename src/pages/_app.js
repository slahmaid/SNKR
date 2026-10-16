import "@/styles/globals.css";
import "@/components/menu/multi-level-drawer-menu.css";
import Head from "next/head";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#f0f0f0" />
      </Head>
      <main className={poppins.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
