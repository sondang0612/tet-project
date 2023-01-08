import Head from "next/head";
import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
  title?: string;
};

export default function Layout(props: Props) {
  return (
    <>
      <Head>
        <title>{props.title ? props.title + "-Amazona" : "Amazona"}</title>
        <meta name="description" content="Ecommerce Website" />
        <link href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 justify-between shadow-md items-center px-4">
            <Link href="/" legacyBehavior>
              <a className="text-lg font-bold">amazona</a>
            </Link>
            <div>
              <Link href="/cart" legacyBehavior>
                <a className="p-2">Cart</a>
              </Link>
              <Link href="/login" legacyBehavior>
                <a className="p-2">Login</a>
              </Link>
            </div>
          </nav>
        </header>
        <main className="w-full m-auto px-4 mt-4">{props.children}</main>
        <footer className="flex justify-center items-center h-10 shadow-inner">
          footer
        </footer>
      </div>
    </>
  );
}
