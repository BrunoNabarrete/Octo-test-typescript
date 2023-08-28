import React, { useState } from "react";

interface Address {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export default function SearchAddress() {
  const [uf, setUf] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");
  const [rua, setRua] = useState<string>("");
  const [addressOptions, setAddressOptions] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [error, setError] = useState<string>('');

  async function getAddressOptions() {
    setError('');

    if (!uf || !cidade || !rua) {
      setError('Preencha todos os campos');
      setAddressOptions([]);
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${uf}/${cidade}/${rua}/json/`);
      const responseData = await response.json();
      console.log(responseData)
      setAddressOptions([responseData][0]);
      console.log(addressOptions)
    } catch (error) {
      console.error(`Erro ao obter opções para o endereço:`, error);
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
      <div className="mb-4">
        <label htmlFor="uf" className="text-sm font-medium text-gray-900">UF</label>
        <input
          type="text"
          id="uf"
          value={uf}
          onChange={(e) => setUf(e.target.value)}
          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="UF"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="cidade" className="text-sm font-medium text-gray-900">Cidade</label>
        <input
          type="text"
          id="cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Cidade"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="rua" className="text-sm font-medium text-gray-900">Rua</label>
        <input
          type="text"
          id="rua"
          value={rua}
          onChange={(e) => setRua(e.target.value)}
          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Rua"
          required
        />
      </div>
      <button
        type="button"
        onClick={getAddressOptions}
        className="text-white font-bold opacity-75 text-sm lg:text-base font-medium rounded-md text-center bg-roxo-principal hover:bg-roxo-secundario hover:text-white rounded-lg transition duration-300 ease-out hover:ease-in px-4 py-2"
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
              <h5 className="mb-2 text-xl tracking-tight text-gray-900 "><b>Cidade:</b> {cidade}</h5>
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
        <div>
        {selectedAddress && (
        <div className="border-t text-black mt-4 pt-4">
          <h3 className="text-lg font-semibold text-black mb-2">Endereço Selecionado:</h3>
          <p>CEP: {selectedAddress.cep}</p>
          <p>Logradouro: {selectedAddress.logradouro}</p>
          <p>Bairro: {selectedAddress.bairro}</p>
          <p>Estado: {selectedAddress.uf}</p>
        </div>
      )}
      </div>
      </div>
  )
}
