import { useState } from "react";

const apiKey = "db3a705511a4b3903ebc2a1e9bae6852";
const url = `https://api.openweathermap.org/data/2.5/weather?q=`;

export const Wheater = () => {
    const [ciudad, setCiudad] = useState("");
    const [clima, setClima] = useState("");
    const [noData, setNoData] = useState(false)

    const getData = async () => {
        try {
            const response = await fetch(
                `${url}${ciudad}&appid=${apiKey}&lang=es&units=metric `
            );
            const data = await response.json();
            if(data.cod == 200){
                setNoData(false)
                setClima(data);
                
            }else{
                setNoData(true)
                setClima(null)
                
            }
            
            
        } catch (error) {
            setClima(null)
            setNoData(true)
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setCiudad(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await getData();
    };

    return (
        <>
            <div className="flex items-center justify-center h-screen flex-col">
                <h1
                    style={{
                        fontFamily: "Arial",
                    }}
                >
                    Aplicación Clima
                </h1>
                <div>
                    <form
                        onSubmit={handleSubmit}
                        className="flex justify-center flex-col "
                    >
                        <input
                            type="text"
                            name="ciudad"
                            id=""
                            value={ciudad}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:scale-105 mt-4 mb-4"
                            type="submit"
                        >
                            Consultar Clima
                        </button>
                    </form>
                </div>

                {clima && (
                    <div
                        className={`max-w-sm rounded overflow-hidden shadow-lg p-6 text-white ${
                            clima &&
                            (clima.main.temp > 40
                                ? "bg-gradient-to-r from-red-700 via-red-600 to-orange-600"
                                : clima.main.temp > 30 && clima.main.temp < 40
                                ? "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500"
                                : clima.main.temp > 20 && clima.main.temp < 30
                                ? "bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500"
                                : clima.main.temp > 10 && clima.main.temp < 20
                                ? "bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500"
                                : "bg-gradient-to-r from-blue-700 via-blue-600 to-blue-300")
                        }`}
                    >
                        <div className="flex justify-center">
                            <img
                                src={`http://openweathermap.org/img/wn/${clima.weather[0].icon}@4x.png`}
                                alt="Card image"
                                style={{
                                    width: "200px",
                                    height: "200px",
                                }}
                            />
                        </div>
                        <div className="px-6 py-4">
                            <div
                                className="font-bold mb-2 text-center"
                                style={{ fontSize: "50px" }}
                            >
                                {clima.name}
                            </div>

                            <p className="text-black-700 text-xl">
                                <strong>Condición Climática:</strong>{" "}
                                {clima.weather[0].description}
                            </p>

                            <p className="text-black-700 text-xl">
                                <strong>Temperatura Actual:</strong>{" "}
                                {parseInt(clima.main.temp)} Cº
                            </p>

                            <p className="text-black-700 text-xl">
                                <strong>Temperatura Mínima: </strong>
                                {parseInt(clima.main.temp_min)} Cº
                            </p>

                            <p className="text-black-700 text-xl">
                                <strong>Temperatura Máxima: </strong>
                                {parseInt(clima.main.temp_max)} Cº
                            </p>

                            <p className="text-black-700 text-xl">
                                <strong>Sensación Térmica: </strong>
                                {parseInt(clima.main.feels_like)} Cº
                            </p>

                            <p className="text-black-700 text-xl">
                                <strong>Humedad: </strong> {clima.main.humidity}{" "}
                                %
                            </p>
                        </div>
                    </div>
                 )}
                 {noData &&(
                    <p className="text-red-500 font-bold">
                        La ciudad no fue encontrada. Por favor, verifica el nombre e intenta nuevamente.
                    </p>
                    )}
            </div>
        </>
    );
};
