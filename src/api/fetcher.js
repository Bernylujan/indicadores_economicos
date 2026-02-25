import { CONFIG } from "../config.js";

async function obtenerTipoCambio() {
    const hoy = new Date().toISOString().split('T')[0];
    const url = `https://www.banxico.org.mx/SieAPIRest/service/v1/series/${CONFIG.banxico.serieTC}/datos/2015-01-01/${hoy}?token=${CONFIG.banxico.token}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error en red");
    const texto = await res.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(texto, 'text/xml');
    const nodos = xml.querySelectorAll('Obs');
    return Array.from(nodos).map(obs => ({
        fecha: obs.querySelector('fecha').textContent,
        valor: obs.querySelector('dato').textContent
    }));
}

// Crear siguiente funcion con Spread:
// pread & Inmutabilidad
// Copiar/expandir arrays y objetos sin mutar el original.
// sintaxis
// [...arr]             // copia array
// { ...obj }           // copia objeto
// { ...obj, key: val } // sobreescribir
// [...a, ...b]        // combinar
// ejemplo mínimo
// const original = { a: 1, b: 2 };
// const copia = { ...original, b: 99 };
// original → {a:1, b:2}  ← sin mutar
// copia    → {a:1, b:99}