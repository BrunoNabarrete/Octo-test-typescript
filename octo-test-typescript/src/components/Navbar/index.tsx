import React from "react";
import Link from "next/link";

export default function NavBar() {
  return (
    <>
      <nav className="text-center bg-roxo-terciario w-full lg:w-full p-6">
        <div className="flex items-center flex-shrink-0 text-white ml-4 mt-6 lg:mr-6">
          <span className="font-semibold text-xl tracking-tight">OctoKey</span>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow lg:mb-10">
            <Link href="/forms" className="block mt-4 lg:inline-block lg:mt-0 text-white text-xl hover:text-white lg:mr-96">
              Formulário
            </Link>
            <Link href="/location" className="block mt-4 lg:inline-block lg:mt-0 text-white text-xl hover:text-white ">
              Localização
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
