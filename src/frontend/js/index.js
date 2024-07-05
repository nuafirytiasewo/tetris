import * as PIXI from 'pixi.js';
import { Main } from './start';
import * as PIXI_SOUND from 'pixi-sound';

const app = new PIXI.Application({ antialias: true, resizeTo: window });
//для расширения в браузере, чтобы смотреть обьекты
globalThis.__PIXI_APP__ = app;
document.body.appendChild(app.view);

const main = new Main(app);
//запуск кода
main.start();

// загрузка музыки
PIXI_SOUND.default.add('theme', {
    url: 'src/frontend/sounds/theme.mp3',
    preload: true,
    loop: true,
    volume: 0.5, // громкость музыки (от 0 до 1)
    complete: function() {
        console.log('Музыка загружена');
        // PIXI_SOUND.default.play('theme');
    }
});

// по клику воспроисводится музыка (нужно чтобы избежать ошибки)
document.addEventListener('click', () => {
    PIXI_SOUND.default.play('theme');
});