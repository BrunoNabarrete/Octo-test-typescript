import React, { useState } from "react";
import axios from "axios";

interface Address {
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  uf: string;
}

export default function SearchAddress() {
  const [street, setStreet] = useState<string>("");
  const [addressOptions, setAddressOptions] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [error, setError] = useState<string>('');

  async function getAddressOptions(streetName: string) {
    setError('');
    if (streetName.length < 3) {
      setError('No mínimo 3 caracteres');
      setAddressOptions([]);
      return;
    }

    if (/\d/.test(streetName)) {
      setError('Não é permitido números');
      setAddressOptions([]);
      return;
    }

    try {
      const formattedStreetName = streetName.replace(/\s/g, '-');
      const response = await axios.get(`http://cep.la/${encodeURIComponent(formattedStreetName)}`, {
        headers: {
          "Accept": "application/json"
        }
      });
      setAddressOptions(response.data);
    } catch (error) {
      console.error(`Erro ao obter opções para o nome da rua:`, error);
    }
  }

  function handleAddressSelection(address: Address) {
    setSelectedAddress(address);
    setAddressOptions([]);
  }

  return (
    <div className="w-11/12 lg:w-3/5 p-4 lg:p-20 bg-white mt-8 lg:mt-14 mb-8 lg:mb-14 rounded-xl">
      <h2 className="text-lg font-semibold mb-4">Consulta de Endereço:</h2>
      <div className="flex-wrap">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input
            type="text"
            id="default-search"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Digite o endereço"
            required
          />
          <button
            type="button"
            onClick={() => getAddressOptions(street)}
            className="text-white absolute right-2.5 bottom-2.5 font-bold opacity-75 text-sm lg:text-base text-white font-medium rounded-md text-center bg-roxo-principal hover:bg-roxo-secundario hover:text-white rounded-lg transition duration-300 ease-out hover:ease-in px-2 py-1"
          >
            Search
          </button>
        </div>
        <div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">{error}</strong>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {addressOptions.map((address, index) => (
            <div key={index} className="max-w-sm p-6 text-black border border-gray-300 shadow-lg overflow-hidden rounded-lg">
              <h5 className="mb-2 text-xl tracking-tight text-gray-900"><b>CEP:</b> {address.cep}</h5>
              <h5 className="mb-2 text-xl tracking-tight text-gray-900 "><b>Logradouro:</b> {address.logradouro}</h5>
              <h5 className="mb-2 text-xl tracking-tight text-gray-900 "><b>Bairro:</b> {address.bairro}</h5>
              <h5 className="mb-2 text-xl tracking-tight text-gray-900 "><b>Cidade:</b> {address.cidade}</h5>
              <h5 className="mb-2 text-xl tracking-tight text-gray-900 "><b>Estado:</b> {address.uf}</h5>
              <button
                onClick={() => handleAddressSelection(address)}
                className="inline-flex px-4 py-3 font-bold opacity-75 text-sm lg:text-base text-white font-medium rounded-md text-center bg-roxo-principal hover:bg-roxo-secundario hover:text-white rounded-lg transition duration-300 ease-out hover:ease-in"
              >
                Selecionar
              </button>
            </div>
          ))}
        </div>
      </div>
      {selectedAddress && (
        <div className="border-t text-black mt-4 pt-4">
          <h3 className="text-lg font-semibold text-black mb-2">Endereço Selecionado:</h3>
          <p>CEP: {selectedAddress.cep}</p>
          <p>Logradouro: {selectedAddress.logradouro}</p>
          <p>Bairro: {selectedAddress.bairro}</p>
          <p>Cidade: {selectedAddress.cidade}</p>
          <p>Estado: {selectedAddress.uf}</p>
        </div>
      )}
    </div>
  );
}
