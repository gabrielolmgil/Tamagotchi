import { useState, useEffect } from 'react';

export function Tamagotchi() {
    // Función para cargar el estado desde localStorage
    const loadState = (key, defaultValue) => {
        const savedValue = localStorage.getItem(key);
        return savedValue !== null ? JSON.parse(savedValue) : defaultValue;
    };

    // Estados iniciales, cargados desde localStorage o con valores predeterminados
    const [hunger, setHunger] = useState(loadState("hunger", 50));
    const [happiness, setHappiness] = useState(loadState("happiness", 50));
    const [health, setHealth] = useState(loadState("health", 100));
    const [wash, setWash] = useState(loadState("wash", 50));
    const [energy, setEnergy] = useState(loadState("energy", 50));
    const [exp, setExp] = useState(loadState("exp", 0));
    const [level, setLevel] = useState(loadState("level", 0));
    const [coins, setCoins] = useState(loadState("coins", 0));
    const [item1, setItem1] = useState(loadState("item1", 0));
    const [item2, setItem2] = useState(loadState("item2", 0));
    const [item3, setItem3] = useState(loadState("item3", 0));
    const [item4, setItem4] = useState(loadState("item4", 0));

    // Función para guardar el estado en localStorage
    const saveState = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    // Efecto para guardar cada vez que cambian los estados importantes
    useEffect(() => {
        saveState("hunger", hunger);
        saveState("happiness", happiness);
        saveState("health", health);
        saveState("wash", wash);
        saveState("energy", energy);
        saveState("exp", exp);
        saveState("level", level);
    }, [hunger, happiness, health, wash, energy, exp, level]);

    // Función para alimentar al Tamagotchi
    const feed = () => {
        setHunger((prev) => Math.min(prev + 20, 100));
        setHealth((prev) => Math.min(prev + 5, 100));
    };

    // Función para jugar con el Tamagotchi
    const play = () => {
        setHappiness((prev) => Math.min(prev + 20, 100));
        setHunger((prev) => Math.max(prev - 5, 0));
        setHealth((prev) => Math.max(prev - 5, 0));
    };

    // Función para hacer dormir al Tamagotchi
    const sleep = () => {
        setHealth((prev) => Math.min(prev + 10, 100));
        setHappiness((prev) => Math.max(prev - 5, 0));
        setEnergy((prev) => Math.min(prev + 20, 100));
    };

    // Función para limpiar al Tamagotchi
    const clean = () => {
        setWash((prev) => Math.min(prev + 20, 100));
        setHealth((prev) => Math.min(prev + 5, 100));
    };

    // Efecto que controla la reducción de los niveles cada 3 segundos
    useEffect(() => {
        const timer = setInterval(() => {
            const reduction = 1 + Math.floor(level / 5) * 5;
            setHunger((prev) => Math.max(prev - reduction, 0));
            setHappiness((prev) => Math.max(prev - reduction, 0));
            setHealth((prev) => Math.max(prev - reduction, 0));
            setWash((prev) => Math.max(prev - reduction, 0));
            setEnergy((prev) => Math.max(prev - reduction, 0));
            setCoins((prev) => Math.max(prev + 2, 0));
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    // Sistema de experiencia
    useEffect(() => {
        puntosEXP();
        if(hunger < 1 && happiness  < 1 && health  < 1 && wash  < 1 && energy  < 1){
            setLevel(0);
            setHunger(50);
            setHappiness(50);
            setHealth(100);
            setWash(50);
            setEnergy(50);
            setExp(0);
            setCoins(0);
            setItem1(0);
            setItem2(0);
            setItem3(0);
            setItem4(0);
        }
    }, [hunger, happiness, health, wash, energy]);

    const puntosEXP = () => {
        if (hunger > 50 && happiness > 50 && health > 50 && wash > 50 && energy > 50) {
            if (exp > 99) {
                setExp(0);
                setLevel((prev) => Math.max(prev + 1, 0));
            } else {
                setExp((prev) => Math.max(prev + 20, 0));
            }
        }
    };

    const getLevel = () => {
        return level;
    };

    const getProgressColor = (value) => {
        if (value > 60) return "bg-green-500";
        if (value > 20) return "bg-yellow-500";
        return "bg-red-500";
    };

    const getStatusMessage = () => {
        if (hunger < 20) return "😟 ¡Tengo hambre! 😟";
        if (happiness < 20) return "😡 Estoy Enfadado 😡";
        if (health < 20) return "🤒 No me siento bien 🤒";
        if (wash < 20) return "🛁 ¡Necesito limpieza! 🛁";
        if (energy < 20) return "💤 Estoy cansado 😴";
        return "😊 ¡Estoy feliz! 😊";
    };
    const getStatusImg = () => {
        if (hunger < 20) return (<img src="../../public/pyke-raro.png"/>);
        if (happiness < 20) return (<img src="../../public/pyke-enfadado.png"/>);
        if (health < 20) return (<img src="../../public/pyke-salud.png"/>);
        if (wash < 20) return (<img src="../../public/pyke-sucio.png"/>);
        if (energy < 20) return (<img src="../../public/pyke-aburrido.png"/>);
        return (<img src="../../public/pyke-feliz.png"/>);
    };

    const getCoins = () => {
        return coins;
    };
    const draktar = () => {
        if(coins > 50){
            setCoins((prev) => Math.max(prev - 50, 0));
            setItem1((prev) => Math.max(prev + 1, 0));
        }
    };
    const umbral = () => {
        if(coins > 20){
            setCoins((prev) => Math.max(prev - 20, 0));
            setItem2((prev) => Math.max(prev + 1, 0));
        }
    };
    const youmuu = () => {
        if(coins > 30){
            setCoins((prev) => Math.max(prev - 30, 0));
            setItem3((prev) => Math.max(prev + 1, 0));
        }
    };
    const edge = () => {
        if(coins > 40){
            setCoins((prev) => Math.max(prev - 40, 0));
            setItem4((prev) => Math.max(prev + 1, 0));
        }
    };

    const getItem1 = () => {
        return item1;
    };
    const getItem2 = () => {
        return item2;
    };

    const getItem3 = () => {
        return item3;
    };

    const getItem4 = () => {
        return item4;
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md w-80 h-auto">
            <div className="mb-4">
                <p>{getCoins()}🪙</p>
                {getStatusImg()}
                <p className='text-center font-medium mb-1'>Level: {getLevel()}</p>
                <div className="bg-gray-300 h-4 rounded overflow-hidden">
                    <div
                        className={`${getProgressColor(exp)} h-full`}
                        style={{ width: `${exp}%` }}
                    />
                </div>
            </div>
            <p className="text-center text-lg font-semibold mb-4">{getStatusMessage()}</p>
            <div className="mb-4">
                <label className="block font-medium mb-1">Hambre:</label>
                <div className="bg-gray-300 h-4 rounded overflow-hidden">
                    <div
                        className={`${getProgressColor(hunger)} h-full`}
                        style={{ width: `${hunger}%` }}
                    />
                </div>
            </div>
            <div className="mb-4">
                <label className="block font-medium mb-1">Felicidad:</label>
                <div className="bg-gray-300 h-4 rounded overflow-hidden">
                    <div
                        className={`${getProgressColor(happiness)} h-full`}
                        style={{ width: `${happiness}%` }}
                    />
                </div>
            </div>
            <div className="mb-4">
                <label className="block font-medium mb-1">Salud:</label>
                <div className="bg-gray-300 h-4 rounded overflow-hidden">
                    <div
                        className={`${getProgressColor(health)} h-full`}
                        style={{ width: `${health}%` }}
                    />
                </div>
            </div>
            <div className="mb-4">
                <label className="block font-medium mb-1">Limpieza:</label>
                <div className="bg-gray-300 h-4 rounded overflow-hidden">
                    <div
                        className={`${getProgressColor(wash)} h-full`}
                        style={{ width: `${wash}%` }}
                    />
                </div>
            </div>
            <div className="mb-4">
                <label className="block font-medium mb-1">Energía:</label>
                <div className="bg-gray-300 h-4 rounded overflow-hidden">
                    <div
                        className={`${getProgressColor(energy)} h-full`}
                        style={{ width: `${energy}%` }}
                    />
                </div>
            </div>
            <div className="flex space-x-2  mt-4">
                <button onClick={feed} className="px-4 py-2 bg-amber-900 text-white rounded hover:bg-blue-600 transition">
                    Feed
                </button>
                <button onClick={play} className="px-4 py-2 bg-yellow-300 text-white rounded hover:bg-green-600 transition">
                    Play
                </button>
                <button onClick={sleep} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-purple-600 transition">
                    Sleep
                </button>
                <button onClick={clean} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">
                    Clean
                </button>
            </div>
            <p className='mt-3 font-bold'>Tienda:</p>
            <div className="flex space-x-2 mt-4">
                <button onClick={draktar} className="px-4 py-2 w-24">
                    <img className="hover:scale-125 duration-200" src='../../draktar.jpg'/>
                </button>
                <button onClick={umbral} className="px-4 py-2 w-24">
                    <img className="hover:scale-125 duration-200" src='../../umbral-glaive.jpg'/>
                </button>
                <button onClick={youmuu} className="px-4 py-2 w-24">
                    <img className="hover:scale-125 duration-200" src='../../Youmuu.jpg'/>
                </button>
                <button onClick={edge} className="px-4 py-2 w-24">
                    <img className="hover:scale-125 duration-200" src='../../edge-night.jpg'/>
                </button>
            </div>
            <div className="flex space-x-2">
                <p className="px-4">50🪙</p>
                <p className="px-4">20🪙</p>
                <p className="px-3">30🪙</p>
                <p className="px-2">40🪙</p>
            </div>
            <p className='mt-3 font-bold'>Invetario:</p>
            <div className="flex space-x-2">
                <p className="px-2">Draktar: {getItem1()}</p>
                <p className="px-10">Youmuu: {getItem3()}</p>
            </div>
            <div className="flex space-x-2">
                <p className="px-2">Umbral: {getItem2()}</p>
                <p className="px-10">Edge: {getItem4()}</p>
            </div>
            
        </div>
    );
}