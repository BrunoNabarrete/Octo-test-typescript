import React, { useEffect, useState } from "react";

export default function WeatherApi() {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [visibility, setVisibility] = useState<number | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [windSpeed, setWindSpeed] = useState<number | null>(null);
  const [cityName, setCityName] = useState<string | null>(null);

  async function getWeather(latitude: number, longitude: number) {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,visibility`);
    const data = await response.json();
    setVisibility(data.hourly.visibility[0]);
    setHumidity(data.hourly.relativehumidity_2m[0]);
    setWindSpeed(data.current_weather.windspeed);
    setTemperature(data.current_weather.temperature);
  }

  async function getCityName(latitude: number, longitude: number) {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
      const data = await response.json();
      setCityName(data.address.city);
    } catch (error) {
      console.error("Erro ao obter nome da cidade:", error);
    }
  }

  function getCurrentPosition() {
    return new Promise<{ latitude: number; longitude: number }>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          console.log("Latitude is:", position.coords.latitude);
          console.log("Longitude is:", position.coords.longitude);
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        },
        function(error) {
          console.error("Erro ao obter localização:", error);
          reject(error);
        }
      );
    });
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const position = await getCurrentPosition();
        await getWeather(position.latitude, position.longitude);
        await getCityName(position.latitude, position.longitude);
      } catch (error) {
        console.error("Erro durante o fetch de dados:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="text-center bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl w-11/12 lg:w-11/12 p-4 lg:p-20 bg-white mt-4 lg:mt-14 mb-4 lg:mb-14 rounded-xl">
      <section className="p-8 text-center flex flex-col">
        <h1 className="text-3xl font-bold p-2 m-2 text-white">O clima na cidade de {cityName}</h1>
        <section className="result-container p-4 m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="weather border-2 p-4 m-4 rounded-lg backdrop-blur-md drop-shadow-xl">
            <p>Visibilidade:</p>
            <p className="font-bold" id="weather-description">{visibility !== null ? `${visibility} M ` : "_ _"}</p>
          </div>
          <div className="temp border-2 p-4 m-4 rounded-lg backdrop-blur-md drop-shadow-xl">
            <p>Temperatura:</p>
            <p className="font-bold" id="temp">{temperature !== null ? `${temperature} °C` : "_ _"}</p>
          </div>
          <div className="windSpeed border-2 p-4 m-4 rounded-lg backdrop-blur-md drop-shadow-xl">
            <p>Velocidade do Vento:</p>
            <p className="font-bold" id="wind-speed">{windSpeed !== null? `${windSpeed} km/h` : "_ _"}</p>
          </div>
          <div className="humidity border-2 p-4 m-4 rounded-lg backdrop-blur-md drop-shadow-xl">
            <p>Humidade:</p>
            <p className="font-bold" id="humidity">{humidity !== null? `${humidity} %` : "_ _"}</p>
          </div>
        </section>
      </section>
    </div>
  );
}
