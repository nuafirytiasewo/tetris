import * as PIXI from 'pixi.js';
import { Grid } from './grid';
import { BORDER_COLOR, WIDTH_BORDER } from './constants';

//этот класс создает контейнер, в котором будет располагаться сетка
export class Main {
    constructor(app) {
        this.app = app;
     
        //инициализируем контейнер (containerMain) в котором будет располагаться сетка (grid)
        this.containerMain = new PIXI.Graphics();

        // Перемещение контейнера в центр экрана и установка координат x и y контейнера в середину экрана приложения
        // то есть мы установили "пивот" в самый центр, оттуда и будут считаться относительные координаты для данного контейнера
        this.containerMain.x = app.screen.width / 2;
        this.containerMain.y = app.screen.height / 2;

        //начинаем рисовать контейнер
        this.containerMain.lineStyle(WIDTH_BORDER, BORDER_COLOR, 1);
        this.containerMain.beginFill(0xffffff);

        //инициализируем переменные, отвечающие за ширину/высоту, абсолютные координаты
        let containerWidth, containerHeight, containerX, containerY;

        //если чел запускает на компе (то есть если ширина экрана больше, чем высота)
        if (app.screen.width >= app.screen.height) {
            containerWidth = app.screen.width * 0.5; // ширина контейнера (50% от ширины экрана)
            containerHeight = containerWidth * 2; // высота контейнера (в 2 раза больше чем ширина)
        } 
        //иначе на мобилке
        else {
            containerWidth = app.screen.width * 0.9; // ширина контейнера (90% от ширины экрана)
            containerHeight = containerWidth * 2; // высота контейнера (в 2 раза больше чем ширина)
        }
        
        //записываем абсолютные координаты для того чтобы начертить контейнер на экране
        containerX = -containerWidth / 2; // центрирование по горизонтали "относительно" центра контейнера
        containerY = -containerHeight / 2; // центрирование по вертикали "относительно" центра контейнера

        //вывод
        console.log("Ширина контейнера", containerWidth);
        console.log("Высота контейнера", containerHeight);
        console.log("Абсолютный X контейнера", containerX);
        console.log("Абсолютный Y контейнера", containerY);

        //рисуем контейнер
        this.containerMain.drawRect(containerX, containerY, containerWidth, containerHeight);
        this.containerMain.endFill();

        app.stage.addChild(this.containerMain);

        //инициализация сетки
        this.grid = new Grid (this.app, this.containerMain, containerX, containerY, containerWidth, containerHeight)
    }

    start() {
        this.grid.create();
    }
}
