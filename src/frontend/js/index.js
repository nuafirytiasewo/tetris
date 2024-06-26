import * as PIXI from 'pixi.js';
import { Main } from './start';

const app = new PIXI.Application({ antialias: true, resizeTo: window });
//для расширения в браузере, чтобы смотреть обьекты
globalThis.__PIXI_APP__ = app;
document.body.appendChild(app.view);

const main = new Main(app);
//запуск кода
main.start();