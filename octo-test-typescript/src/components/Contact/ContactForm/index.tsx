import React, { useState } from "react";

export default function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [details, setDetails] = useState("");

  function validateEmail(email: string) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  function validatePhoneNumber(phoneNumber: string) {
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");
    return cleanedPhoneNumber.length === 11;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateEmail(email)) {
      alert("Invalid email");
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      alert("Invalid phone number");
      return;
    }

    const formData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      details,
    };

    console.log(formData);

    setDetails("");
    setEmail("");
    setFirstName("");
    setLastName("");
    setPhoneNumber("");

    window.location.href = "/forms";
  }


  return (
    <div className="bg-white w-full lg:w-1/2 p-8 lg:p-16">
      <form onSubmit={handleSubmit}>
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-2">
            <div>
              <label
                htmlFor="hs-firstname-contacts-1"
                className="block text-sm text-gray-700 font-small mb-2"
              >
                Nome
              </label>
              <input
                type="text"
                name="hs-firstname-contacts-1"
                id="hs-firstname-contacts-1"
                className="py-2 px-3 block w-full border rounded-md text-black text-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="hs-lastname-contacts-1"
                className="block text-sm text-gray-700 font-small mb-2"
              >
                Sobrenome
              </label>
              <input
                type="text"
                name="hs-lastname-contacts-1"
                id="hs-lastname-contacts-1"
                className="py-2 px-3 block w-full border rounded-md text-sm text-black focus:border-blue-500 focus:ring-blue-500"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="hs-email-contacts-1"
                className="block text-sm text-gray-700 font-small mb-2"
              >
                Email
              </label>
              <input
                type="email"
                name="hs-email-contacts-1"
                id="hs-email-contacts-1"
                autoComplete="email"
                className="py-3 px-4 block w-full border rounded-md text-sm text-black focus:border-blue-500 focus:ring-blue-500"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="hs-phone-number-1"
                className="block text-sm text-gray-700 font-small mb-2"
                >
                Numero de telefone
              </label>
              <input
                type="text"
                name="hs-phone-number-1"
                id="hs-phone-number-1"
                className="py-3 px-4 block w-full border rounded-md text-sm text-black focus:border-blue-500 focus:ring-blue-500"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="lg:col-span-2">
              <label
                htmlFor="hs-about-contacts-1"
                className="block text-sm text-gray-700 font-small mb-2"
              >
                Descreva sua necessidade
              </label>
              <textarea
                id="hs-about-contacts-1"
                name="hs-about-contacts-1"
                rows={3}
                className="py-2 px-3 block w-full border rounded-md text-sm text-black focus:border-blue-500 focus:ring-blue-500"
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center mt-6 justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-46 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 ">
                <span className="font-semibold">Clica para upload</span> or
                arraste o arquivo
              </p>
              <p className="text-xs text-gray-500 ">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
            />
          </label>
        </div>
        <div className="mt-6 grid">
          <button
            type="submit"
            className="inline-flex justify-center items-center gap-x-3 text-center bg-roxo-principal hover:bg-roxo-secundario border border-transparent text-sm lg:text-base text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4"
          >
            Enviar resposta
          </button>
        </div>
      </form>
    </div>
  );
}