import { obetenerIndicadores } from './api/fetcher.js';

async function inciar() {
    console.log('Monitor iniciando...');

    const datos = await obetenerIndicadores();
    console.log('Datos recibidos: ', datos);
    inciar();
}
