import React from "react";
import ContactForm from "./ContactForm";
import ContactInformation from "./ContactInformation";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-200 flex justify-center">
      <div className="w-11/12 lg:w-4/5 my-20 shadow-lg rounded-lg overflow-hidden flex flex-wrap">
        <ContactInformation />
        <ContactForm />
      </div>
    </div>
  );
}
