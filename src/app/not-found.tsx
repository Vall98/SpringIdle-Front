'use client'

import Link from "next/link";

const NotFound = () => {
  return (
    <main className="h-screen flex items-center justify-center text-center dark:bg-black dark:text-white font-sans">
      <div>
        <h1 className="inline-block mr-5 pr-5 text-2xl font-medium align-top leading-[49px] border-r dark:border-r-white border-r-black dark:border-r-white">
          404
        </h1>
        <div className="inline-block">
          <h2 className="text-sm font-normal leading-[49px] m-0">This page could not be found.</h2>
        </div>
        <div className="mt-4">
          <Link href="/" className="text-blue-500 hover:text-blue-700 font-medium">
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;