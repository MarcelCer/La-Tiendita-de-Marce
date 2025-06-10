import { useEffect } from "react";
{/*
useEffect(() => {
    // Código del efecto secundario
    return () => {
    // Limpieza del efecto (opcional)
    };
    }, [dependencias]);*/}

    function Mensaje() {
        useEffect(() => {
            console.log('El componente se ha montado.');
            return () => {
            console.log('El componente se ha desmontado.');
            };
            }, []);
            return <h1>Hola, React!</h1>;
            }