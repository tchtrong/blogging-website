import { Head } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/server.ts";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <title>BinMin's Blog</title>
      </Head>
      <Component />
    </>
  );
}
