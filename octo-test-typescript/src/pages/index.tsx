import React from "react";
import NavBar from "../components/Navbar";
import Weather from "../components/WeatherApi";

export default function Page() {
  return (
    <div className="bg-gray-200 items-center">
      <NavBar />
      <div className="flex justify-center bg-gray-200 shadow-lg h-full rounded-lg overflow-hidden">
        <Weather />
      </div>
    </div>
  );
}
