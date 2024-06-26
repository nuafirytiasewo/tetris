import * as PIXI from 'pixi.js';
import { Grid } from './grid';
import { BORDER_COLOR, WIDTH_BORDER } from './constants';

//этот класс создает контейнер, в котором будет располагаться сетка
export class Main {
    constructor(app) {
        this.app = app;
     
        //инициализируем контейнер в котором будет располагаться сетка
        this.rectangleMain = new PIXI.Graphics();

        // Перемещение контейнера в центр экрана и установка координат x и y контейнера в середину экрана приложения.
        this.rectangleMain.x = app.screen.width / 2;
        this.rectangleMain.y = app.screen.height / 2;

        //начинаем рисовать контейнер
        this.rectangleMain.lineStyle(WIDTH_BORDER, BORDER_COLOR, 1);
        this.rectangleMain.beginFill(0xffffff);

        let rectangleWidth, rectangleHeight, rectangleX, rectangleY;

        //если чел запускает на компе (ширина больше, чем высота)
        if (app.screen.width >= app.screen.height) {
            rectangleWidth = app.screen.width * 0.2; // ширина прямоугольника (20% от ширины экрана)
            rectangleHeight = rectangleWidth * 2; // высота прямоугольника (в 2 раза больше чем ширина)
            
        } 
        //иначе на мобилке
        else {
            rectangleWidth = app.screen.width * 0.7; // ширина прямоугольника (70% от ширины экрана)
            rectangleHeight = rectangleWidth * 2; // высота прямоугольника (в 2 раза больше чем ширина)
        }
        console.log(rectangleWidth, rectangleHeight);
        
        rectangleX = -rectangleWidth / 2; // центрирование по горизонтали относительно центра контейнера
        rectangleY = -rectangleHeight / 2; // центрирование по вертикали относительно центра контейнера
        this.rectangleMain.drawRect(rectangleX, rectangleY, rectangleWidth, rectangleHeight);
        this.rectangleMain.endFill();

        app.stage.addChild(this.rectangleMain);

        //инициализация сетки
        this.grid = new Grid (this.rectangleMain, rectangleWidth, rectangleHeight)
    }

    start() {
        this.grid.create();
    }
}
