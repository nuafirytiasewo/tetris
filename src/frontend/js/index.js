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

//загрузка музыки
PIXI_SOUND.default.add('theme', {
    url: 'src/frontend/sounds/theme.mp3', //url для загрузки музыки
    preload: true, //предварительная загрузка музыки
    loop: true, //зацикливание музыки
    volume: 0.5, //громкость музыки (от 0 до 1)
    complete: function() { //функция, выполняемая по завершении загрузки
        console.log('Музыка загружена'); //сообщение в консоли о завершении загрузки
    }
});

//обработчик для запуска музыки при первом взаимодействии с пользователем
const startMusicOnInteraction = () => { 
    PIXI_SOUND.default.play('theme'); //воспроизведение музыки
    document.removeEventListener('click', startMusicOnInteraction); //удаление обработчика события клика
    document.removeEventListener('keydown', startMusicOnInteraction); //удаление обработчика события нажатия клавиши
};

document.addEventListener('click', startMusicOnInteraction); //добавление обработчика события клика
document.addEventListener('keydown', startMusicOnInteraction); //добавление обработчика события нажатия клавиши
