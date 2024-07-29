import * as PIXI from 'pixi.js';
import { Main } from './start';
import * as PIXI_SOUND from 'pixi-sound';
import { WIDTH_FIELD, HEIGHT_FIELD } from './constants';

//увеличиваем размеры сетки в два раза
const gridWidth = WIDTH_FIELD; //количество клеток по горизонтали
const gridHeight = HEIGHT_FIELD; //количество клеток по вертикали
const cellSize = 32; //Размер одной клетки в пикселях

const appWidth = gridWidth * cellSize * 3; //вычисляем ширину приложения
const appHeight = gridHeight * cellSize * 3; //вычисляем высоту приложения

const app = new PIXI.Application({ 
    width: appWidth,  //устанавливаем ширину приложения
    height: appHeight, //устанавливаем высоту приложения
    antialias: true,  //включаем сглаживание
    backgroundColor: 0x000000 //устанавливаем черный фон
});

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

//функция для масштабирования и центрирования canvas
function resizeCanvas() {
    const viewportWidth = window.innerWidth; //ширина окна браузера
    const viewportHeight = window.innerHeight; //высота окна браузера
    const scale = Math.min(viewportWidth / app.screen.width, viewportHeight / app.screen.height); //вычисляем масштаб
    const scaledWidth = app.screen.width * scale; //масштабированная ширина
    const scaledHeight = app.screen.height * scale; //масштабированная высота

    app.view.style.width = `${scaledWidth}px`; //устанавливаем ширину canvas
    app.view.style.height = `${scaledHeight}px`; //устанавливаем высоту canvas
    app.view.style.position = 'absolute'; //устанавливаем позиционирование
    app.view.style.left = `${(viewportWidth - scaledWidth) / 2}px`; //центрируем по горизонтали
    app.view.style.top = `${(viewportHeight - scaledHeight) / 2}px`; //центрируем по вертикали
}

//обработчик для изменения размера окна
window.addEventListener('resize', resizeCanvas);

//инициализация размера canvas
resizeCanvas();